import { useState, useEffect } from 'react';
import { Bold, Italic, Heading1, Heading2, List, Code, Quote, Link2, Image, Minus } from 'lucide-react';
import { notes } from '../data/mock';

interface Props {
  noteId?: string;
}

export default function Editor({ noteId }: Props) {
  const note = notes.find(n => n.id === noteId) || notes[0];
  const [content, setContent] = useState(note.content);

  useEffect(() => {
    setContent(note.content);
  }, [noteId]);

  const renderMarkdown = (md: string) => {
    let html = md
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      .replace(/^- \[x\] (.+)$/gm, '<li>☑ $1</li>')
      .replace(/^- \[ \] (.+)$/gm, '<li>☐ $1</li>')
      .replace(/^---$/gm, '<hr>')
      .replace(/\[\[(.+?)\]\]/g, '<a href="#" class="text-accent-blue hover:underline">[[$1]]</a>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');

    // Handle code blocks
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>');

    // Handle tables
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => /^[\s-]+$/.test(c))) return '';
      const tag = match.includes('---') ? 'td' : 'td';
      return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    });

    return `<p>${html}</p>`;
  };

  const toolbarBtns = [
    { icon: <Bold className="w-3.5 h-3.5" />, title: 'Bold' },
    { icon: <Italic className="w-3.5 h-3.5" />, title: 'Italic' },
    { icon: <Heading1 className="w-3.5 h-3.5" />, title: 'H1' },
    { icon: <Heading2 className="w-3.5 h-3.5" />, title: 'H2' },
    { icon: <List className="w-3.5 h-3.5" />, title: 'List' },
    { icon: <Code className="w-3.5 h-3.5" />, title: 'Code' },
    { icon: <Quote className="w-3.5 h-3.5" />, title: 'Quote' },
    { icon: <Link2 className="w-3.5 h-3.5" />, title: 'Link' },
    { icon: <Image className="w-3.5 h-3.5" />, title: 'Image' },
    { icon: <Minus className="w-3.5 h-3.5" />, title: 'Divider' },
  ];

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Editor */}
      <div className="flex-1 flex flex-col border-r border-border">
        {/* Toolbar */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-white/[0.02]">
          {toolbarBtns.map((btn, i) => (
            <button key={i} className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/[0.05] transition-all" title={btn.title}>
              {btn.icon}
            </button>
          ))}
          <div className="flex-1"></div>
          <span className="text-xs text-text-muted">{note.title}</span>
        </div>

        {/* Editor textarea */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          className="flex-1 bg-transparent p-6 text-sm text-text-primary outline-none resize-none font-mono leading-relaxed"
          spellCheck={false}
        />
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="markdown-preview text-sm text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
      </div>
    </div>
  );
}
