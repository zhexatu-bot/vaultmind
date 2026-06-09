import { FileText, Clock, ArrowRight } from 'lucide-react';
import { notes } from '../../data/mock';
import { useI18n } from '../../i18n';

interface Props {
  onSelect: (id: string) => void;
}

export default function RecentNotes({ onSelect }: Props) {
  const { t } = useI18n();
  const recent = [...notes].sort((a, b) => b.updated.localeCompare(a.updated)).slice(0, 5);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-accent-blue" />
          <h3 className="text-sm font-semibold text-text-primary">{t('recentNotes')}</h3>
        </div>
        <button className="text-xs text-accent-blue hover:underline">{t('viewAll')}</button>
      </div>
      <div className="flex flex-col gap-1">
        {recent.map(note => (
          <button
            key={note.id}
            onClick={() => onSelect(note.id)}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.03] transition-all group text-left"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-blue/15 to-accent-purple/15 flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.15)] transition-shadow">
              <FileText className="w-4 h-4 text-accent-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary truncate group-hover:text-accent-blue transition-colors">{note.title}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-text-muted">{note.folder}</span>
                <span className="text-text-muted">&middot;</span>
                <span className="text-xs text-text-muted">{note.updated}</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
}
