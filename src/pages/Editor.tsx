import { useState, useEffect, useRef } from 'react';
import { Bold, Italic, Heading1, Heading2, List, Code, Quote, Link2, Image, Minus, Clock, Folder, Tag, Save, Trash2 } from 'lucide-react';
import { useStore } from '../store/store';
import { useI18n } from '../i18n';

export default function Editor() {
  const { t } = useI18n();
  const { selectedId, getDoc, updateDoc, deleteDoc } = useStore();
  const doc = selectedId ? getDoc(selectedId) : undefined;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (doc) {
      setTitle(doc.title);
      setContent(doc.content);
      setSaved(true);
    }
  }, [doc?.id]);

  // Auto-save on change
  const handleChange = (newTitle?: string, newContent?: string) => {
    const t2 = newTitle ?? title;
    const c2 = newContent ?? content;
    if (newTitle !== undefined) setTitle(newTitle);
    if (newContent !== undefined) setContent(newContent);
    setSaved(false);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (doc) {
        updateDoc(doc.id, { title: t2, content: c2 });
        setSaved(true);
      }
    }, 800);
  };

  const handleDelete = () => {
    if (doc && confirm('Delete this document?')) {
      deleteDoc(doc.id);
    }
  };

  const renderMarkdown = (md: string) => {
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
      .replace(/\[\[(.+?)\]\]/g, '<a href="#" class="wikilink">[[$1]]</a>')
      .replace(/#(\w+)/g, '<span class="tag-badge">#$1</span>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    html = html.replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => /^[\s-]+$/.test(c))) return '';
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
    });
    return `<p>${html}</p>`;
  };

  if (!doc) {
    return (
      <div className="flex-1 flex items-center justify-center bg-mesh">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center mx-auto mb-4">
            <Save className="w-8 h-8 text-accent-blue/30" />
          </div>
          <p className="text-sm text-text-muted">Select or create a note to start editing</p>
        </div>
      </div>
    );
  }

  const toolbarBtns = [
    { icon: <Bold className="w-3.5 h-3.5" />, title: t('bold'), insert: ['**', '**'] },
    { icon: <Italic className="w-3.5 h-3.5" />, title: t('italic'), insert: ['*', '*'] },
    { icon: <Heading1 className="w-3.5 h-3.5" />, title: t('h1'), insert: ['# ', ''] },
    { icon: <Heading2 className="w-3.5 h-3.5" />, title: t('h2'), insert: ['## ', ''] },
    { icon: <List className="w-3.5 h-3.5" />, title: t('list'), insert: ['- ', ''] },
    { icon: <Code className="w-3.5 h-3.5" />, title: t('code'), insert: ['```\n', '\n```'] },
    { icon: <Quote className="w-3.5 h-3.5" />, title: t('quote'), insert: ['> ', ''] },
    { icon: <Link2 className="w-3.5 h-3.5" />, title: t('link'), insert: ['[[', ']]'] },
    { icon: <Image className="w-3.5 h-3.5" />, title: t('image'), insert: ['![', '](url)'] },
    { icon: <Minus className="w-3.5 h-3.5" />, title: t('divider'), insert: ['\n---\n', ''] },
  ];

  return (
    <div className="flex-1 flex overflow-hidden">
      <div className="flex-1 flex flex-col border-r border-border">
        {/* Doc info */}
        <div className="doc-info-bar px-5 py-3 flex items-center gap-4">
          <input
            value={title}
            onChange={e => handleChange(e.target.value)}
            className="text-sm font-semibold text-text-primary bg-transparent outline-none border-b border-transparent focus:border-accent-blue/40 transition-colors flex-1 min-w-0"
            placeholder={t('untitled')}
          />
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Folder className="w-3 h-3" />{doc.folder}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-text-muted">
            <Clock className="w-3 h-3" />{new Date(doc.updatedAt).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-text-muted" />
            {doc.tags.map(tag => <span key={tag} className="tag-badge">#{tag}</span>)}
          </div>
          <span className={`text-[10px] ${saved ? 'text-emerald-400' : 'text-amber-400'}`}>
            {saved ? 'Saved' : 'Editing...'}
          </span>
          <button onClick={handleDelete} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-all" title="Delete">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-0.5 px-4 py-1.5 border-b border-border bg-white/[0.01]">
          {toolbarBtns.map((btn, i) => (
            <button
              key={i}
              className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/[0.05] transition-all"
              title={btn.title}
              onClick={() => {
                const ta = document.querySelector('.editor-textarea') as HTMLTextAreaElement;
                if (!ta) return;
                const start = ta.selectionStart;
                const end = ta.selectionEnd;
                const selected = content.substring(start, end);
                const replacement = btn.insert[0] + (selected || 'text') + btn.insert[1];
                const newContent = content.substring(0, start) + replacement + content.substring(end);
                handleChange(undefined, newContent);
              }}
            >
              {btn.icon}
            </button>
          ))}
          <div className="flex-1"></div>
          <span className="text-[11px] text-text-muted">{content.split('\n').length} lines</span>
        </div>

        <textarea
          value={content}
          onChange={e => handleChange(undefined, e.target.value)}
          className="editor-textarea flex-1 p-6 resize-none"
          spellCheck={false}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[700px]">
          <div className="markdown-preview text-sm text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
        </div>
      </div>
    </div>
  );
}
