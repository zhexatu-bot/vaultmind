import { Search, Plus, Bot, Settings, Languages } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../../i18n';

interface Props {
  onSearch: (q: string) => void;
  onNewNote: () => void;
  currentPage: string;
}

export default function TopBar({ onSearch, onNewNote }: Props) {
  const [query, setQuery] = useState('');
  const { t, lang, toggleLang } = useI18n();

  return (
    <header className="h-16 flex items-center justify-between px-6 glass" style={{ zIndex: 50 }}>
      {/* Logo */}
      <div className="flex items-center gap-3 w-64">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/20">
          <span className="text-white font-bold text-sm">V</span>
        </div>
        <span className="text-lg font-semibold tracking-tight text-text-primary">VaultMind</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-accent-blue transition-colors" />
          <input
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); onSearch(e.target.value); }}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-white/[0.04] border border-border rounded-xl pl-11 pr-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue/40 focus:bg-white/[0.06] focus:shadow-[0_0_20px_rgba(56,189,248,0.08)] transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted bg-white/5 px-1.5 py-0.5 rounded border border-border">⌘K</kbd>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-64 justify-end">
        <button
          onClick={onNewNote}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-blue to-accent-purple text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-accent-blue/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          {t('newNote')}
        </button>
        <button className="p-2.5 rounded-xl border border-border text-text-secondary hover:text-accent-purple hover:border-accent-purple/30 hover:shadow-[0_0_12px_rgba(139,92,246,0.1)] transition-all" title={t('localAI')}>
          <Bot className="w-4 h-4" />
        </button>
        <button
          onClick={toggleLang}
          className="p-2.5 rounded-xl border border-border text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all"
          title={lang === 'zh' ? 'Switch to English' : '切换到中文'}
        >
          <Languages className="w-4 h-4" />
          <span className="absolute -bottom-1 -right-1 text-[8px] font-bold bg-accent-blue text-white rounded px-0.5">{lang.toUpperCase()}</span>
        </button>
        <button className="p-2.5 rounded-xl border border-border text-text-secondary hover:text-text-primary hover:border-border-hover transition-all" title={t('settings')}>
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
