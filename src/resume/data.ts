export type DetailPoint = {
  label: string
  detail: string
}

export const profile = {
  name: '赵丽蓉',
  englishName: 'ZHAO LIRONG',
  headline: '销售运营 · 渠道运营 · 供应链运营',
  status: '2027 届硕士毕业生',
  party: '中共党员',
  phone: '132 0988 0705（微信同号）',
  phoneRaw: '+8613209880705',
  email: 'zlr_cn@163.com',
  website: 'https://rinazhao.top/',
  websiteLabel: 'rinazhao.top（个人主页）',
  location: '杭州 / 合肥',
}

export const skillTags = ['Vibecoding', 'Python', 'SQL', 'Excel', 'Power BI', 'AI 自动化', 'PPT / PS', 'CET-6']

export const education = [
  {
    period: '2024.09 — 至今',
    school: '合肥工业大学',
    degree: '物流工程与管理 · 硕士',
    points: [
      { label: '相关课程', detail: '数理统计（100）、最优化方法（97）、工程经济学（92）、管理研究方法（87）等。' },
      { label: '荣誉奖项', detail: '合肥工业大学一等学业奖学金 2 次、校三好学生称号。' },
    ] satisfies DetailPoint[],
  },
  {
    period: '2020.09 — 2024.06',
    school: '浙江工商大学',
    degree: '物流管理 · 本科',
    points: [
      { label: '学业成绩', detail: '成绩排名 1/87，GPA 3.91，保研至合肥工业大学物流工程与管理专业。' },
      { label: '相关课程', detail: '仓储管理与库存控制（98）、统计学（94）、运输管理（93）、数据库原理与应用（92）、供应链管理（88）等。' },
      { label: '荣誉奖项', detail: '优秀学生综合一等奖学金 3 次、浙江省省政府奖学金 2 次、校三好学生称号 2 次。' },
    ] satisfies DetailPoint[],
  },
]

export const internships = [
  {
    company: '杭州认养一头牛生物科技有限公司',
    role: '销售管理实习生',
    period: '2026.03 — 2026.07',
    points: [
      { label: '破价专项整改', detail: '通过店铺巡价、投诉闭环处理及分销商专项整改机制，推进破价专项治理，推动 Q2 常温奶整体破价率下降 1.5%，分销渠道破价率下降 3%。' },
      { label: '工作流程自动化', detail: '参与建设销管飞书多维表项目，实现数据管理、破价投诉、整改弹送、考核确认及可视化看板的一体化运作与管理，巡店效率提升 50%。' },
      { label: '数据分析与整理', detail: '按周统计品牌电商、新零售及生鲜渠道价格表现并输出破价趋势分析；开发 AI 数据处理工具，自动整理新零售破价考核名单，处理效率提升 80%。' },
    ] satisfies DetailPoint[],
  },
  {
    company: '浙江大华技术股份有限公司',
    role: '渠道运营实习生',
    period: '2025.10 — 2025.11',
    points: [
      { label: '分销订单处理', detail: '负责天猫分销渠道订单全流程运营，完成合作协议签订、合同录入及审批、仓储备货、物流跟踪等工作，维护订单台账与交付状态；针对库存不足、物流延迟等异常，协同仓储、物流、商务等部门调整交付方案。' },
      { label: '需求分析与解决方案', detail: '通过客户交流与线上市场调研了解需求，结合产品功能及应用场景，为客户提供产品解决方案及技术说明支持，促进需求匹配与产品落地。' },
      { label: '售后及退货处理', detail: '跟进客户安装、使用及功能问题，协调退货申请、物流回收、货物检查清点等流程，推动售后问题闭环，提升服务响应能力。' },
    ] satisfies DetailPoint[],
  },
  {
    company: '杭州直行便供应链有限公司',
    role: '采购管理实习生',
    period: '2023.10 — 2024.01',
    points: [
      { label: '数据分析与处理', detail: '跟踪 D2C 海外订单履约全流程，监控商家 3 天发货率、5 天到货率、仓库 7 天发货率等核心指标，结合订单状态、物流节点及异常类型进行分类排查，保障仓库 7 天发货率稳定在 70% 左右。' },
      { label: '运营执行', detail: '负责 D2C 账号全量订单供应链跟进，协助开展货源筛选优化、商品链接维护、退换货处理及到货入库异常跟进，动态优化货源配置，推动店铺 3 天发货率稳定在 85% 以上。' },
      { label: '跨部门协同', detail: '联动采购、仓库、商家及业务团队推进异常订单闭环，围绕下单、采购、发货、到货、入库等节点同步信息并落实方案，保障订单履约交付指标不低于 90%。' },
    ] satisfies DetailPoint[],
  },
  {
    company: '浙江工商大学管理工程与电子商务学院',
    role: '学办助理',
    period: '2021.03 — 2023.10',
    points: [
      { label: '高效执行', detail: '协助辅导员处理档案归档、报告整理、材料汇总及财务报销等事务；曾在短时间内完成 200 余份毕业档案整理，在高任务量下仍保证信息核对准确、工作推进有序。' },
      { label: '细致落实', detail: '负责学生、教师及学院相关部门的事务对接，耐心解答问题、细致核对材料，及时协调信息偏差与材料遗漏，保障事务顺利推进。' },
    ] satisfies DetailPoint[],
  },
]

export const projects = [
  {
    period: '2024.09',
    title: '华为杯研究生数学建模竞赛｜数据驱动下磁性元件的磁芯损耗建模',
    role: '队长（1/3）· 全国二等奖',
    points: [
      { label: '建模分析与优化', detail: '针对磁性元件损耗预测与工况优化，对多源实验数据开展清洗、特征提取与预处理，结合 PCA 降维、相关性分析及交互特征构造识别影响因素，构建分类模型，精确率达 98.96%；通过函数拟合修正标准方程，并构建磁芯损耗最小化与传输磁能最大化的多目标优化模型，形成 5 万余字报告。' },
    ] satisfies DetailPoint[],
  },
  {
    period: '2022.10 — 2023.02',
    title: '浙江省大学生物流设计大赛｜双碳背景下循环包装箱 C 端运营解决方案',
    role: '负责人（1/5）· 省赛二等奖',
    points: [
      { label: '运营方案设计', detail: '通过网络调研与 SWOT 分析识别循环包装箱运作难点，运用系统仿真制定驿站及社区配送优化方案，采用 DBSCAN 聚类选址分析回收网络布局，并以演化博弈分析消费者行为、制定激励制度，形成 6.2 万余字项目报告。' },
    ] satisfies DetailPoint[],
  },
  {
    period: '2026.02 — 至今',
    title: 'AI Agent 驱动的自媒体运营与 SOP 自动化实践',
    role: 'AI 个人实践',
    points: [
      { label: '自动化运营', detail: '基于 OpenClaw 部署自动化发布工作流，结合 Gemini 图像生成、Claude 文案生成、Python + CDP 浏览器自动化，搭建“选题输入—AI 作图—文案生成—排版发布—自动发布”的一体化内容运营 SOP。' },
    ] satisfies DetailPoint[],
  },
  {
    period: '2026.07',
    title: 'OfferPath｜运营面试知识管理平台',
    role: 'AI 个人实践',
    url: 'https://offerpath.rinazhao.top/',
    linkLabel: 'offerpath.rinazhao.top',
    points: [
      { label: '产品策划与落地', detail: '针对面试资料来源分散、整理效率低、复习缺乏体系等问题，打通微信截图收集、AI 内容提取、答案优化、能力标签分类及学习进度管理流程，将多渠道碎片化面经沉淀为结构化题库，形成“内容收集—整理归类—重点复习—持续沉淀”的完整闭环。' },
    ] satisfies DetailPoint[],
  },
  {
    period: '2026.07',
    title: '岸题录 ShoreNote｜专业知识错题库',
    role: 'AI 个人实践',
    url: 'https://shorenote.rinazhao.top/',
    linkLabel: 'shorenote.rinazhao.top',
    points: [
      { label: '产品设计与迭代', detail: '针对专业知识学习中错题分散、整理效率低及复盘困难，完成需求拆解、产品设计、功能开发与持续迭代，实现多格式资料导入、智能解析、分类归档、错题复盘和学习笔记管理，形成“收集—整理—复习”的完整学习闭环。' },
    ] satisfies DetailPoint[],
  },
]

export const selfEvaluation: DetailPoint[] = [
  { label: '业务协同', detail: '具备销售、渠道、采购、仓储、物流及内容团队的跨部门协作经验，重视节点跟进与问题闭环。' },
  { label: '心理素质', detail: '性格认真负责，沟通力与执行力强，能够在高压环境中保持稳定产出，并快速融入团队。' },
]

export const skillGroups: DetailPoint[] = [
  { label: '数据分析', detail: '熟练掌握 Python、SQL、Excel、Power BI 等数据分析软件及 AI 自动化辅助工具。' },
  { label: '语言能力', detail: '通过大学英语四、六级考试，具备较好的英语读写译能力。' },
  { label: '办公技能', detail: '熟练使用 Word、Excel、PPT、Power BI、Photoshop，能够高效产出专业文档、报告与可视化内容。' },
]
