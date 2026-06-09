import { Link2, Tag, FileText, Sparkles, ArrowRight } from 'lucide-react';
import { notes } from '../../data/mock';

interface Props {
  selectedNoteId?: string;
}

export default function RightPanel({ selectedNoteId }: Props) {
  const note = notes.find(n => n.id === selectedNoteId);

  const backlinks = note
    ? notes.filter(n => n.links.includes(note.title)).map(n => ({ id: n.id, title: n.title, excerpt: n.content.substring(0, 80) + '...' }))
    : [];

  const relatedNotes = note
    ? notes.filter(n => n.id !== note.id && n.tags.some(t => note.tags.includes(t))).slice(0, 3)
    : notes.slice(0, 3);

  return (
    <aside className="w-[320px] h-full border-l border-border bg-bg-sidebar overflow-y-auto">
      <div className="p-5">
        {/* Backlinks */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-4 h-4 text-accent-blue" />
            <h3 className="text-sm font-semibold text-text-primary">Backlinks</h3>
            <span className="text-xs text-text-muted ml-auto">{backlinks.length}</span>
          </div>
          {backlinks.length > 0 ? (
            <div className="flex flex-col gap-2">
              {backlinks.map(b => (
                <div key={b.id} className="glass-card p-3 cursor-pointer hover:border-accent-blue/30">
                  <div className="text-sm font-medium text-text-primary mb-1">{b.title}</div>
                  <div className="text-xs text-text-muted line-clamp-2">{b.excerpt}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted">Select a note to see backlinks</p>
          )}
        </section>

        {/* Tags */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Tag className="w-4 h-4 text-accent-purple" />
            <h3 className="text-sm font-semibold text-text-primary">Tags</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(note?.tags || ['product', 'ai', 'research']).map(tag => (
              <span key={tag} className="px-2.5 py-1 text-xs rounded-lg bg-accent-purple/10 text-accent-purple border border-accent-purple/20">
                #{tag}
              </span>
            ))}
          </div>
        </section>

        {/* Related Notes */}
        <section className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-text-primary">Related Notes</h3>
          </div>
          <div className="flex flex-col gap-2">
            {relatedNotes.map(n => (
              <div key={n.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-all group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-3.5 h-3.5 text-accent-blue" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-text-primary truncate">{n.title}</div>
                  <div className="text-xs text-text-muted">{n.updated}</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </section>

        {/* AI Summary */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-semibold text-text-primary">AI Summary</h3>
          </div>
          <div className="glass-card p-4">
            <p className="text-xs text-text-secondary leading-relaxed">
              {note
                ? `This note covers "${note.title}" and is connected to ${note.links.length} other documents. Key themes include ${note.tags.join(', ')}. Last updated ${note.updated}.`
                : 'Select a note to generate an AI summary of its content and connections.'}
            </p>
            <button className="mt-3 flex items-center gap-1.5 text-xs text-accent-blue hover:text-accent-blue/80 transition-colors">
              <Sparkles className="w-3 h-3" />
              Expand with AI
            </button>
          </div>
        </section>
      </div>
    </aside>
  );
}
