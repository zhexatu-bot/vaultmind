import { Search, Plus, Bot, Settings } from 'lucide-react';
import { useState } from 'react';

interface Props {
  onSearch: (q: string) => void;
  onNewNote: () => void;
  currentPage: string;
}

export default function TopBar({ onSearch, onNewNote }: Props) {
  const [query, setQuery] = useState('');

  return (
    <header className="h-16 flex items-center justify-between px-6 glass" style={{ zIndex: 50 }}>
      {/* Logo */}
      <div className="flex items-center gap-3 w-64">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
          <span className="text-white font-bold text-sm">V</span>
        </div>
        <span className="text-lg font-semibold tracking-tight text-text-primary">VaultMind</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); onSearch(e.target.value); }}
            placeholder="Search your local knowledge..."
            className="w-full bg-white/5 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue/50 focus:bg-white/[0.07] transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted bg-white/5 px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-64 justify-end">
        <button
          onClick={onNewNote}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" />
          New Note
        </button>
        <button className="p-2.5 rounded-xl border border-border text-text-secondary hover:text-accent-purple hover:border-accent-purple/30 transition-all" title="Local AI">
          <Bot className="w-4 h-4" />
        </button>
        <button className="p-2.5 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all" title="Settings">
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
