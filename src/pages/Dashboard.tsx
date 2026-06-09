import StatCards from '../components/dashboard/StatCards';
import RecentNotes from '../components/dashboard/RecentNotes';
import GraphPreview from '../components/dashboard/GraphPreview';
import QuickActions from '../components/dashboard/QuickActions';
import AiCard from '../components/dashboard/AiCard';

interface Props {
  onNavigate: (page: string) => void;
  onSelectNote: (id: string) => void;
}

export default function Dashboard({ onNavigate, onSelectNote }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary mb-1">Good evening</h1>
        <p className="text-sm text-text-secondary">Here's an overview of your knowledge vault.</p>
      </div>

      <StatCards />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <RecentNotes onSelect={onSelectNote} />
        <GraphPreview onNavigate={onNavigate} />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <QuickActions onNavigate={onNavigate} />
        <AiCard />
      </div>
    </div>
  );
}
