import { useState } from 'react';
import { Search as SearchIcon, FileText, Clock, ArrowRight } from 'lucide-react';
import { useStore } from '../store/store';
import { useI18n } from '../i18n';

interface Props {
  query: string;
  onSelectNote: (id: string) => void;
}

export default function Search({ query: initialQuery, onSelectNote }: Props) {
  const { t } = useI18n();
  const { searchDocs } = useStore();
  const [query, setQuery] = useState(initialQuery);
  const results = searchDocs(query);

  const highlightMatch = (text: string, q: string) => {
    if (!q.trim()) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-accent-blue/30 text-accent-blue rounded px-0.5">$1</mark>');
  };

  const recentSearches = ['AI integration', 'roadmap', 'privacy', 'architecture'];

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-mesh">
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-accent-blue transition-colors" />
          <input
            type="text" value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('searchNotesPlaceholder')}
            autoFocus
            className="w-full bg-white/[0.04] border border-border rounded-2xl pl-12 pr-6 py-4 text-lg text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue/40 focus:shadow-[0_0_24px_rgba(56,189,248,0.08)] transition-all"
          />
        </div>
        {!query && (
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-xs text-text-muted">{t('recentSearches')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map(s => (
                <button key={s} onClick={() => setQuery(s)} className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-border text-xs text-text-secondary hover:text-accent-blue hover:border-accent-blue/30 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {query && (
        <div className="max-w-2xl mx-auto">
          <div className="text-xs text-text-muted mb-4">{results.length} {t('resultsFound')}</div>
          <div className="flex flex-col gap-3 stagger">
            {results.map(note => (
              <button key={note.id} onClick={() => onSelectNote(note.id)} className="glass-card p-4 text-left group hover:border-accent-blue/30 animate-fade-up">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-accent-blue/15 to-accent-purple/15 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.15)] transition-shadow">
                    <FileText className="w-4 h-4 text-accent-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-text-primary mb-1 group-hover:text-accent-blue transition-colors" dangerouslySetInnerHTML={{ __html: highlightMatch(note.title, query) }} />
                    <div className="text-xs text-text-muted mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: highlightMatch(note.content.substring(0, 150), query) }} />
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-text-muted px-2 py-0.5 rounded bg-white/[0.04]">{note.folder}</span>
                      {note.tags.slice(0, 3).map(t2 => (
                        <span key={t2} className="tag-badge">#{t2}</span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>
              </button>
            ))}
            {results.length === 0 && (
              <div className="text-center py-12">
                <SearchIcon className="w-12 h-12 text-text-muted/30 mx-auto mb-3" />
                <p className="text-sm text-text-muted">{t('noResults')} "{query}"</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
