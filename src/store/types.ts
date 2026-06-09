export interface Doc {
  id: string;
  title: string;
  folder: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
  group: string;
  linkCount: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

// Extract [[wikilinks]] from markdown content
export function extractWikiLinks(content: string): string[] {
  const regex = /\[\[([^\]]+)\]\]/g;
  const links: string[] = [];
  let match;
  while ((match = regex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return [...new Set(links)];
}

// Find docs that link TO a given doc title (backlinks)
export function findBacklinks(docs: Doc[], targetTitle: string): Doc[] {
  return docs.filter(d =>
    d.title !== targetTitle &&
    extractWikiLinks(d.content).some(link =>
      link.toLowerCase() === targetTitle.toLowerCase()
    )
  );
}

// Find docs that a given doc links TO (outgoing links)
export function findOutgoingLinks(docs: Doc[], sourceDoc: Doc): Doc[] {
  const links = extractWikiLinks(sourceDoc.content);
  return links
    .map(link => docs.find(d => d.toLowerCase() === link.toLowerCase()))
    .filter((d): d is Doc => d !== undefined);
}

// Generate graph data from documents
export function generateGraph(docs: Doc[]): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const groupColors: Record<string, string> = {
    default: '#38BDF8',
    project: '#38BDF8',
    research: '#8B5CF6',
    meeting: '#10B981',
    legal: '#F59E0B',
    personal: '#EC4899',
    medical: '#06B6D4',
    education: '#F97316',
    consulting: '#6366F1',
    media: '#E11D48',
    enterprise: '#0EA5E9',
  };

  // Count link connections per doc
  const linkCounts: Record<string, number> = {};
  docs.forEach(d => {
    const links = extractWikiLinks(d.content);
    linkCounts[d.id] = (linkCounts[d.id] || 0) + links.length;
    links.forEach(link => {
      const target = docs.find(t => t.title.toLowerCase() === link.toLowerCase());
      if (target) {
        linkCounts[target.id] = (linkCounts[target.id] || 0) + 1;
      }
    });
  });

  // Layout nodes in a circle with some variation
  const nodes: GraphNode[] = docs.map((doc, i) => {
    const angle = (2 * Math.PI * i) / docs.length;
    const radius = 180 + Math.random() * 60;
    const cx = 500 + Math.cos(angle) * radius;
    const cy = 350 + Math.sin(angle) * radius;
    const connections = linkCounts[doc.id] || 0;

    return {
      id: doc.id,
      label: doc.title,
      x: cx,
      y: cy,
      size: Math.max(8, Math.min(24, 6 + connections * 3)),
      color: groupColors[doc.folder.toLowerCase()] || groupColors.default,
      group: doc.folder,
      linkCount: connections,
    };
  });

  // Generate edges
  const edges: GraphEdge[] = [];
  docs.forEach(doc => {
    const links = extractWikiLinks(doc.content);
    links.forEach(link => {
      const target = docs.find(d => d.title.toLowerCase() === link.toLowerCase());
      if (target && target.id !== doc.id) {
        // Avoid duplicate edges
        const exists = edges.some(e =>
          (e.source === doc.id && e.target === target.id) ||
          (e.source === target.id && e.target === doc.id)
        );
        if (!exists) {
          edges.push({ source: doc.id, target: target.id });
        }
      }
    });
  });

  return { nodes, edges };
}
