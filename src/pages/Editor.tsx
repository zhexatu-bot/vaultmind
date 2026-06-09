import { useState, useEffect } from 'react';
import { Bold, Italic, Heading1, Heading2, List, Code, Quote, Link2, Image, Minus, Clock, Folder, Tag } from 'lucide-react';
import { notes } from '../data/mock';
import { useI18n } from '../i18n';

interface Props {
  noteId?: string;
}

export default function Editor({ noteId }: Props) {
  const { t } = useI18n();
  const note = notes.find(n => n.id === noteId) || notes[0];
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setContent(note.content);
  }, [noteId]);

  const renderMarkdown = (md: string) => {
    // Code blocks first
    let html = md.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

    html = html
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- \[x\] (.+)$/gm, '<li style="list-style:none">☑ $1</li>')
      .replace(/^- \[ \] (.+)$/gm, '<li style="list-style:none">☐ $1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      .replace(/^---$/gm, '<hr>')
      // Wikilinks
      .replace(/\[\[(.+?)\]\]/g, '<a href="#" class="wikilink">[[$1]]</a>')
      // Tag badges
      .replace(/#(\w+)/g, '<span class="tag-badge">#$1</span>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Tables
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => /^[\s-]+$/.test(c))) return '';
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
    });

    return `<p>${html}</p>`;
  };

  const toolbarBtns = [
    { icon: <Bold className="w-3.5 h-3.5" />, title: t('bold') },
    { icon: <Italic className="w-3.5 h-3.5" />, title: t('italic') },
    { icon: <Heading1 className="w-3.5 h-3.5" />, title: t('h1') },
    { icon: <Heading2 className="w-3.5 h-3.5" />, title: t('h2') },
    { icon: <List className="w-3.5 h-3.5" />, title: t('list') },
    { icon: <Code className="w-3.5 h-3.5" />, title: t('code') },
    { icon: <Quote className="w-3.5 h-3.5" />, title: t('quote') },
    { icon: <Link2 className="w-3.5 h-3.5" />, title: t('link') },
    { icon: <Image className="w-3.5 h-3.5" />, title: t('image') },
    { icon: <Minus className="w-3.5 h-3.5" />, title: t('divider') },
  ];

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Editor side */}
      <div className="flex-1 flex flex-col border-r border-border">
        {/* Document info bar */}
        <div className="doc-info-bar px-5 py-3 flex items-center gap-4">
          <h2 className="text-sm font-semibold text-text-primary">{note.title}</h2>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Folder className="w-3 h-3" />
            {note.folder}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock className="w-3 h-3" />
            {t('lastEdited')}: {note.updated}
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-text-muted" />
            {note.tags.map(tag => (
              <span key={tag} className="tag-badge">#{tag}</span>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-0.5 px-4 py-1.5 border-b border-border bg-white/[0.01]">
          {toolbarBtns.map((btn, i) => (
            <button key={i} className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/[0.05] transition-all" title={btn.title}>
              {btn.icon}
            </button>
          ))}
          <div className="flex-1"></div>
          <span className="text-[11px] text-text-muted">{content.split('\n').length} lines</span>
        </div>

        {/* Editor textarea */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="editor-textarea flex-1 p-6 resize-none"
          spellCheck={false}
        />
      </div>

      {/* Preview side */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[700px]">
          <div className="markdown-preview text-sm text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
        </div>
      </div>
    </div>
  );
}
