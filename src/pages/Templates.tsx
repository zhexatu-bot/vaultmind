import { Calendar, Briefcase, FlaskConical, CalendarDays, Scale, RotateCcw, ArrowRight } from 'lucide-react';
import { templates } from '../data/mock';

const iconMap: Record<string, React.ReactNode> = {
  'calendar': <Calendar className="w-6 h-6" />,
  'briefcase': <Briefcase className="w-6 h-6" />,
  'flask-conical': <FlaskConical className="w-6 h-6" />,
  'calendar-days': <CalendarDays className="w-6 h-6" />,
  'scale': <Scale className="w-6 h-6" />,
  'rotate-ccw': <RotateCcw className="w-6 h-6" />,
};

const colors = [
  'from-blue-500/20 to-cyan-500/20 text-blue-400',
  'from-purple-500/20 to-pink-500/20 text-purple-400',
  'from-emerald-500/20 to-teal-500/20 text-emerald-400',
  'from-amber-500/20 to-orange-500/20 text-amber-400',
  'from-rose-500/20 to-red-500/20 text-rose-400',
  'from-indigo-500/20 to-violet-500/20 text-indigo-400',
];

export default function Templates() {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Template Studio</h1>
        <p className="text-sm text-text-secondary">Pre-built templates to jumpstart your notes.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {templates.map((tpl, i) => (
          <div key={tpl.id} className="glass-card p-5 group cursor-pointer hover:border-accent-blue/30">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[i % colors.length]} flex items-center justify-center flex-shrink-0`}>
                {iconMap[tpl.icon] || <Calendar className="w-6 h-6" />}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-text-primary mb-1">{tpl.name}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{tpl.desc}</p>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-black/20 rounded-lg p-3 mb-4 max-h-24 overflow-hidden">
              <pre className="text-[10px] text-text-muted font-mono leading-relaxed whitespace-pre-wrap">{tpl.content.substring(0, 200)}...</pre>
            </div>

            <button className="flex items-center gap-1.5 text-xs text-accent-blue group-hover:gap-2.5 transition-all">
              Use template
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
