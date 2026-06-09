import { Link2, Tag, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/store';
import { findBacklinks, extractWikiLinks } from '../../store/types';
import { useI18n } from '../../i18n';

export default function RightPanel() {
  const { t } = useI18n();
  const { selectedId, getDoc, docs, setSelectedId } = useStore();
  const doc = selectedId ? getDoc(selectedId) : undefined;

  const backlinks = doc ? findBacklinks(docs, doc.title) : [];
  const outgoingLinks = doc
    ? extractWikiLinks(doc.content)
        .map(link => docs.find(d => d.title.toLowerCase() === link.toLowerCase()))
        .filter((d): d is NonNullable<typeof d> => d !== undefined)
    : [];
  const relatedByTag = doc
    ? docs.filter(d => d.id !== doc.id && d.tags.some(tag => doc.tags.includes(tag))).slice(0, 5)
    : [];

  return (
    <aside className="w-[320px] h-full border-l border-border bg-bg-sidebar overflow-y-auto">
      <div className="p-5">
        {/* Backlinks */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-4 h-4 text-accent-blue" />
            <h3 className="text-sm font-semibold text-text-primary">{t('backlinks')}</h3>
            <span className="text-xs text-text-muted ml-auto">{backlinks.length}</span>
          </div>
          {backlinks.length > 0 ? (
            <div className="flex flex-col gap-2">
              {backlinks.map(b => (
                <div key={b.id} onClick={() => setSelectedId(b.id)} className="glass-card p-3 cursor-pointer hover:border-accent-blue/30 transition-all">
                  <div className="text-sm font-medium text-text-primary mb-1">{b.title}</div>
                  <div className="text-xs text-text-muted line-clamp-2">{b.content.substring(0, 80)}...</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted">{doc ? 'No backlinks yet' : t('selectNoteBacklinks')}</p>
          )}
        </section>

        {/* Tags */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-accent-purple" />
            <h3 className="text-sm font-semibold text-text-primary">{t('tags')}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(doc?.tags || []).map(tag => (
              <span key={tag} className="tag-badge">#{tag}</span>
            ))}
            {!doc && <span className="text-xs text-text-muted">—</span>}
          </div>
        </section>

        {/* Related Notes (outgoing links + tag matches) */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-text-primary">{t('relatedNotes')}</h3>
          </div>
          <div className="flex flex-col gap-2">
            {[...outgoingLinks, ...relatedByTag.filter(r => !outgoingLinks.some(o => o.id === r.id))].slice(0, 5).map(n => (
              <div key={n.id} onClick={() => setSelectedId(n.id)} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-all group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-3.5 h-3.5 text-accent-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-primary truncate">{n.title}</div>
                  <div className="text-xs text-text-muted">{new Date(n.updatedAt).toLocaleDateString()}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
            {outgoingLinks.length === 0 && relatedByTag.length === 0 && (
              <p className="text-xs text-text-muted">—</p>
            )}
          </div>
        </section>

        {/* AI Summary */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-text-primary">{t('aiSummary')}</h3>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-text-secondary leading-relaxed">
              {doc
                ? `"${doc.title}" references ${outgoingLinks.length} documents and has ${backlinks.length} backlinks. Topics: ${doc.tags.join(', ')}. Last updated ${new Date(doc.updatedAt).toLocaleDateString()}.`
                : t('selectNoteSummary')}
            </p>
            <button className="mt-3 flex items-center gap-1.5 text-xs text-accent-blue hover:text-accent-blue/80 transition-colors">
              <Sparkles className="w-3 h-3" />
              {t('expandWithAi')}
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
}
