import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Copy,
  Download,
  ExternalLink,
  Flower2,
  Footprints,
  Headphones,
  Heart,
  Mail,
  Menu,
  Music2,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import { projects, skillCards } from './data'
import { education as resumeEducation, internships as resumeInternships } from './resume/data'

const email = 'zlr_cn@163.com'

const educationCards = [
  {
    ...resumeEducation[0],
    stage: '硕士研究生',
    tone: 'current',
    emblem: './hfut-emblem.jpg',
    points: [
      { label: '相关课程', detail: '数理统计（100）、最优化方法（97）等。' },
      { label: '荣誉奖项', detail: '一等学业奖学金 2 次、校三好学生。' },
    ],
  },
  {
    ...resumeEducation[1],
    stage: '本科',
    tone: 'bachelor',
    emblem: './zjgsu-emblem.png',
    points: [
      { label: '学业成绩', detail: '专业排名 1/87，GPA 3.91，保研至合肥工业大学。' },
      { label: '相关课程', detail: '仓储管理与库存控制（98）、统计学（94）、运输管理（93）等。' },
      { label: '荣誉奖项', detail: '综合一等奖学金 3 次、省政府奖学金 2 次、校三好学生 2 次。' },
    ],
  },
]

const internshipCards = [
  {
    ...resumeInternships[0],
    logo: './adopt-a-cow-logo-transparent.png',
    logoClass: 'cow',
    points: [
      { label: '破价专项治理', detail: '负责店铺巡价、投诉闭环与分销商整改，推动 Q2 常温奶整体破价率下降 1.5%，分销渠道下降 3%。' },
      { label: '流程自动化', detail: '参与销管飞书多维表建设，串联数据管理、投诉整改与可视化看板，巡店效率提升 50%。' },
      { label: '数据分析', detail: '按周输出渠道价格趋势，并开发 AI 考核名单整理工具，处理效率提升 80%。' },
    ],
  },
  {
    ...resumeInternships[1],
    logo: './dahua-logo.svg',
    logoClass: 'dahua',
    points: [
      { label: '渠道订单运营', detail: '跟进天猫分销订单，从合同审批、仓储备货到物流交付，协调库存与时效异常。' },
      { label: '客户与售后支持', detail: '结合客户需求提供产品方案，协同安装答疑、退货申请与物流回收，推动问题闭环。' },
    ],
  },
  {
    ...resumeInternships[2],
    logo: './the-ckb-logo-transparent.png',
    logoClass: 'ckb',
    points: [
      { label: '履约监控', detail: '跟踪 D2C 海外订单及核心时效指标，保障仓库 7 天发货率稳定在 70% 左右。' },
      { label: '供应链运营', detail: '优化货源配置并处理退换货、入库异常，推动店铺 3 天发货率稳定在 85% 以上。' },
      { label: '跨部门协同', detail: '联动采购、仓库、商家与业务团队闭环异常，保障订单履约交付指标不低于 90%。' },
    ],
  },
  {
    ...resumeInternships[3],
    logo: './zjgsu-emblem.png',
    logoClass: 'zjgsu',
    points: [
      { label: '事务执行', detail: '负责档案、报告、材料与报销事务，曾短期完成 200 余份毕业档案整理。' },
      { label: '协调支持', detail: '对接师生及学院部门，细致核对材料并处理信息偏差，保障事务有序推进。' },
    ],
  },
]

const campusExperiences = [
  {
    id: '01',
    organization: '院新媒体中心',
    role: '采编部部长',
    period: '2021.06 — 2022.06',
    tone: 'pink',
    points: [
      { label: '内容运营', detail: '负责学院官方公众号日常运营，独立推进选题策划、采写编辑、排版发布，完成 5 篇原创文章及多篇新闻稿、采访稿。' },
      { label: '协同执行', detail: '对接学生会各部门与学院社团的推文需求，协调稿件修改、排版及发布流程，保障宣发工作有序开展。' },
    ],
    tags: ['公众号运营', '原创采写', '跨部门协同'],
    photos: [
      { src: './campus/media-center-1.jpg', alt: '院新媒体中心团队合影' },
      { src: './campus/media-center-2.png', alt: '院新媒体中心活动纪念合影' },
    ],
  },
  {
    id: '02',
    organization: '班级学习委员',
    role: '学习委员',
    period: '2020.09 — 2024.06',
    tone: 'blue',
    points: [
      { label: '学业支持', detail: '协助学院解决同学的学业问题，组建学习群，及时整理与同步课程学习信息。' },
      { label: '活动组织', detail: '策划开展学习经验分享会，统筹分享内容与现场组织，干部考核获评优秀。' },
    ],
    tags: ['学习支持', '活动统筹', '干部考核优秀'],
    photos: [
      { src: './campus/study-sharing-1.jpg', alt: '学习经验分享会合影' },
      { src: './campus/study-sharing-2.jpg', alt: '学习经验分享会现场' },
    ],
  },
  {
    id: '03',
    organization: '启程物流协会',
    role: '学术部部长',
    period: '2021.06 — 2022.06',
    tone: 'lilac',
    points: [
      { label: '行业学习', detail: '持续关注物流与供应链领域知识及行业动态，组织专业内容学习与交流。' },
      { label: '赛事协办', detail: '协助举办浙江省大学生物流设计大赛，参与赛事组织与现场支持。' },
    ],
    tags: ['物流与供应链', '行业研究', '赛事组织'],
    photos: [
      { src: './campus/logistics-association-1.jpg', alt: '浙江省大学生物流设计大赛现场展板' },
      { src: './campus/logistics-association-2.jpg', alt: '浙江省大学生物流设计大赛活动现场' },
    ],
  },
]

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeSection, setActiveSection] = useState('top')
  const [selectedProject, setSelectedProject] = useState(0)
  const [flippedCard, setFlippedCard] = useState<string | null>(null)
  const [projectViewportRef, projectCarousel] = useEmblaCarousel({ loop: true, align: 'center' })

  useEffect(() => {
    document.body.style.overflow = menuOpen || flippedCard ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, flippedCard])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setFlippedCard(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const sectionIds = ['education', 'internship', 'work', 'campus', 'about', 'contact']
    const updateActiveSection = () => {
      const marker = window.scrollY + window.innerHeight * 0.34
      let current = 'top'

      sectionIds.forEach((id) => {
        const section = document.getElementById(id)
        if (section && section.offsetTop <= marker) current = id
      })

      setActiveSection(current)
    }

    updateActiveSection()
    const syncInitialHash = window.setTimeout(() => {
      const target = document.getElementById(window.location.hash.slice(1))
      if (target) target.scrollIntoView({ behavior: 'auto' })
      updateActiveSection()
    }, 120)
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    window.addEventListener('hashchange', updateActiveSection)
    return () => {
      window.clearTimeout(syncInitialHash)
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
      window.removeEventListener('hashchange', updateActiveSection)
    }
  }, [])

  useEffect(() => {
    if (!projectCarousel) return

    const updateSelectedProject = () => setSelectedProject(projectCarousel.selectedScrollSnap())
    updateSelectedProject()
    projectCarousel.on('select', updateSelectedProject)
    projectCarousel.on('reInit', updateSelectedProject)

    return () => {
      projectCarousel.off('select', updateSelectedProject)
      projectCarousel.off('reInit', updateSelectedProject)
    }
  }, [projectCarousel])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const closeMenu = () => setMenuOpen(false)
  const activeSkillCard = skillCards.find((item) => item.id === flippedCard)

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页"><img className="brand-mark" src="./personal-logo.png" alt="赵丽蓉个人 Logo" /><span>PORTFOLIO</span></a>
        <nav className="desktop-nav" aria-label="主导航">
          <a className={activeSection === 'top' ? 'active' : undefined} href="#top" aria-current={activeSection === 'top' ? 'page' : undefined}>关于我</a>
          <a className={activeSection === 'education' ? 'active' : undefined} href="#education" aria-current={activeSection === 'education' ? 'page' : undefined}>教育背景</a>
          <a className={activeSection === 'internship' ? 'active' : undefined} href="#internship" aria-current={activeSection === 'internship' ? 'page' : undefined}>实习经历</a>
          <a className={activeSection === 'work' ? 'active' : undefined} href="#work" aria-current={activeSection === 'work' ? 'page' : undefined}>项目经历</a>
          <a className={activeSection === 'campus' ? 'active' : undefined} href="#campus" aria-current={activeSection === 'campus' ? 'page' : undefined}>校园经历</a>
          <a className={activeSection === 'about' ? 'active' : undefined} href="#about" aria-current={activeSection === 'about' ? 'page' : undefined}>技能与爱好</a>
          <a className={activeSection === 'contact' ? 'active' : undefined} href="#contact" aria-current={activeSection === 'contact' ? 'page' : undefined}>联系我</a>
        </nav>
        <a className="header-cta" href="./resume/">简历 <ArrowUpRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? '关闭菜单' : '打开菜单'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <motion.nav className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label="移动端导航">
          <a className={activeSection === 'top' ? 'active' : undefined} href="#top" onClick={closeMenu}>关于我 <span>01</span></a>
          <a className={activeSection === 'education' ? 'active' : undefined} href="#education" onClick={closeMenu}>教育背景 <span>02</span></a>
          <a className={activeSection === 'internship' ? 'active' : undefined} href="#internship" onClick={closeMenu}>实习经历 <span>03</span></a>
          <a className={activeSection === 'work' ? 'active' : undefined} href="#work" onClick={closeMenu}>项目经历 <span>04</span></a>
          <a className={activeSection === 'campus' ? 'active' : undefined} href="#campus" onClick={closeMenu}>校园经历 <span>05</span></a>
          <a className={activeSection === 'about' ? 'active' : undefined} href="#about" onClick={closeMenu}>技能与爱好 <span>06</span></a>
          <a className={activeSection === 'contact' ? 'active' : undefined} href="#contact" onClick={closeMenu}>联系我 <span>07</span></a>
          <a href="./resume/">查看简历 <span>↗</span></a>
        </motion.nav>
      )}

      <main id="top">
        <section className="hero">
          <div className="color-field color-field-blue" aria-hidden="true" />
          <div className="color-field color-field-lilac" aria-hidden="true" />
          <div className="hero-shell">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="eyebrow"><span className="status-dot" /> HELLO / 你好</p>
              <h1><span>Hi,</span>我是<strong>赵丽蓉</strong></h1>
              <p className="hero-role">运营管理 <span>/ BUSINESS OPERATIONS</span></p>
              <div className="file-strip"><span>MY FILE</span><i /><strong>数据、流程与业务协同</strong></div>
              <p className="hero-summary">物流工程与管理硕士在读，关注销售运营、产品运营与供应链履约与计划。擅长把复杂数据整理成判断，把业务问题推进到闭环。</p>
              <div className="hero-tags"><span>运营管理</span><span>数据分析</span><span>供应链运营</span><span>Vibecoding</span><span>CET-6</span></div>
              <div className="hero-actions">
                <a className="button primary" href="./resume/">查看简历 <ArrowUpRight size={17} /></a>
                <a className="button ghost" href={`mailto:${email}`}>联系我 <Mail size={17} /></a>
              </div>
            </motion.div>

            <motion.div className="hero-visual" initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, delay: 0.08 }}>
              <div className="photo-backdrop" aria-hidden="true" />
              <div className="photo-frame"><img src="./profile-hero-cutout-v2.png" alt="赵丽蓉个人形象照" /></div>
              <div className="visual-caption"><span>BASED IN</span><strong>杭州 / 合肥</strong></div>
              <aside className="now-card"><span>NOW</span><strong>运营 · 供应链</strong><small>寻找 2027 届运营岗位</small></aside>
            </motion.div>
          </div>
          <a className="scroll-cue" href="#education">继续下滑，探索更多 <ArrowDownRight size={17} /></a>
        </section>

        <section className="education-section" id="education">
          <motion.div className="section-heading education-heading" {...reveal}>
            <p>01 / EDUCATION</p>
            <h2>一路向前，也一路<span>向上。</span></h2>
          </motion.div>
          <div className="education-list">
            {educationCards.map((item) => (
              <motion.article className={`education-card ${item.tone}`} key={item.school} {...reveal}>
                <div className="education-date">{item.period}</div>
                <img className="education-emblem" src={item.emblem} alt={`${item.school}校徽`} />
                <div className="education-main">
                  <p>{item.stage}</p>
                  <h3>{item.school}</h3>
                  <strong>{item.degree}</strong>
                </div>
                <ul>
                  {item.points.map((point) => (
                    <li key={point.label}>
                      <span>{point.label}</span>
                      <p>{point.detail}</p>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="internship">
          <motion.div className="section-heading compact" {...reveal}>
            <p>02 / INTERNSHIP</p>
            <h2>在真实业务里，<br />让每个节点<span>继续向前。</span></h2>
          </motion.div>
          <div className="timeline">
            {internshipCards.map((item, index) => (
              <motion.article className="timeline-item" key={item.company} {...reveal}>
                <div className="timeline-node">0{index + 1}</div>
                <div className="timeline-card">
                  <header className="timeline-card-header">
                    <div className="timeline-title">
                      <time>{item.period}</time>
                      <h3>{item.company}</h3>
                      <p className="timeline-role">{item.role}</p>
                    </div>
                    <div className={`timeline-company-logo ${item.logoClass}`}>
                      <img src={item.logo} alt={`${item.company} Logo`} />
                    </div>
                  </header>
                  <div className="timeline-details">
                    {item.points.map((point) => (
                      <div className="timeline-detail" key={point.label}>
                        <strong>{point.label}</strong>
                        <p>{point.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="projects-section" id="work">
          <motion.div className="section-heading projects-heading" {...reveal}>
            <p>03 / PROJECTS</p>
            <h2>钻研新技术，在竞赛中<span>精进。</span></h2>
          </motion.div>
          <motion.div className="project-carousel" {...reveal}>
            <div className="project-viewport" ref={projectViewportRef}>
              <div className="project-track">
                {projects.map((project, index) => (
                  <div className="project-slide" key={project.id}>
                    <article className={`project-card ${project.tone} ${selectedProject === index ? 'is-active' : ''}`}>
                      <div className="project-meta">
                        <span>PROJECT / {project.id}</span>
                        <time>{project.period}</time>
                      </div>
                      <div className="project-body">
                        {project.competition ? (
                          <p className="project-competition">{project.competition}<span aria-hidden="true">|</span>{project.role}</p>
                        ) : (
                          <p className="project-role">{project.role}</p>
                        )}
                        <h3>{project.title}</h3>
                        <p className="project-summary">{project.summary}</p>
                        <ul className="project-details">
                          {project.details.map((detail) => <li key={detail}>{detail}</li>)}
                        </ul>
                        <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                      </div>
                      <div className="project-card-footer">
                        <div className="project-highlight">
                          <strong>{project.highlight}</strong>
                          <span>{project.highlightLabel}</span>
                        </div>
                        {project.download ? (
                          <a className="project-link" href={project.download} download={project.downloadName}>
                            下载项目 <Download size={16} />
                          </a>
                        ) : project.url ? (
                          <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                            访问项目 <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span className="project-type">CASE STUDY</span>
                        )}
                      </div>
                      <div className="project-index" aria-hidden="true">{project.id}</div>
                    </article>
                  </div>
                ))}
              </div>
            </div>
            <div className="project-controls">
              <div className="project-count"><strong>{String(selectedProject + 1).padStart(2, '0')}</strong><span>/ {String(projects.length).padStart(2, '0')}</span></div>
              <div className="project-dots" aria-label="选择项目">
                {projects.map((project, index) => (
                  <button className={selectedProject === index ? 'active' : undefined} key={project.id} onClick={() => projectCarousel?.scrollTo(index)} aria-label={`查看项目 ${index + 1}`} />
                ))}
              </div>
              <div className="project-arrows">
                <button onClick={() => projectCarousel?.scrollPrev()} aria-label="上一个项目" title="上一个项目"><ChevronLeft /></button>
                <button onClick={() => projectCarousel?.scrollNext()} aria-label="下一个项目" title="下一个项目"><ChevronRight /></button>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="campus-section" id="campus">
          <motion.div className="section-heading campus-heading" {...reveal}>
            <p>04 / CAMPUS LIFE</p>
            <h2>把每一次参与，<br />连成<span>成长的航线。</span></h2>
          </motion.div>
          <div className="campus-journey">
            <svg className="campus-flight-path" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
              <path className="flight-path-underlay" d="M50 0 C68 12 34 22 50 34 C68 46 32 56 50 67 C69 79 35 89 50 100" />
              <path className="flight-path-dashes" d="M50 0 C68 12 34 22 50 34 C68 46 32 56 50 67 C69 79 35 89 50 100" />
            </svg>
            {campusExperiences.map((item) => (
              <motion.article className={`campus-item ${item.tone}`} key={item.organization} {...reveal}>
                <div className="campus-copy">
                  <div className="campus-meta"><span>CAMPUS / {item.id}</span><time>{item.period}</time></div>
                  <p className="campus-role">{item.role}</p>
                  <h3>{item.organization}</h3>
                  <div className="campus-details">
                    {item.points.map((point) => (
                      <div className="campus-detail" key={point.label}>
                        <strong>{point.label}</strong>
                        <p>{point.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="campus-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="campus-plane" aria-hidden="true"><Send /></div>
                <div className="campus-gallery" aria-label={`${item.organization}活动照片`}>
                  {item.photos.map((photo, photoIndex) => (
                    <figure className={`campus-photo photo-${photoIndex + 1}`} key={photo.src}>
                      <img src={photo.src} alt={photo.alt} loading="lazy" />
                    </figure>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="about-section skills-showcase" id="about">
          <motion.div className="section-heading skills-heading" {...reveal}>
            <p>05 / SKILLS & INTERESTS</p>
            <div className="skills-heading-copy">
              <h2>能力有方法，热爱有<span>回响。</span></h2>
            </div>
          </motion.div>
          <div className="skills-doodles" aria-hidden="true">
            <span className="skills-doodle doodle-coffee"><Coffee /></span>
            <span className="skills-doodle doodle-headphones"><Headphones /></span>
            <span className="skills-doodle doodle-camera"><Camera /></span>
            <span className="skills-doodle doodle-flower"><Flower2 /></span>
            <span className="skills-doodle doodle-music"><Music2 /></span>
            <span className="skills-doodle doodle-footsteps"><Footprints /></span>
            <span className="skills-doodle doodle-sparkles"><Sparkles /></span>
          </div>
          <div className="skills-dual-layout">
            <motion.div className="skill-zone skill-zone-work" {...reveal}>
              <header className="skill-zone-header">
                <div>
                  <span>09 / WORK MODE</span>
                  <h3>技能</h3>
                  <p>数据、工具与业务表达</p>
                </div>
                <BarChart3 aria-hidden="true" />
              </header>
              <div className="flip-card-grid skill-card-grid">
                {skillCards.filter((item) => item.category === 'skill').map((item) => (
                  <button
                    className={`mini-skill-card ${item.tone}`}
                    type="button"
                    key={item.id}
                    aria-haspopup="dialog"
                    aria-label={`查看${item.name}介绍`}
                    onClick={() => setFlippedCard(item.id)}
                  >
                    <strong>{item.name}</strong>
                  </button>
                ))}
              </div>
              <p className="skill-zone-hint"><Sparkles aria-hidden="true" />点击卡片可查看详情哦~</p>
            </motion.div>
            <motion.div className="skill-zone skill-zone-life" {...reveal}>
              <header className="skill-zone-header">
                <div>
                  <span>05 / LIFE MODE</span>
                  <h3>爱好</h3>
                  <p>让日常保持松弛与好奇</p>
                </div>
                <Heart aria-hidden="true" />
              </header>
              <div className="flip-card-grid hobby-card-grid">
                {skillCards.filter((item) => item.category === 'hobby').map((item) => (
                  <button
                    className={`mini-skill-card ${item.tone}`}
                    type="button"
                    key={item.id}
                    aria-haspopup="dialog"
                    aria-label={`查看${item.name}介绍`}
                    onClick={() => setFlippedCard(item.id)}
                  >
                    <strong>{item.name}</strong>
                  </button>
                ))}
              </div>
              <p className="skill-zone-hint"><Sparkles aria-hidden="true" />点击卡片可查看详情哦~</p>
            </motion.div>
          </div>
          <AnimatePresence>
            {activeSkillCard && (
              <motion.div
                className="skill-card-overlay"
                role="dialog"
                aria-modal="true"
                aria-label={`${activeSkillCard.name}介绍`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFlippedCard(null)}
              >
                <button className="skill-modal-close" type="button" onClick={() => setFlippedCard(null)} aria-label="关闭卡片" title="关闭">
                  <X />
                </button>
                <div className="expanded-skill-card" onClick={(event) => event.stopPropagation()}>
                  <div className="expanded-card-inner" key={activeSkillCard.id}>
                    <div className={`expanded-card-face expanded-card-front ${activeSkillCard.tone}`}><strong>{activeSkillCard.name}</strong></div>
                    <div className="expanded-card-face expanded-card-back">
                      <img src={activeSkillCard.image} alt={`${activeSkillCard.name}卡通场景`} />
                      <div className="expanded-card-copy"><strong>{activeSkillCard.name}</strong><p>{activeSkillCard.description}</p></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        <section className="contact-section" id="contact">
          <motion.div className="contact-card" {...reveal}>
            <div className="contact-card-content">
              <p className="contact-kicker">06 / LET'S TALK</p>
              <h2>下一段经历，<br />也许可以一起<span>推进。</span></h2>
              <p className="contact-description">我正在寻找 2027 届运营相关岗位机会。期待在销售运营、产品运营与供应链运营中，把数据判断转化为行动，把业务问题推进到闭环。</p>
              <div className="contact-actions">
                <a className="contact-button primary" href={`mailto:${email}`}><Mail size={17} />写邮件给我<ArrowUpRight size={16} /></a>
                <button className="contact-button ghost" type="button" onClick={copyEmail}>{copied ? <Check size={17} /> : <Copy size={17} />}{copied ? '已复制邮箱' : '复制邮箱'}</button>
                <a className="contact-button ghost" href="./resume/"><Download size={17} />查看简历</a>
              </div>
            </div>
            <div className="contact-card-footer">
              <span>赵丽蓉 · 运营 / 供应链</span>
              <a href="#top">回到顶部 <ArrowUpRight size={17} /></a>
            </div>
          </motion.div>
        </section>
      </main>

      <footer>
        <span>赵丽蓉 © 2026</span>
        <span>杭州 · CHINA</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </>
  )
}

export default App
