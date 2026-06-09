import { useState, useCallback } from 'react';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import RightPanel from './components/layout/RightPanel';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import GraphView from './pages/GraphView';
import Search from './pages/Search';
import Templates from './pages/Templates';
import { I18nProvider } from './i18n';
import { StoreProvider, useStore } from './store/store';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedId, setSelectedId, createDoc } = useStore();

  const handleNavigate = useCallback((page: string) => setCurrentPage(page), []);

  const handleSelectNote = useCallback((id: string) => {
    setSelectedId(id);
    setCurrentPage('editor');
  }, [setSelectedId]);

  const handleNewNote = useCallback(() => {
    const doc = createDoc({ title: 'Untitled', folder: 'Projects', content: '# Untitled\n\n' });
    setSelectedId(doc.id);
    setCurrentPage('editor');
  }, [createDoc, setSelectedId]);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (q.trim()) setCurrentPage('search');
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={handleNavigate} onSelectNote={handleSelectNote} />;
      case 'editor':
      case 'notes': return <Editor />;
      case 'graph': return <GraphView onSelectNote={handleSelectNote} />;
      case 'search': return <Search query={searchQuery} onSelectNote={handleSelectNote} />;
      case 'templates': return <Templates onNavigate={handleNavigate} onSelectNote={handleSelectNote} />;
      default: return <Dashboard onNavigate={handleNavigate} onSelectNote={handleSelectNote} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar onSearch={handleSearch} onNewNote={handleNewNote} currentPage={currentPage} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} onSelectNote={handleSelectNote} />
        <main className="flex flex-col flex-1 overflow-hidden">
          {renderPage()}
        </main>
        {(currentPage === 'editor' || currentPage === 'notes') && (
          <RightPanel />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </I18nProvider>
  );
}
