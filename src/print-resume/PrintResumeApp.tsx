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
  education as educationData,
  internships as internshipsData,
  profile,
  projects as projectsData,
  selfEvaluation as selfEvaluationData,
  skillGroups,
  skillTags,
  type DetailPoint,
} from '../resume/data'

const A4_WIDTH = 794
const A4_HEIGHT = 1123

type PrintPoint = DetailPoint
type PrintLink = { url: string; label: string }
type PrintEntry = { title: string; role?: string; period: string; points: PrintPoint[]; links?: PrintLink[] }

const education: PrintEntry[] = educationData.map((item) => ({ title: item.school, role: item.degree, period: item.period, points: item.points }))
const internships: PrintEntry[] = internshipsData.map((item) => ({ title: item.company, role: item.role, period: item.period, points: item.points }))
const projects: PrintEntry[] = [
  ...projectsData.slice(0, 3).map((item) => ({
    title: item.title,
    role: item.role,
    period: item.period,
    points: item.points,
  })),
  {
    title: 'OfferPath & ShoreNote',
    role: 'AI 个人实践',
    period: '2026.07',
    points: [{
      label: '产品策划与开发',
      detail: '针对碎片化资料整理与复习效率问题，独立完成两款知识管理产品的需求拆解、产品设计与上线迭代；以自然语言需求驱动 AI 辅助开发，完成代码生成、功能调试与优化，并将 AI 内容提取、智能解析、分类归档等能力融入产品，实现从业务需求到可用产品的快速落地。',
    }],
    links: [
      { url: projectsData[3].url!, label: 'offerpath.rinazhao.top' },
      { url: projectsData[4].url!, label: 'shorenote.rinazhao.top' },
    ],
  },
]
const selfEvaluation: PrintPoint[] = [...skillGroups, ...selfEvaluationData]

function PointList({ points }: { points: PrintPoint[] }) {
  return <ul className="print-detail-list">{points.map((point) => <li key={point.label}><strong>{point.label}：</strong><span>{point.detail}</span></li>)}</ul>
}

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="print-section-title"><span className="print-section-icon" aria-hidden="true">{icon}</span><h2>{children}</h2><span className="print-section-divider" aria-hidden="true"><i /></span></div>
}

function Entry({ item, variant }: { item: PrintEntry; variant: 'education' | 'internship' | 'project' }) {
  return (
    <article className={`print-entry print-${variant}-entry`}>
      <div className={`print-entry-head${variant === 'internship' ? ' print-internship-head' : ''}`}>
        {variant === 'internship' ? (
          <><h3>{item.title}</h3><span className="print-entry-role">{item.role}</span><time>{item.period}</time></>
        ) : (
          <><div className="print-entry-heading"><h3>{item.title}<span className="print-inline-role">| {item.role}</span></h3></div><time>{item.period}</time></>
        )}
      </div>
      <PointList points={item.points} />
      {item.links && <div className="print-project-links">{item.links.map((link) => <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight /></a>)}</div>}
    </article>
  )
}

function PrintPage() {
  return (
    <article className="print-page" aria-label="赵丽蓉单页纸质版个人简历">
      <div className="print-paper-frame" aria-hidden="true"><i /><i /><i /><i /></div>
      <header className="print-identity-header">
        <div className="print-identity-copy">
          <p className="print-kicker"><span /> OPERATIONS & BUSINESS</p>
          <div className="print-name-row"><h1>{profile.name}</h1><div><strong>{profile.englishName}</strong><span>{profile.status}</span></div></div>
          <div className="print-contact-list"><span><BadgeCheck />{profile.party}</span><a href={`tel:${profile.phoneRaw}`}><Phone />{profile.phone}</a><a href={`mailto:${profile.email}`}><Mail />{profile.email}</a><a href={profile.website} target="_blank" rel="noreferrer"><Globe2 />{profile.websiteLabel}</a><span><MapPin />{profile.location}</span></div>
          <div className="print-header-skills">{skillTags.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </div>
        <div className="print-portrait-frame"><img src="../../portrait.jpg" alt="赵丽蓉证件照" /></div>
      </header>

      <div className="print-single-column-content">
        <section><SectionTitle icon={<GraduationCap />}>教育背景</SectionTitle><div className="print-entry-list">{education.map((item) => <Entry item={item} variant="education" key={item.title} />)}</div></section>
        <section><SectionTitle icon={<BriefcaseBusiness />}>实习经历</SectionTitle><div className="print-entry-list">{internships.map((item) => <Entry item={item} variant="internship" key={item.title} />)}</div></section>
        <section><SectionTitle icon={<FolderKanban />}>项目经历</SectionTitle><div className="print-entry-list print-project-list">{projects.map((item) => <Entry item={item} variant="project" key={item.title} />)}</div></section>
        <section><SectionTitle icon={<UserRoundCheck />}>自我评价</SectionTitle><div className="print-self-evaluation"><PointList points={selfEvaluation} /></div></section>
      </div>
      <footer className="print-page-footer" aria-hidden="true" />
    </article>
  )
}

export default function PrintResumeApp() {
  const [fitScale, setFitScale] = useState(1)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    const updateFit = () => setFitScale(Math.min(1, (window.innerWidth - 28) / A4_WIDTH))
    updateFit()
    window.addEventListener('resize', updateFit)
    return () => window.removeEventListener('resize', updateFit)
  }, [])

  const scale = useMemo(() => Math.min(1.25, fitScale * zoom), [fitScale, zoom])

  return (
    <main className="print-resume-viewer">
      <nav className="print-toolbar" aria-label="纸质版简历工具">
        <a className="print-home-action" href="../../" title="返回个人主页"><Home /><span>返回主页</span></a>
        <div className="print-page-label"><span />A4 纸质版简历</div>
        <div className="print-toolbar-actions">
          <button className="print-icon-button" onClick={() => setZoom((value) => Math.max(.8, value - .2))} title="缩小" aria-label="缩小"><ZoomOut /></button>
          <span className="print-zoom-value">{Math.round(scale * 100)}%</span>
          <button className="print-icon-button" onClick={() => setZoom((value) => Math.min(1.8, value + .2))} title="放大" aria-label="放大"><ZoomIn /></button>
          <button className="print-action-button" onClick={() => window.print()}><Printer /><span>打印 / 下载 PDF</span></button>
        </div>
      </nav>
      <section className="print-screen-resume"><div className="print-page-viewport"><div className="print-page-stage" style={{ width: A4_WIDTH * scale, height: A4_HEIGHT * scale }}><div className="print-scaled-page" style={{ scale, transformOrigin: 'top left' }}><PrintPage /></div></div></div></section>
      <section className="print-only-resume" aria-hidden="true"><PrintPage /></section>
    </main>
  )
}
