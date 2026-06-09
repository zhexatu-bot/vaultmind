import { useState } from 'react';
import { Calendar, Briefcase, FlaskConical, CalendarDays, Scale, RotateCcw, ArrowRight, Sparkles, Users, Layers, Gavel, Stethoscope, GraduationCap, MessageSquare, Building2, PenTool } from 'lucide-react';
import { templates } from '../data/mock';
import { useI18n } from '../i18n';

interface ExtendedTpl {
  id: string; name: string; desc: string; icon: string; content: string;
  industry: string; modules: number; users: number; tags: string[];
}

export default function Templates() {
  const { t } = useI18n();
  const [filter, setFilter] = useState('all');

  const allTemplates: ExtendedTpl[] = [
    ...templates.map(tpl => ({
      ...tpl,
      industry: tpl.id === 'meeting' ? 'enterprise' : tpl.id === 'project' ? 'enterprise' : tpl.id === 'research' ? 'research' : 'enterprise',
      modules: Math.floor(Math.random() * 6) + 4,
      users: Math.floor(Math.random() * 8000) + 1000,
      tags: ['popular'],
    })),
    { id: 'legal', name: t('tplLegalCase'), desc: t('tplDescLegal'), icon: 'scale', content: '', industry: 'legal', modules: 8, users: 3200, tags: ['professional'] },
    { id: 'medical', name: t('tplMedicalRecord'), desc: t('tplDescMedical'), icon: 'stethoscope', content: '', industry: 'medical', modules: 10, users: 2100, tags: ['professional'] },
    { id: 'lesson', name: t('tplLessonPlan'), desc: t('tplDescLesson'), icon: 'graduation', content: '', industry: 'education', modules: 6, users: 5400, tags: ['popular'] },
    { id: 'proposal', name: t('tplClientProposal'), desc: t('tplDescProposal'), icon: 'briefcase', content: '', industry: 'consulting', modules: 7, users: 4100, tags: ['professional'] },
    { id: 'thesis', name: t('tplThesisOutline'), desc: t('tplDescThesis'), icon: 'flask-conical', content: '', industry: 'research', modules: 12, users: 8900, tags: ['trending'] },
    { id: 'content', name: t('tplContentCalendar'), desc: t('tplDescContent'), icon: 'pen', content: '', industry: 'media', modules: 5, users: 6700, tags: ['popular'] },
    { id: 'sop', name: t('tplSOP'), desc: t('tplDescSOP'), icon: 'building', content: '', industry: 'enterprise', modules: 9, users: 3800, tags: ['professional'] },
    { id: 'crm', name: t('tplCrmNotes'), desc: t('tplDescCrm'), icon: 'users', content: '', industry: 'enterprise', modules: 6, users: 4500, tags: ['popular'] },
  ];

  const industries = [
    { id: 'all', label: t('allTemplates'), icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'legal', label: t('legal'), icon: <Gavel className="w-3.5 h-3.5" /> },
    { id: 'medical', label: t('medical'), icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: 'education', label: t('education'), icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'consulting', label: t('consulting'), icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'research', label: t('research'), icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { id: 'media', label: t('media'), icon: <PenTool className="w-3.5 h-3.5" /> },
    { id: 'enterprise', label: t('enterprise'), icon: <Building2 className="w-3.5 h-3.5" /> },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    'calendar': <Calendar className="w-5 h-5" />,
    'briefcase': <Briefcase className="w-5 h-5" />,
    'flask-conical': <FlaskConical className="w-5 h-5" />,
    'calendar-days': <CalendarDays className="w-5 h-5" />,
    'scale': <Scale className="w-5 h-5" />,
    'rotate-ccw': <RotateCcw className="w-5 h-5" />,
    'stethoscope': <Stethoscope className="w-5 h-5" />,
    'graduation': <GraduationCap className="w-5 h-5" />,
    'pen': <PenTool className="w-5 h-5" />,
    'building': <Building2 className="w-5 h-5" />,
    'users': <Users className="w-5 h-5" />,
  };

  const colors = [
    'from-blue-500/15 to-cyan-500/15 text-blue-400',
    'from-purple-500/15 to-pink-500/15 text-purple-400',
    'from-emerald-500/15 to-teal-500/15 text-emerald-400',
    'from-amber-500/15 to-orange-500/15 text-amber-400',
    'from-rose-500/15 to-red-500/15 text-rose-400',
    'from-indigo-500/15 to-violet-500/15 text-indigo-400',
    'from-sky-500/15 to-blue-500/15 text-sky-400',
    'from-teal-500/15 to-emerald-500/15 text-teal-400',
  ];

  const filtered = filter === 'all' ? allTemplates : allTemplates.filter(tpl => tpl.industry === filter);

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-mesh">
      {/* Header */}
      <div className="mb-6 animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary mb-1">{t('templateStudio')}</h1>
        <p className="text-sm text-text-secondary">{t('templateDesc')}</p>
      </div>

      {/* Industry filter */}
      <div className="flex items-center gap-2 mb-6 animate-fade-up flex-wrap">
        {industries.map(ind => (
          <button
            key={ind.id}
            onClick={() => setFilter(ind.id)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
              filter === ind.id
                ? 'bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 text-accent-blue border border-accent-blue/30'
                : 'bg-white/[0.03] border border-border text-text-secondary hover:text-text-primary hover:border-border-hover'
            }`}
          >
            {ind.icon}
            {ind.label}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-3 gap-5 stagger">
        {filtered.map((tpl, i) => (
          <div key={tpl.id} className="template-card p-5 group cursor-pointer animate-fade-up">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                {iconMap[tpl.icon] || <Calendar className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-text-primary truncate">{tpl.name}</h3>
                  {tpl.tags.includes('trending') && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex-shrink-0">HOT</span>
                  )}
                </div>
                <p className="text-xs text-text-muted leading-relaxed line-clamp-2">{tpl.desc}</p>
              </div>
            </div>

            {/* Meta info */}
            <div className="flex items-center gap-3 mb-4 text-[11px] text-text-muted">
              <span className="flex items-center gap-1"><Layers className="w-3 h-3" />{tpl.modules} {t('modules')}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" />{tpl.users.toLocaleString()} {t('users')}</span>
            </div>

            {/* Preview */}
            <div className="bg-black/20 rounded-lg p-3 mb-4 max-h-20 overflow-hidden relative">
              <pre className="text-[10px] text-text-muted/60 font-mono leading-relaxed whitespace-pre-wrap">{tpl.content.substring(0, 150) || `# ${tpl.name}\n\n## Section 1\n\n- Item\n- Item\n\n## Section 2\n\n| Col | Col |\n|-----|-----|\n| ... | ... |`}</pre>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#111827] to-transparent"></div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 border border-accent-blue/20 text-xs text-accent-blue hover:from-accent-blue/20 hover:to-accent-purple/20 transition-all">
                {t('useTemplate')}
                <ArrowRight className="w-3 h-3" />
              </button>
              <button className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-border text-xs text-text-secondary hover:text-accent-purple hover:border-accent-purple/30 transition-all">
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 mb-4 text-center animate-fade-up">
        <div className="glass-card p-6 inline-block max-w-lg">
          <Sparkles className="w-8 h-8 text-accent-purple mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-text-primary mb-2">{t('createKnowledgeBase')}</h3>
          <p className="text-xs text-text-muted mb-4">Choose a template above, or let AI generate a custom structure for your needs.</p>
          <button className="px-6 py-2.5 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-accent-blue/20 transition-all">
            {t('createKnowledgeBase')}
          </button>
        </div>
      </div>
    </div>
  );
}
