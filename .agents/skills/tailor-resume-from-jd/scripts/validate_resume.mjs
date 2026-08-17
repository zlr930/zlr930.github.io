#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import process from "node:process";

const workspaceRequire = createRequire(resolve(process.cwd(), "package.json"));
let chromium;
try {
  ({ chromium } = workspaceRequire("playwright"));
} catch {
  try {
    ({ chromium } = workspaceRequire("@playwright/test"));
  } catch {
    console.error(
      "Playwright is required in the current workspace. Install it with `npm install -D @playwright/test` and install a Chromium browser before retrying.",
    );
    process.exit(1);
  }
}

const TYPOGRAPHY_PROPERTIES = [
  "fontFamily",
  "fontSize",
  "fontWeight",
  "fontStyle",
  "lineHeight",
  "letterSpacing",
];

const LAYOUT_PROPERTIES = [
  "boxSizing",
  "display",
  "position",
  "color",
  "backgroundColor",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderTopStyle",
  "borderRightStyle",
  "borderBottomStyle",
  "borderLeftStyle",
  "alignItems",
  "alignSelf",
  "justifyContent",
  "justifySelf",
  "flexDirection",
  "flexWrap",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "gridTemplateColumns",
  "columnGap",
  "rowGap",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "textAlign",
  "whiteSpace",
  "listStyleType",
];

const STYLE_PROPERTIES = [...TYPOGRAPHY_PROPERTIES, ...LAYOUT_PROPERTIES];

const STYLE_SELECTORS = [
  ".resume-page",
  ".identity-header",
  ".identity-copy",
  ".resume-kicker",
  ".name-row",
  ".name-row h1",
  ".name-row > div strong",
  ".name-row > div span",
  ".contact-list",
  ".header-skills",
  ".header-skills span",
  ".portrait-frame",
  ".single-column-content",
  ".single-column-content > section + section",
  ".resume-section-title",
  ".section-icon",
  ".section-divider",
  ".resume-section-title h2",
  ".entry-list",
  ".resume-entry",
  ".entry-head",
  ".entry-head h3",
  ".entry-role",
  ".entry-head time",
  ".detail-list",
  ".detail-list li",
  ".detail-list li > strong",
  ".detail-emphasis",
  ".project-inline-role",
  ".self-evaluation .detail-list li",
];

const NORMALIZED_FONT_STYLESHEET =
  "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600;700;800;900&family=Noto+Serif+SC:wght@800&family=Roboto+Mono:wght@500;600;700&display=block";

const NORMALIZED_FONT_OVERRIDE = `
  :root { font-family: "Noto Sans SC", sans-serif !important; }
  .name-row h1 { font-family: "Noto Serif SC", serif !important; }
  .resume-kicker,
  .name-row strong,
  .entry-head time,
  .project-link { font-family: "Roboto Mono", monospace !important; }
`;

const PLATFORM_FONT_TARGETS = [
  { key: "name", selector: ".name-row h1", normalizedFamily: "Noto Serif SC" },
  { key: "body", selector: ".detail-list li", normalizedFamily: "Noto Sans SC" },
  { key: "mono", selector: ".resume-kicker", normalizedFamily: "Roboto Mono" },
];

function usage(message) {
  if (message) console.error(message);
  console.error(`Usage:
  validate_resume.mjs --baseline-url URL --candidate-url URL --output-pdf FILE [options]

Options:
  --screenshot FILE          Save a full candidate-page screenshot
  --baseline-root SELECTOR   Override the baseline page selector
  --candidate-root SELECTOR  Override the candidate page selector
  --header-selector SELECTOR Header selector (default: .identity-header)
  --min-bottom-px NUMBER     Minimum safe bottom space (default: 20)
  --max-bottom-px NUMBER     Maximum bottom space for a filled page (default: 90)
  --normalize-cjk-fonts      Embed Noto CJK web fonts for deterministic PDF output
  --allow-header-change      Do not require equal header text and pixels
  --skip-fill-check          Skip the bottom-space range check
  --help                     Show this help`);
  process.exit(message ? 1 : 0);
}

function parseArgs(argv) {
  const args = {
    headerSelector: ".identity-header",
    minBottomPx: 20,
    maxBottomPx: 90,
    normalizeCjkFonts: false,
    allowHeaderChange: false,
    skipFillCheck: false,
  };
  const valueOptions = new Map([
    ["--baseline-url", "baselineUrl"],
    ["--candidate-url", "candidateUrl"],
    ["--output-pdf", "outputPdf"],
    ["--screenshot", "screenshot"],
    ["--baseline-root", "baselineRoot"],
    ["--candidate-root", "candidateRoot"],
    ["--header-selector", "headerSelector"],
    ["--min-bottom-px", "minBottomPx"],
    ["--max-bottom-px", "maxBottomPx"],
  ]);

  for (let index = 0; index < argv.length; index += 1) {
    const option = argv[index];
    if (option === "--help") usage();
    if (option === "--allow-header-change") {
      args.allowHeaderChange = true;
      continue;
    }
    if (option === "--normalize-cjk-fonts") {
      args.normalizeCjkFonts = true;
      continue;
    }
    if (option === "--skip-fill-check") {
      args.skipFillCheck = true;
      continue;
    }
    const key = valueOptions.get(option);
    if (!key) usage(`Unknown option: ${option}`);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) usage(`Missing value for ${option}`);
    args[key] = value;
    index += 1;
  }

  for (const required of ["baselineUrl", "candidateUrl", "outputPdf"]) {
    if (!args[required]) usage(`Missing required option: ${required}`);
  }
  args.minBottomPx = Number(args.minBottomPx);
  args.maxBottomPx = Number(args.maxBottomPx);
  if (!Number.isFinite(args.minBottomPx) || !Number.isFinite(args.maxBottomPx)) {
    usage("Bottom-space limits must be numbers.");
  }
  if (args.minBottomPx < 0 || args.maxBottomPx < args.minBottomPx) {
    usage("Bottom-space limits are invalid.");
  }
  return args;
}

async function waitForAssets(page) {
  await page.waitForLoadState("networkidle");
  await page.evaluate(async () => {
    if (document.fonts) await document.fonts.ready;
    await Promise.all(
      [...document.images]
        .filter((image) => !image.complete)
        .map(
          (image) =>
            new Promise((resolveImage) => {
              image.addEventListener("load", resolveImage, { once: true });
              image.addEventListener("error", resolveImage, { once: true });
            }),
        ),
    );
  });
}

async function applyNormalizedFonts(page) {
  await page.addStyleTag({ url: NORMALIZED_FONT_STYLESHEET });
  await page.addStyleTag({ content: NORMALIZED_FONT_OVERRIDE });
  await page.evaluate(async () => {
    const bodySample = document.body.innerText;
    await Promise.all([
      ...[400, 600, 700, 800, 900].map((weight) =>
        document.fonts.load(`${weight} 16px "Noto Sans SC"`, bodySample),
      ),
      document.fonts.load('800 32px "Noto Serif SC"', "赵丽蓉"),
      ...[500, 600, 700].map((weight) =>
        document.fonts.load(`${weight} 16px "Roboto Mono"`, "OPERATIONS BUSINESS 2027"),
      ),
    ]);
    await document.fonts.ready;
  });
}

async function resolveRoot(page, explicitSelector, baseline) {
  if (explicitSelector) {
    const count = await page.locator(explicitSelector).count();
    if (count !== 1) {
      throw new Error(`Expected one element for ${explicitSelector}, found ${count}.`);
    }
    return explicitSelector;
  }

  const candidates = baseline
    ? [".print-resume .resume-page", ".screen-resume .resume-page", ".resume-page"]
    : [".resume-page"];
  for (const selector of candidates) {
    if ((await page.locator(selector).count()) === 1) return selector;
  }
  throw new Error(`Could not identify one ${baseline ? "baseline" : "candidate"} resume page.`);
}

async function collectPageMetrics(page, rootSelector) {
  return page.locator(rootSelector).evaluate((root) => {
    const rootRect = root.getBoundingClientRect();
    const content =
      root.querySelector(".single-column-content") ||
      root.querySelector("main") ||
      root.lastElementChild;
    const contentRect = content?.getBoundingClientRect() ?? rootRect;
    const images = [...root.querySelectorAll("img")].map((image) => ({
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    }));
    return {
      width: rootRect.width,
      height: rootRect.height,
      scrollWidth: root.scrollWidth,
      scrollHeight: root.scrollHeight,
      clientWidth: root.clientWidth,
      clientHeight: root.clientHeight,
      remainingBottomPx: rootRect.bottom - contentRect.bottom,
      images,
    };
  });
}

async function collectStyleSamples(page, rootSelector) {
  return page.evaluate(
    ({ rootSelectorValue, selectors, properties }) => {
      const root = document.querySelector(rootSelectorValue);
      const samples = {};
      if (!root) return samples;
      for (const selector of selectors) {
        const element = selector === ".resume-page" ? root : root.querySelector(selector);
        if (!element) continue;
        const style = getComputedStyle(element);
        samples[selector] = Object.fromEntries(
          properties.map((property) => [property, style[property]]),
        );
      }
      return samples;
    },
    { rootSelectorValue: rootSelector, selectors: STYLE_SELECTORS, properties: STYLE_PROPERTIES },
  );
}

async function collectPlatformFonts(page, rootSelector) {
  const session = await page.context().newCDPSession(page);
  try {
    await session.send("DOM.enable");
    await session.send("CSS.enable");
    const { root } = await session.send("DOM.getDocument");
    const samples = {};
    for (const target of PLATFORM_FONT_TARGETS) {
      const selector = `${rootSelector} ${target.selector}`;
      const { nodeId } = await session.send("DOM.querySelector", {
        nodeId: root.nodeId,
        selector,
      });
      if (!nodeId) continue;
      const { fonts } = await session.send("CSS.getPlatformFontsForNode", { nodeId });
      samples[target.key] = fonts.map(({ familyName, glyphCount, isCustomFont }) => ({
        familyName,
        glyphCount,
        isCustomFont,
      }));
    }
    return samples;
  } finally {
    await session.detach();
  }
}

function comparePlatformFonts(baseline, candidate) {
  const mismatches = [];
  for (const target of PLATFORM_FONT_TARGETS) {
    const signature = (samples) =>
      (samples[target.key] ?? [])
        .map(({ familyName, isCustomFont }) => `${familyName}:${isCustomFont}`)
        .sort();
    const before = signature(baseline);
    const after = signature(candidate);
    if (JSON.stringify(before) !== JSON.stringify(after)) {
      mismatches.push({ target: target.key, baseline: before, candidate: after });
    }
  }
  return mismatches;
}

function compareStyles(baseline, candidate) {
  const mismatches = [];
  for (const selector of STYLE_SELECTORS) {
    const before = baseline[selector];
    const after = candidate[selector];
    if (!before || !after) continue;
    for (const property of STYLE_PROPERTIES) {
      if (before[property] !== after[property]) {
        mismatches.push({
          selector,
          property,
          baseline: before[property],
          candidate: after[property],
        });
      }
    }
  }
  return mismatches;
}

async function normalizedText(locator) {
  return (await locator.innerText()).replace(/\s+/g, " ").trim();
}

async function captureElement(page, locator, path) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("Cannot capture an element that has no visible bounding box.");
  return page.screenshot({ path, clip: box });
}

async function ensureParent(path) {
  await mkdir(dirname(resolve(path)), { recursive: true });
}

const args = parseArgs(process.argv.slice(2));
const browser = await chromium.launch({ headless: true });
let exitCode = 0;

try {
  const baselinePage = await browser.newPage({ viewport: { width: 1400, height: 1300 } });
  const candidatePage = await browser.newPage({ viewport: { width: 1400, height: 1300 } });
  await Promise.all([
    baselinePage.goto(args.baselineUrl, { waitUntil: "domcontentloaded" }),
    candidatePage.goto(args.candidateUrl, { waitUntil: "domcontentloaded" }),
  ]);
  await Promise.all([waitForAssets(baselinePage), waitForAssets(candidatePage)]);
  if (args.normalizeCjkFonts) {
    await Promise.all([applyNormalizedFonts(baselinePage), applyNormalizedFonts(candidatePage)]);
  }
  await Promise.all([baselinePage.emulateMedia({ media: "print" }), candidatePage.emulateMedia({ media: "print" })]);

  const baselineRoot = await resolveRoot(baselinePage, args.baselineRoot, true);
  const candidateRoot = await resolveRoot(candidatePage, args.candidateRoot, false);
  const [
    baselineMetrics,
    candidateMetrics,
    baselineStyles,
    candidateStyles,
    baselinePlatformFonts,
    candidatePlatformFonts,
  ] = await Promise.all([
    collectPageMetrics(baselinePage, baselineRoot),
    collectPageMetrics(candidatePage, candidateRoot),
    collectStyleSamples(baselinePage, baselineRoot),
    collectStyleSamples(candidatePage, candidateRoot),
    collectPlatformFonts(baselinePage, baselineRoot),
    collectPlatformFonts(candidatePage, candidateRoot),
  ]);
  // A detached CDP inspection session can reset media emulation in Chromium.
  await Promise.all([
    baselinePage.emulateMedia({ media: "print" }),
    candidatePage.emulateMedia({ media: "print" }),
  ]);

  const failures = [];
  const warnings = [];
  const styleMismatches = compareStyles(baselineStyles, candidateStyles);
  const fontMismatches = styleMismatches.filter((item) =>
    TYPOGRAPHY_PROPERTIES.includes(item.property),
  );
  const layoutMismatches = styleMismatches.filter((item) =>
    LAYOUT_PROPERTIES.includes(item.property),
  );
  const platformFontMismatches = comparePlatformFonts(
    baselinePlatformFonts,
    candidatePlatformFonts,
  );
  if (fontMismatches.length) failures.push(`${fontMismatches.length} computed font mismatches found.`);
  if (layoutMismatches.length) {
    failures.push(`${layoutMismatches.length} computed layout/style mismatches found.`);
  }
  if (platformFontMismatches.length) {
    failures.push(`${platformFontMismatches.length} actual platform font mismatches found.`);
  }
  if (args.normalizeCjkFonts) {
    for (const target of PLATFORM_FONT_TARGETS) {
      const fonts = candidatePlatformFonts[target.key] ?? [];
      if (!fonts.some(({ familyName }) => familyName.includes(target.normalizedFamily))) {
        failures.push(
          `Normalized font ${target.normalizedFamily} was not used for ${target.key}.`,
        );
      }
    }
  } else {
    const fallbackNames = Object.values(candidatePlatformFonts)
      .flat()
      .map(({ familyName }) => familyName)
      .filter((familyName) => /WenQuanYi|DejaVu Sans(?! Mono)/.test(familyName));
    if (fallbackNames.length) {
      failures.push(
        `Actual fallback fonts detected (${[...new Set(fallbackNames)].join(", ")}); export on a system with the template fonts or use --normalize-cjk-fonts.`,
      );
    }
  }

  const tolerance = 1;
  if (Math.abs(candidateMetrics.width - baselineMetrics.width) > tolerance) {
    failures.push(`Page width differs: ${baselineMetrics.width}px vs ${candidateMetrics.width}px.`);
  }
  if (Math.abs(candidateMetrics.height - baselineMetrics.height) > tolerance) {
    failures.push(`Page height differs: ${baselineMetrics.height}px vs ${candidateMetrics.height}px.`);
  }
  if (
    candidateMetrics.scrollWidth > candidateMetrics.clientWidth + tolerance ||
    candidateMetrics.scrollHeight > candidateMetrics.clientHeight + tolerance
  ) {
    failures.push("Candidate resume overflows its page container.");
  }
  const brokenImages = candidateMetrics.images.filter(
    (item) => !item.complete || item.naturalWidth === 0 || item.naturalHeight === 0,
  );
  if (brokenImages.length) failures.push(`${brokenImages.length} candidate images failed to load.`);

  if (!args.skipFillCheck) {
    const remaining = candidateMetrics.remainingBottomPx;
    if (remaining < args.minBottomPx || remaining > args.maxBottomPx) {
      failures.push(
        `Bottom space ${remaining.toFixed(1)}px is outside ${args.minBottomPx}-${args.maxBottomPx}px.`,
      );
    }
  }

  let headerTextEqual = null;
  let headerPixelsEqual = null;
  const baselineHeader = baselinePage.locator(`${baselineRoot} ${args.headerSelector}`);
  const candidateHeader = candidatePage.locator(`${candidateRoot} ${args.headerSelector}`);
  const [baselineHeaderCount, candidateHeaderCount] = await Promise.all([
    baselineHeader.count(),
    candidateHeader.count(),
  ]);
  if (baselineHeaderCount === 1 && candidateHeaderCount === 1) {
    if (!args.allowHeaderChange) {
      headerTextEqual =
        (await normalizedText(baselineHeader)) === (await normalizedText(candidateHeader));
      if (!headerTextEqual) failures.push("Header text differs from the baseline.");
      const [baselineHeaderImage, candidateHeaderImage] = await Promise.all([
        captureElement(baselinePage, baselineHeader),
        captureElement(candidatePage, candidateHeader),
      ]);
      headerPixelsEqual = baselineHeaderImage.equals(candidateHeaderImage);
      if (!headerPixelsEqual) failures.push("Header pixels differ from the baseline.");
    }
  } else if (!args.allowHeaderChange) {
    failures.push(
      `Expected one header in each resume, found ${baselineHeaderCount} and ${candidateHeaderCount}.`,
    );
  } else {
    warnings.push("Header comparison skipped because the header selector was not unique.");
  }

  let pdfWritten = false;
  if (failures.length === 0) {
    await ensureParent(args.outputPdf);
    const pdf = await candidatePage.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
    });
    await writeFile(args.outputPdf, pdf);
    pdfWritten = true;
  }

  if (args.screenshot) {
    await ensureParent(args.screenshot);
    await captureElement(candidatePage, candidatePage.locator(candidateRoot), args.screenshot);
  }

  const report = {
    ok: failures.length === 0,
    baselineUrl: args.baselineUrl,
    candidateUrl: args.candidateUrl,
    outputPdf: pdfWritten ? resolve(args.outputPdf) : null,
    pdfWritten,
    screenshot: args.screenshot ? resolve(args.screenshot) : null,
    page: {
      baseline: baselineMetrics,
      candidate: candidateMetrics,
    },
    header: {
      allowedToChange: args.allowHeaderChange,
      textEqual: headerTextEqual,
      pixelsEqual: headerPixelsEqual,
    },
    fontMismatches,
    platformFonts: {
      normalized: args.normalizeCjkFonts,
      baseline: baselinePlatformFonts,
      candidate: candidatePlatformFonts,
      mismatches: platformFontMismatches,
    },
    layoutMismatches,
    brokenImages,
    warnings,
    failures,
  };
  console.log(JSON.stringify(report, null, 2));
  if (failures.length) exitCode = 1;
} catch (error) {
  console.error(error instanceof Error ? error.stack : String(error));
  exitCode = 1;
} finally {
  await browser.close();
}

process.exitCode = exitCode;
