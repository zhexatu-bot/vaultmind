import { Plus, Upload, FileStack, Network, Search } from 'lucide-react';
import { useI18n } from '../../i18n';

interface Props {
  onNavigate: (page: string) => void;
}

export default function QuickActions({ onNavigate }: Props) {
  const { t } = useI18n();
  const actions = [
    { id: 'new', label: t('newNote'), icon: <Plus className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'import', label: t('import'), icon: <Upload className="w-5 h-5" />, gradient: 'from-purple-500 to-pink-500' },
    { id: 'templates', label: t('templates'), icon: <FileStack className="w-5 h-5" />, gradient: 'from-emerald-500 to-teal-500' },
    { id: 'graph', label: t('graphView'), icon: <Network className="w-5 h-5" />, gradient: 'from-amber-500 to-orange-500' },
    { id: 'search', label: 'Search', icon: <Search className="w-5 h-5" />, gradient: 'from-rose-500 to-red-500' },
  ];

  return (
    <div className="glass-card p-5">
      <h3 className="text-sm font-semibold text-text-primary mb-4">{t('quickActions')}</h3>
      <div className="grid grid-cols-5 gap-3">
        {actions.map(a => (
          <button
            key={a.id}
            onClick={() => onNavigate(a.id === 'new' ? 'notes' : a.id)}
            className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-white/[0.04] transition-all group"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all`}>
              {a.icon}
            </div>
            <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
