import {
  LayoutDashboard, FileText, Network, FileStack, Upload, Settings,
  Folder, Calendar, FileTextIcon, FlaskConical, User, ChevronRight, ChevronDown,
} from 'lucide-react';
import { useState } from 'react';
import { folders } from '../../data/mock';

const iconMap: Record<string, React.ReactNode> = {
  'folder': <Folder className="w-4 h-4" />,
  'calendar': <Calendar className="w-4 h-4" />,
  'file-text': <FileTextIcon className="w-4 h-4" />,
  'flask-conical': <FlaskConical className="w-4 h-4" />,
  'user': <User className="w-4 h-4" />,
};

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'notes', label: 'All Notes', icon: <FileText className="w-4 h-4" /> },
  { id: 'graph', label: 'Graph View', icon: <Network className="w-4 h-4" /> },
  { id: 'templates', label: 'Templates', icon: <FileStack className="w-4 h-4" /> },
  { id: 'import', label: 'Import', icon: <Upload className="w-4 h-4" /> },
  { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
];

interface Props {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Sidebar({ currentPage, onNavigate }: Props) {
  const [expandedFolders, setExpandedFolders] = useState(true);

  return (
    <aside className="w-[260px] h-full bg-bg-sidebar border-r border-border flex flex-col overflow-hidden">
      {/* Vault Header */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-text-muted uppercase tracking-wider">
          <div className="w-2 h-2 rounded-full bg-accent-blue"></div>
          Knowledge Vault
        </div>
      </div>

      {/* Nav */}
      <nav className="px-3 flex flex-col gap-0.5">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
              currentPage === item.id
                ? 'bg-accent-blue/10 text-accent-blue'
                : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Divider */}
      <div className="mx-5 my-4 border-t border-border"></div>

      {/* Folders */}
      <div className="px-5 flex-1 overflow-y-auto">
        <button
          onClick={() => setExpandedFolders(!expandedFolders)}
          className="flex items-center gap-1 text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 hover:text-text-secondary transition-colors"
        >
          {expandedFolders ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
          Folders
        </button>
        {expandedFolders && (
          <div className="flex flex-col gap-0.5">
            {folders.map(f => (
              <button
                key={f.name}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/[0.03] transition-all group"
              >
                <span className="text-text-muted group-hover:text-accent-blue transition-colors">
                  {iconMap[f.icon] || <Folder className="w-4 h-4" />}
                </span>
                <span className="flex-1 text-left">{f.name}</span>
                <span className="text-xs text-text-muted">{f.count}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border">
        <div className="text-[11px] text-text-muted">
          46 notes &middot; 12 tags
        </div>
      </div>
    </aside>
  );
}
