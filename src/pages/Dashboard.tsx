import StatCards from '../components/dashboard/StatCards';
import RecentNotes from '../components/dashboard/RecentNotes';
import GraphPreview from '../components/dashboard/GraphPreview';
import QuickActions from '../components/dashboard/QuickActions';
import AiCard from '../components/dashboard/AiCard';
import { useI18n } from '../i18n';

interface Props {
  onNavigate: (page: string) => void;
  onSelectNote: (id: string) => void;
}

export default function Dashboard({ onNavigate, onSelectNote }: Props) {
  const { t } = useI18n();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('goodMorning') : hour < 18 ? t('goodAfternoon') : t('goodEvening');

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-mesh">
      <div className="mb-6 animate-fade-up">
        <h1 className="text-2xl font-bold text-text-primary mb-1">{greeting}</h1>
        <p className="text-sm text-text-secondary">{t('overviewDesc')}</p>
      </div>

      <div className="stagger">
        <div className="animate-fade-up"><StatCards /></div>

        <div className="grid grid-cols-2 gap-4 mt-4 animate-fade-up">
          <RecentNotes onSelect={onSelectNote} />
          <GraphPreview onNavigate={onNavigate} />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 animate-fade-up">
          <QuickActions onNavigate={onNavigate} />
          <AiCard />
        </div>
      </div>
    </div>
  );
}
