import { useEffect, useMemo, useState } from 'react'
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  FolderKanban,
  Globe2,
  GraduationCap,
  Home,
  Mail,
  MapPin,
  Phone,
  Printer,
  UserRoundCheck,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import {
  education,
  internships,
  profile,
  projects,
  selfEvaluation,
  skillGroups,
  skillTags,
  type DetailPoint,
} from './data'

const A4_WIDTH = 794
const A4_HEIGHT = 1123
const EMPHASIS_PHRASES = [
  '成绩排名 1/87',
  '保研至合肥工业大学',
  '店铺巡价、投诉闭环处理及分销商专项整改机制',
  '销管飞书多维表项目',
  '3 天发货率、5 天到货率、仓库 7 天发货率',
  'D2C 账号全量订单供应链跟进',
  '采购、仓库、商家及业务团队推进异常订单闭环',
  '清洗、特征提取与预处理',
  'PCA 降维、相关性分析及交互特征构造',
  '函数拟合',
  '多目标优化模型',
  '系统仿真',
  'DBSCAN 聚类选址',
  '自动化发布工作流',
  'Python、SQL、Excel、Power BI',
  '大学英语四、六级考试',
  'Word、Excel、PPT、Power BI、Photoshop',
]

const emphasisPattern = new RegExp(`(${EMPHASIS_PHRASES.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g')
const emphasisSet = new Set(EMPHASIS_PHRASES)

function EmphasizedDetail({ text }: { text: string }) {
  return text.split(emphasisPattern).map((part, index) => (
    emphasisSet.has(part)
      ? <strong className="detail-emphasis" key={`${part}-${index}`}>{part}</strong>
      : <span key={`${part}-${index}`}>{part}</span>
  ))
}

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="resume-section-title">
      <span className="section-icon" aria-hidden="true">{icon}</span>
      <h2>{children}</h2>
      <span className="section-divider" aria-hidden="true"><i /></span>
    </div>
  )
}

function DetailList({ points }: { points: DetailPoint[] }) {
  return (
    <ul className="detail-list">
      {points.map((point) => <li key={point.label}><strong>{point.label}：</strong><span><EmphasizedDetail text={point.detail} /></span></li>)}
    </ul>
  )
}

function IdentityHeader() {
  return (
    <header className="identity-header">
      <div className="identity-copy">
        <p className="resume-kicker"><span /> OPERATIONS & BUSINESS</p>
        <div className="name-row">
          <h1>{profile.name}</h1>
          <div><strong>{profile.englishName}</strong><span>{profile.status}</span></div>
        </div>
        <div className="contact-list">
          <span className="party-info"><BadgeCheck />{profile.party}</span>
          <a href={`tel:${profile.phoneRaw}`}><Phone />{profile.phone}</a>
          <a href={`mailto:${profile.email}`}><Mail />{profile.email}</a>
          <a href={profile.website} target="_blank" rel="noreferrer"><Globe2 />{profile.websiteLabel}</a>
          <span><MapPin />{profile.location}</span>
        </div>
        <div className="header-skills" aria-label="个人技能">
          {skillTags.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </div>
      <div className="portrait-frame"><img src="../portrait.jpg" alt="赵丽蓉证件照" /></div>
    </header>
  )
}

function EducationEntry({ item }: { item: (typeof education)[number] }) {
  return (
    <article className="resume-entry education-entry">
      <div className="entry-head">
        <div><h3>{item.school}</h3><p className="entry-role">{item.degree}</p></div>
        <time>{item.period}</time>
      </div>
      <DetailList points={item.points} />
    </article>
  )
}

function InternshipEntry({ item }: { item: (typeof internships)[number] }) {
  return (
    <article className="resume-entry internship-entry">
      <div className="entry-head internship-head">
        <h3>{item.company}</h3>
        <p className="entry-role">{item.role}</p>
        <time>{item.period}</time>
      </div>
      <DetailList points={item.points} />
    </article>
  )
}

function ProjectEntry({ item }: { item: (typeof projects)[number] }) {
  return (
    <article className="resume-entry project-entry">
      <div className="entry-head">
        <div><h3>{item.title}<span className="project-inline-role">| {item.role}</span></h3></div>
        <time>{item.period}</time>
      </div>
      <DetailList points={item.points} />
      {item.url && <a className="project-link" href={item.url} target="_blank" rel="noreferrer">{item.linkLabel}<ArrowUpRight /></a>}
    </article>
  )
}

function ResumePage() {
  return (
    <article className="resume-page" aria-label="赵丽蓉单页个人简历">
      <div className="paper-frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <IdentityHeader />
      <div className="single-column-content">
        <section>
          <SectionTitle icon={<GraduationCap />}>教育背景</SectionTitle>
          <div className="entry-list education-list">{education.map((item) => <EducationEntry item={item} key={item.school} />)}</div>
        </section>
        <section>
          <SectionTitle icon={<BriefcaseBusiness />}>实习经历</SectionTitle>
          <div className="entry-list">{internships.map((item) => <InternshipEntry item={item} key={item.company} />)}</div>
        </section>
        <section>
          <SectionTitle icon={<FolderKanban />}>项目经历</SectionTitle>
          <div className="entry-list project-list">{projects.map((item) => <ProjectEntry item={item} key={item.title} />)}</div>
        </section>
        <section>
          <SectionTitle icon={<UserRoundCheck />}>自我评价</SectionTitle>
          <div className="self-evaluation"><DetailList points={[...skillGroups, ...selfEvaluation]} /></div>
        </section>
      </div>
    </article>
  )
}

export default function ResumeApp() {
  const [fitScale, setFitScale] = useState(1)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const updateFit = () => setFitScale(Math.min(1, (window.innerWidth - 28) / A4_WIDTH))
    updateFit()
    window.addEventListener('resize', updateFit)
    return () => window.removeEventListener('resize', updateFit)
  }, [])

  const scale = useMemo(() => Math.min(1.2, fitScale * zoom), [fitScale, zoom])

  return (
    <main className="resume-viewer">
      <nav className="resume-toolbar" aria-label="简历查看工具">
        <a className="home-action" href="../" title="返回个人主页"><Home /><span>返回主页</span></a>
        <div className="single-page-label"><span />A4 单页简历</div>
        <div className="toolbar-actions">
          <button className="icon-button" onClick={() => setZoom((value) => Math.max(0.8, value - 0.2))} title="缩小" aria-label="缩小"><ZoomOut /></button>
          <span className="zoom-value">{Math.round(scale * 100)}%</span>
          <button className="icon-button" onClick={() => setZoom((value) => Math.min(1.8, value + 0.2))} title="放大" aria-label="放大"><ZoomIn /></button>
          <button className="print-button" onClick={() => window.print()}><Printer /><span>打印 / 导出 PDF</span></button>
        </div>
      </nav>

      <section className="screen-resume">
        <div className="page-viewport">
          <div className="page-stage" style={{ width: A4_WIDTH * scale, height: A4_HEIGHT * scale }}>
            <div className="scaled-page" style={{ scale, transformOrigin: 'top left' }}><ResumePage /></div>
          </div>
        </div>
      </section>

      <section className="print-resume" aria-hidden="true"><ResumePage /></section>
    </main>
  )
}
