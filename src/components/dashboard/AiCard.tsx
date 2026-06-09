import { Sparkles, MessageSquare, Zap, Brain } from 'lucide-react';
import { useI18n } from '../../i18n';

export default function AiCard() {
  const { t } = useI18n();
  return (
    <div className="glass-card p-5 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-purple/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-accent-blue/10 rounded-full blur-3xl"></div>

      <div className="relative">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-lg shadow-accent-purple/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-sm font-semibold text-text-primary">{t('localAiAssistant')}</h3>
          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">{t('aiReady')}</span>
        </div>

        <p className="text-xs text-text-secondary mb-4 leading-relaxed">{t('aiDesc')}</p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: <MessageSquare className="w-3.5 h-3.5" />, label: t('chat') },
            { icon: <Zap className="w-3.5 h-3.5" />, label: t('summarize') },
            { icon: <Brain className="w-3.5 h-3.5" />, label: t('connect') },
          ].map(a => (
            <button key={a.label} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-border text-xs text-text-secondary hover:text-accent-purple hover:border-accent-purple/30 hover:shadow-[0_0_12px_rgba(139,92,246,0.1)] transition-all">
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.03] border border-border">
          <Sparkles className="w-4 h-4 text-text-muted flex-shrink-0" />
          <span className="text-xs text-text-muted">{t('askAiPlaceholder')}</span>
        </div>
      </div>
    </div>
  );
}
