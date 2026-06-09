import { useState } from 'react';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import RightPanel from './components/layout/RightPanel';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import GraphView from './pages/GraphView';
import Search from './pages/Search';
import Templates from './pages/Templates';
import { I18nProvider } from './i18n';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedNoteId, setSelectedNoteId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page: string) => setCurrentPage(page);
  const handleSelectNote = (id: string) => { setSelectedNoteId(id); setCurrentPage('editor'); };
  const handleSearch = (q: string) => { setSearchQuery(q); if (q.trim()) setCurrentPage('search'); };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard onNavigate={handleNavigate} onSelectNote={handleSelectNote} />;
      case 'editor':
      case 'notes': return <Editor noteId={selectedNoteId} />;
      case 'graph': return <GraphView />;
      case 'search': return <Search query={searchQuery} onSelectNote={handleSelectNote} />;
      case 'templates': return <Templates />;
      default: return <Dashboard onNavigate={handleNavigate} onSelectNote={handleSelectNote} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <TopBar onSearch={handleSearch} onNewNote={() => handleSelectNote('1')} currentPage={currentPage} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex flex-col flex-1 overflow-hidden">
          {renderPage()}
        </main>
        {(currentPage === 'editor' || currentPage === 'notes') && (
          <RightPanel selectedNoteId={selectedNoteId} />
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}
