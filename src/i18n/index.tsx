import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type Lang = 'en' | 'zh';

const translations = {
  en: {
    // TopBar
    searchPlaceholder: 'Search your local knowledge...',
    newNote: 'New Note',
    localAI: 'Local AI',
    settings: 'Settings',

    // Sidebar
    knowledgeVault: 'Knowledge Vault',
    dashboard: 'Dashboard',
    allNotes: 'All Notes',
    graphView: 'Graph View',
    templates: 'Templates',
    import: 'Import',
    sidebarSettings: 'Settings',
    folders: 'Folders',
    notesCount: 'notes',
    tagsCount: 'tags',

    // Dashboard
    goodEvening: 'Good evening',
    goodMorning: 'Good morning',
    goodAfternoon: 'Good afternoon',
    overviewDesc: "Here's an overview of your knowledge vault.",
    totalNotes: 'Total Notes',
    backlinks: 'Backlinks',
    tags: 'Tags',
    storage: 'Storage',
    recentNotes: 'Recent Notes',
    viewAll: 'View all',
    knowledgeGraph: 'Knowledge Graph',
    expand: 'Expand',
    quickActions: 'Quick Actions',
    localAiAssistant: 'Local AI Assistant',
    aiReady: 'Ready',
    aiDesc: 'Your private AI runs locally. Ask questions about your notes, generate summaries, find connections.',
    chat: 'Chat',
    summarize: 'Summarize',
    connect: 'Connect',
    askAiPlaceholder: 'Ask AI about your knowledge base...',

    // Editor
    bold: 'Bold',
    italic: 'Italic',
    h1: 'H1',
    h2: 'H2',
    list: 'List',
    code: 'Code',
    quote: 'Quote',
    link: 'Link',
    image: 'Image',
    divider: 'Divider',
    untitled: 'Untitled',
    lastEdited: 'Last edited',

    // Search
    searchNotesPlaceholder: 'Search notes, tags, content...',
    recentSearches: 'Recent searches',
    resultsFound: 'results found',
    noResults: 'No results found for',

    // Templates
    templateStudio: 'Template Studio',
    templateDesc: 'Professional templates for every industry. Jumpstart your knowledge base.',
    useTemplate: 'Use Template',
    createKnowledgeBase: 'Create Knowledge Base',
    modules: 'modules',
    users: 'users',
    industry: 'Industry',
    allTemplates: 'All',
    legal: 'Legal',
    medical: 'Medical',
    education: 'Education',
    consulting: 'Consulting',
    research: 'Research',
    media: 'Media',
    enterprise: 'Enterprise',

    // Right Panel
    relatedNotes: 'Related Notes',
    aiSummary: 'AI Summary',
    expandWithAi: 'Expand with AI',
    selectNoteBacklinks: 'Select a note to see backlinks',
    selectNoteSummary: 'Select a note to generate an AI summary of its content and connections.',

    // Graph
    groups: 'Groups',
    project: 'Project',
    meeting: 'Meeting',
    personal: 'Personal',

    // Template names
    tplMeetingNotes: 'Meeting Notes',
    tplProjectBrief: 'Project Brief',
    tplResearchNotes: 'Research Notes',
    tplWeeklyReview: 'Weekly Review',
    tplDecisionRecord: 'Decision Record',
    tplRetrospective: 'Retrospective',
    tplLegalCase: 'Legal Case File',
    tplMedicalRecord: 'Medical Record',
    tplLessonPlan: 'Lesson Plan',
    tplClientProposal: 'Client Proposal',
    tplThesisOutline: 'Thesis Outline',
    tplContentCalendar: 'Content Calendar',
    tplSOP: 'Standard Operating Procedure',
    tplCrmNotes: 'CRM Notes',

    tplDescMeeting: 'Structured meeting notes with agenda, discussion, and action items.',
    tplDescProject: 'Project planning with goals, timeline, resources, and risks.',
    tplDescResearch: 'Research documentation with hypothesis, methodology, findings.',
    tplDescWeekly: 'Weekly accomplishments, challenges, and next week planning.',
    tplDescDecision: 'Architecture Decision Record for technical choices.',
    tplDescRetro: 'Sprint retrospective: what went well, what to improve.',
    tplDescLegal: 'Case file management with facts, arguments, precedents.',
    tplDescMedical: 'Patient records with history, diagnosis, treatment plan.',
    tplDescLesson: 'Lesson planning with objectives, materials, assessment.',
    tplDescProposal: 'Client engagement proposal with scope, deliverables, pricing.',
    tplDescThesis: 'Academic thesis structure with chapters, bibliography.',
    tplDescContent: 'Content planning calendar for social media and blog.',
    tplDescSOP: 'Standard operating procedures for team processes.',
    tplDescCrm: 'Customer relationship notes with contact history.',
  },
  zh: {
    // TopBar
    searchPlaceholder: '搜索你的本地知识库...',
    newNote: '新建笔记',
    localAI: '本地 AI',
    settings: '设置',

    // Sidebar
    knowledgeVault: '知识库',
    dashboard: '仪表盘',
    allNotes: '全部笔记',
    graphView: '图谱视图',
    templates: '模板库',
    import: '导入',
    sidebarSettings: '设置',
    folders: '文件夹',
    notesCount: '篇笔记',
    tagsCount: '个标签',

    // Dashboard
    goodEvening: '晚上好',
    goodMorning: '早上好',
    goodAfternoon: '下午好',
    overviewDesc: '以下是你的知识库概览。',
    totalNotes: '全部笔记',
    backlinks: '反向链接',
    tags: '标签',
    storage: '存储空间',
    recentNotes: '最近编辑',
    viewAll: '查看全部',
    knowledgeGraph: '知识图谱',
    expand: '展开',
    quickActions: '快捷操作',
    localAiAssistant: '本地 AI 助手',
    aiReady: '就绪',
    aiDesc: '你的私有 AI 在本地运行。可以提问笔记内容、生成摘要、发现关联。',
    chat: '对话',
    summarize: '总结',
    connect: '关联',
    askAiPlaceholder: '向 AI 提问你的知识库...',

    // Editor
    bold: '加粗',
    italic: '斜体',
    h1: '标题1',
    h2: '标题2',
    list: '列表',
    code: '代码',
    quote: '引用',
    link: '链接',
    image: '图片',
    divider: '分割线',
    untitled: '未命名',
    lastEdited: '最后编辑',

    // Search
    searchNotesPlaceholder: '搜索笔记、标签、内容...',
    recentSearches: '最近搜索',
    resultsFound: '条结果',
    noResults: '未找到结果',

    // Templates
    templateStudio: '模板市场',
    templateDesc: '面向各行业的专业模板，快速搭建你的知识库。',
    useTemplate: '使用模板',
    createKnowledgeBase: '一键创建知识库',
    modules: '个模块',
    users: '人使用',
    industry: '行业',
    allTemplates: '全部',
    legal: '法律',
    medical: '医疗',
    education: '教育',
    consulting: '咨询',
    research: '科研',
    media: '自媒体',
    enterprise: '企业',

    // Right Panel
    relatedNotes: '相关笔记',
    aiSummary: 'AI 摘要',
    expandWithAi: 'AI 展开',
    selectNoteBacklinks: '选择一篇笔记查看反向链接',
    selectNoteSummary: '选择一篇笔记，AI 将为其生成内容摘要和关联分析。',

    // Graph
    groups: '分组',
    project: '项目',
    meeting: '会议',
    personal: '个人',

    // Template names
    tplMeetingNotes: '会议记录',
    tplProjectBrief: '项目简介',
    tplResearchNotes: '研究笔记',
    tplWeeklyReview: '周报模板',
    tplDecisionRecord: '决策记录',
    tplRetrospective: '复盘回顾',
    tplLegalCase: '案件档案',
    tplMedicalRecord: '病历记录',
    tplLessonPlan: '教案模板',
    tplClientProposal: '客户提案',
    tplThesisOutline: '论文大纲',
    tplContentCalendar: '内容日历',
    tplSOP: '标准作业流程',
    tplCrmNotes: '客户关系记录',

    tplDescMeeting: '结构化会议记录，包含议程、讨论要点、待办事项。',
    tplDescProject: '项目规划模板，涵盖目标、时间线、资源、风险。',
    tplDescResearch: '研究文档模板，含假设、方法论、发现、结论。',
    tplDescWeekly: '周报模板，记录本周完成、遇到的问题、下周计划。',
    tplDescDecision: '架构决策记录（ADR），记录技术选型和原因。',
    tplDescRetro: '迭代回顾：做得好的、需要改进的、行动项。',
    tplDescLegal: '案件档案管理，含事实、论点、判例、证据。',
    tplDescMedical: '病历记录模板，含病史、诊断、治疗方案。',
    tplDescLesson: '教案模板，含教学目标、材料、评估方式。',
    tplDescProposal: '客户提案模板，含范围、交付物、报价。',
    tplDescThesis: '学术论文结构模板，含各章节、参考文献。',
    tplDescContent: '社交媒体和博客的内容规划日历。',
    tplDescSOP: '团队流程的标准作业程序文档。',
    tplDescCrm: '客户关系管理笔记，含联系历史和跟进计划。',
  },
};

const I18nContext = createContext<{
  lang: Lang;
  t: (key: string) => string;
  toggleLang: () => void;
}>({ lang: 'en', t: (k) => k, toggleLang: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');

  const t = useCallback((key: string): string => {
    return (translations[lang] as Record<string, string>)[key] || key;
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => prev === 'en' ? 'zh' : 'en');
  }, []);

  return (
    <I18nContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
