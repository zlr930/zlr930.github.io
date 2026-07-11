import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Copy,
  Download,
  Mail,
  Menu,
  X,
} from 'lucide-react'
import { experience, projects, skills } from './data'

const email = 'zlr_cn@163.com'

const reveal = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 110, damping: 24 })

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <motion.div className="progress" style={{ scaleX }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回首页">ZLR<span>©26</span></a>
        <nav className="desktop-nav" aria-label="主导航">
          <a href="#education">教育</a>
          <a href="#work">项目</a>
          <a href="#internship">实习</a>
          <a href="#about">关于</a>
        </nav>
        <a className="header-cta" href={`mailto:${email}`}>联系我 <ArrowUpRight size={17} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? '关闭菜单' : '打开菜单'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <motion.nav className="mobile-nav" initial={{ opacity: 0 }} animate={{ opacity: 1 }} aria-label="移动端导航">
          <a href="#education" onClick={closeMenu}>教育 <span>01</span></a>
          <a href="#work" onClick={closeMenu}>项目 <span>02</span></a>
          <a href="#internship" onClick={closeMenu}>实习 <span>03</span></a>
          <a href="#about" onClick={closeMenu}>关于 <span>04</span></a>
          <a href={`mailto:${email}`}>联系 <span>↗</span></a>
        </motion.nav>
      )}

      <main id="top">
        <section className="hero">
          <div className="hero-grid">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <p className="eyebrow"><span className="status-dot" /> 27 届应届生 · 一周内到岗</p>
              <h1>赵丽蓉</h1>
              <p className="hero-en">ZHAO LI RONG</p>
              <p className="hero-intro">把数据变成判断，<br />把流程变成<span>结果。</span></p>
              <dl className="profile-facts">
                <div><dt>性别</dt><dd>女</dd></div>
                <div><dt>政治面貌</dt><dd>中共党员</dd></div>
                <div><dt>手机</dt><dd><a href="tel:+8613209880705">132 0988 0705</a></dd></div>
                <div><dt>邮箱</dt><dd><a href={`mailto:${email}`}>{email}</a></dd></div>
              </dl>
              <div className="hero-actions">
                <a className="button primary" href="#education">查看详情 <ArrowDownRight size={20} /></a>
                <a className="button resume" href="./resume.pdf" download="赵丽蓉-个人简历.pdf">下载简历 <Download size={19} /></a>
                <a className="button ghost" href={`mailto:${email}`}>联系我 <Mail size={19} /></a>
              </div>
            </motion.div>

            <motion.div className="portrait-wrap" initial={{ opacity: 0, scale: 0.94, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: -2 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <div className="portrait-label">DATA / SUPPLY CHAIN / AI</div>
              <img src="./portrait.jpg" alt="赵丽蓉高清证件照" />
              <div className="portrait-stamp">OPEN<br />TO WORK</div>
            </motion.div>

            <div className="hero-side-note">HFUT · LOGISTICS ENGINEERING & MANAGEMENT</div>
          </div>
          <div className="ticker" aria-hidden="true">
            <div className="ticker-track">
              <span>DATA ANALYSIS</span><i>✳</i><span>SUPPLY CHAIN</span><i>✳</i><span>AI AUTOMATION</span><i>✳</i>
              <span>DATA ANALYSIS</span><i>✳</i><span>SUPPLY CHAIN</span><i>✳</i><span>AI AUTOMATION</span><i>✳</i>
            </div>
          </div>
        </section>

        <section className="education-section" id="education">
          <motion.div className="section-heading education-heading" {...reveal}>
            <p>01 / EDUCATION</p>
            <h2>一路向前，<br />也一路<span>向上。</span></h2>
          </motion.div>
          <div className="education-list">
            <motion.article className="education-card current" {...reveal}>
              <div className="education-date">2024.09 — 至今</div>
              <div className="education-main">
                <p>硕士研究生</p>
                <h3>合肥工业大学</h3>
                <strong>物流工程与管理</strong>
              </div>
              <ul>
                <li>一等学业奖学金 × 2</li>
                <li>校三好学生</li>
                <li>核心课程：数理统计 100 · 最优化方法 97</li>
              </ul>
              <span className="education-mark">HFUT</span>
            </motion.article>
            <motion.article className="education-card bachelor" {...reveal}>
              <div className="education-date">2020.09 — 2024.06</div>
              <div className="education-main">
                <p>本科</p>
                <h3>浙江工商大学</h3>
                <strong>物流管理</strong>
              </div>
              <ul>
                <li>专业排名 1 / 87 · GPA 3.91</li>
                <li>优秀学生综合一等奖学金 × 3</li>
                <li>保研至合肥工业大学</li>
              </ul>
              <span className="education-mark">ZJSU</span>
            </motion.article>
          </div>
        </section>

        <section className="projects-section" id="work">
          <motion.div className="section-heading" {...reveal}>
            <p>02 / SELECTED WORK</p>
            <h2>不只做分析，<br />更关心它<span>解决什么。</span></h2>
          </motion.div>
          <div className="project-list">
            {projects.map((project, index) => (
              <motion.article className={`project-card ${project.color}`} key={project.id} {...reveal}>
                <div className="project-meta">
                  <span>{project.id}</span>
                  <span>{project.year}</span>
                </div>
                <div className="project-body">
                  <p className="project-role">{project.role}</p>
                  <h3>{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                  <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="project-result">
                  <strong>{project.result}</strong>
                  <span>{project.resultLabel}</span>
                  <ArrowUpRight aria-hidden="true" />
                </div>
                <div className="project-index">0{index + 1}</div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="internship">
          <motion.div className="section-heading compact" {...reveal}>
            <p>03 / INTERNSHIP</p>
            <h2>在真实业务里，<br />让每个节点<span>继续向前。</span></h2>
          </motion.div>
          <div className="timeline">
            {experience.map((item, index) => (
              <motion.article className="timeline-item" key={item.company} {...reveal}>
                <div className="timeline-number">0{index + 1}</div>
                <time>{item.date}</time>
                <div className="timeline-main">
                  <h3>{item.company}</h3>
                  <p className="timeline-role">{item.role}</p>
                  <p>{item.description}</p>
                  <div className="metrics">{item.metrics.map((metric) => <span key={metric}>{metric}</span>)}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <motion.div className="about-intro" {...reveal}>
            <p className="section-kicker">04 / ABOUT ME</p>
            <div className="about-title">
              <h2>理性脑，<br /><span>行动派。</span></h2>
              <p>物流工程与管理硕士在读。喜欢拆解复杂问题，也愿意进入现场，把分析变成可执行的动作。</p>
            </div>
          </motion.div>

          <motion.div className="skills-panel" {...reveal}>
              <p className="panel-label">TOOLBOX</p>
              <div className="skill-cloud">
                {skills.map((skill, index) => <span className={index % 3 === 0 ? 'accent' : ''} key={skill}>{skill}</span>)}
              </div>
              <p className="language">CET-4 / CET-6 · 英语读写</p>
          </motion.div>
        </section>

        <section className="contact-section" id="contact">
          <p>LET'S MAKE THINGS MOVE</p>
          <h2>有合适的机会？<br /><a href={`mailto:${email}`}>聊聊吧<span>↗</span></a></h2>
          <div className="contact-actions">
            <button onClick={copyEmail}>{copied ? <Check size={20} /> : <Copy size={20} />} {copied ? '已复制' : email}</button>
            <a href={`mailto:${email}`} aria-label="发送邮件"><Mail /></a>
          </div>
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
