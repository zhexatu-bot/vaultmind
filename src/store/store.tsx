import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { Doc } from './types';
import { seedDocs } from './seed';

const STORAGE_KEY = 'vaultmind_docs';

function loadDocs(): Doc[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seedDocs;
}

function saveDocs(docs: Doc[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
}

interface StoreCtx {
  docs: Doc[];
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  getDoc: (id: string) => Doc | undefined;
  createDoc: (partial: Partial<Doc>) => Doc;
  updateDoc: (id: string, changes: Partial<Doc>) => void;
  deleteDoc: (id: string) => void;
  searchDocs: (query: string) => Doc[];
  getDocsByTag: (tag: string) => Doc[];
  getDocsByFolder: (folder: string) => Doc[];
  allTags: string[];
  allFolders: string[];
  resetToSeed: () => void;
}

const StoreContext = createContext<StoreCtx>(null!);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [docs, setDocs] = useState<Doc[]>(loadDocs);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => { saveDocs(docs); }, [docs]);

  const getDoc = useCallback((id: string) => docs.find(d => d.id === id), [docs]);

  const createDoc = useCallback((partial: Partial<Doc>): Doc => {
    const now = new Date().toISOString();
    const doc: Doc = {
      id: crypto.randomUUID(),
      title: partial.title || 'Untitled',
      folder: partial.folder || 'Projects',
      content: partial.content || '',
      tags: partial.tags || [],
      createdAt: now,
      updatedAt: now,
    };
    setDocs(prev => [doc, ...prev]);
    return doc;
  }, []);

  const updateDoc = useCallback((id: string, changes: Partial<Doc>) => {
    setDocs(prev => prev.map(d =>
      d.id === id ? { ...d, ...changes, updatedAt: new Date().toISOString() } : d
    ));
  }, []);

  const deleteDoc = useCallback((id: string) => {
    setDocs(prev => prev.filter(d => d.id !== id));
  }, []);

  const searchDocs = useCallback((query: string): Doc[] => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return docs.filter(d =>
      d.title.toLowerCase().includes(q) ||
      d.content.toLowerCase().includes(q) ||
      d.tags.some(t => t.toLowerCase().includes(q)) ||
      d.folder.toLowerCase().includes(q)
    );
  }, [docs]);

  const getDocsByTag = useCallback((tag: string): Doc[] => {
    return docs.filter(d => d.tags.includes(tag));
  }, [docs]);

  const getDocsByFolder = useCallback((folder: string): Doc[] => {
    return docs.filter(d => d.folder === folder);
  }, [docs]);

  const allTags = [...new Set(docs.flatMap(d => d.tags))].sort();
  const allFolders = [...new Set(docs.map(d => d.folder))].sort();

  const resetToSeed = useCallback(() => {
    setDocs(seedDocs);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <StoreContext.Provider value={{
      docs, selectedId, setSelectedId, getDoc,
      createDoc, updateDoc, deleteDoc,
      searchDocs, getDocsByTag, getDocsByFolder,
      allTags, allFolders, resetToSeed,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
