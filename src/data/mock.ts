export interface Note {
  id: string;
  title: string;
  content: string;
  folder: string;
  tags: string[];
  created: string;
  updated: string;
  links: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  size: number;
  color: string;
  group: string;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export const folders = [
  { name: 'Projects', icon: 'folder', count: 12 },
  { name: 'Meeting Notes', icon: 'calendar', count: 8 },
  { name: 'Legal Templates', icon: 'file-text', count: 5 },
  { name: 'Research', icon: 'flask-conical', count: 15 },
  { name: 'Personal', icon: 'user', count: 6 },
];

export const notes: Note[] = [
  {
    id: '1', title: 'Q2 Product Roadmap', folder: 'Projects',
    content: '# Q2 Product Roadmap\n\n## Key Initiatives\n\n- Launch v2.0 with [[AI Integration]]\n- Improve [[Dashboard Analytics]] performance\n- Onboard 3 new enterprise clients\n\n## Timeline\n\n| Milestone | Date | Owner |\n|-----------|------|-------|\n| Alpha | Apr 15 | Engineering |\n| Beta | May 1 | Product |\n| GA | Jun 1 | All |\n\n> Focus on quality over speed this quarter.\n\nSee also: [[Technical Architecture]], [[Team Allocation]]',
    tags: ['roadmap', 'product', 'q2'], created: '2026-03-15', updated: '2026-06-01',
    links: ['AI Integration', 'Dashboard Analytics', 'Technical Architecture', 'Team Allocation'],
  },
  {
    id: '2', title: 'AI Integration Strategy', folder: 'Research',
    content: '# AI Integration Strategy\n\n## Overview\n\nIntegrating local LLM capabilities into the product for:\n- Smart search\n- Auto-tagging\n- Content summarization\n\n## Technical Approach\n\nUsing [[Technical Architecture]] as foundation.\n\n```python\ndef process_query(text: str) -> str:\n    embeddings = model.encode(text)\n    results = vector_store.search(embeddings, top_k=5)\n    return generate_response(results)\n```\n\nSee: [[Q2 Product Roadmap]], [[Data Privacy Policy]]',
    tags: ['ai', 'strategy', 'research'], created: '2026-02-20', updated: '2026-05-28',
    links: ['Technical Architecture', 'Q2 Product Roadmap', 'Data Privacy Policy'],
  },
  {
    id: '3', title: 'Technical Architecture', folder: 'Projects',
    content: '# Technical Architecture\n\n## Stack\n\n- Frontend: React + TypeScript\n- Backend: Node.js + Express\n- Database: SQLite (local)\n- AI: Local LLM via Ollama\n\n## Components\n\nThe system follows a modular architecture described in [[AI Integration Strategy]].\n\nPerformance targets defined in [[Q2 Product Roadmap]].',
    tags: ['architecture', 'tech', 'engineering'], created: '2026-01-10', updated: '2026-05-20',
    links: ['AI Integration Strategy', 'Q2 Product Roadmap'],
  },
  {
    id: '4', title: 'Team Standup - Week 22', folder: 'Meeting Notes',
    content: '# Team Standup - Week 22\n\n## Attendees\n- Product, Engineering, Design\n\n## Updates\n\n- [[Q2 Product Roadmap]] on track\n- [[Dashboard Analytics]] perf improved 40%\n- New hire starts next week\n\n## Action Items\n- [ ] Review [[Technical Architecture]] PR\n- [ ] Schedule [[Data Privacy Policy]] review',
    tags: ['standup', 'meeting', 'weekly'], created: '2026-05-29', updated: '2026-05-29',
    links: ['Q2 Product Roadmap', 'Dashboard Analytics', 'Technical Architecture', 'Data Privacy Policy'],
  },
  {
    id: '5', title: 'Data Privacy Policy', folder: 'Legal Templates',
    content: '# Data Privacy Policy\n\n## Data Collection\n\nAll user data remains local. No telemetry.\n\n## Compliance\n\n- GDPR compliant\n- SOC2 in progress\n\nReferenced by: [[AI Integration Strategy]], [[Q2 Product Roadmap]]',
    tags: ['legal', 'privacy', 'compliance'], created: '2026-01-05', updated: '2026-04-10',
    links: ['AI Integration Strategy', 'Q2 Product Roadmap'],
  },
  {
    id: '6', title: 'Dashboard Analytics', folder: 'Projects',
    content: '# Dashboard Analytics\n\n## Metrics\n- Page views: 12K/day\n- DAU: 850\n- Retention: 72%\n\n## Improvements\n\nOptimized per [[Technical Architecture]] guidelines.\nPart of [[Q2 Product Roadmap]] deliverables.',
    tags: ['analytics', 'dashboard', 'metrics'], created: '2026-03-01', updated: '2026-05-25',
    links: ['Technical Architecture', 'Q2 Product Roadmap'],
  },
  {
    id: '7', title: 'Reading List 2026', folder: 'Personal',
    content: '# Reading List 2026\n\n- Designing Data-Intensive Applications\n- The Pragmatic Programmer\n- Atomic Habits\n\nNotes on AI books in [[AI Integration Strategy]].',
    tags: ['reading', 'personal', 'books'], created: '2026-01-01', updated: '2026-05-15',
    links: ['AI Integration Strategy'],
  },
  {
    id: '8', title: 'Competitive Analysis', folder: 'Research',
    content: '# Competitive Analysis\n\n## Obsidian\n- Strengths: Plugin ecosystem, graph view\n- Weaknesses: No real-time collab\n\n## Notion\n- Strengths: Collaboration\n- Weaknesses: Cloud-only, privacy concerns\n\nOur advantage: [[Data Privacy Policy]] + [[AI Integration Strategy]]',
    tags: ['research', 'competitive', 'market'], created: '2026-02-15', updated: '2026-05-10',
    links: ['Data Privacy Policy', 'AI Integration Strategy'],
  },
];

export const allTags = ['roadmap', 'product', 'q2', 'ai', 'strategy', 'research', 'architecture', 'tech', 'engineering', 'standup', 'meeting', 'weekly', 'legal', 'privacy', 'compliance', 'analytics', 'dashboard', 'metrics', 'reading', 'personal', 'books', 'competitive', 'market'];

export const graphNodes: GraphNode[] = [
  { id: '1', label: 'Q2 Roadmap', x: 400, y: 200, size: 20, color: '#38BDF8', group: 'project' },
  { id: '2', label: 'AI Strategy', x: 250, y: 120, size: 16, color: '#8B5CF6', group: 'research' },
  { id: '3', label: 'Architecture', x: 550, y: 120, size: 14, color: '#38BDF8', group: 'project' },
  { id: '4', label: 'Standup W22', x: 200, y: 300, size: 10, color: '#10B981', group: 'meeting' },
  { id: '5', label: 'Privacy', x: 100, y: 200, size: 12, color: '#F59E0B', group: 'legal' },
  { id: '6', label: 'Analytics', x: 500, y: 300, size: 12, color: '#38BDF8', group: 'project' },
  { id: '7', label: 'Reading', x: 350, y: 350, size: 8, color: '#EC4899', group: 'personal' },
  { id: '8', label: 'Competitive', x: 150, y: 350, size: 10, color: '#8B5CF6', group: 'research' },
];

export const graphEdges: GraphEdge[] = [
  { source: '1', target: '2' },
  { source: '1', target: '3' },
  { source: '1', target: '6' },
  { source: '2', target: '3' },
  { source: '2', target: '5' },
  { source: '3', target: '6' },
  { source: '4', target: '1' },
  { source: '4', target: '3' },
  { source: '4', target: '5' },
  { source: '7', target: '2' },
  { source: '8', target: '2' },
  { source: '8', target: '5' },
];

export const templates = [
  { id: 'meeting', name: 'Meeting Notes', icon: 'calendar', desc: 'Standard meeting notes template', content: '# Meeting: [Title]\n\n**Date**: \n**Attendees**: \n\n## Agenda\n\n1. \n\n## Discussion\n\n## Action Items\n\n- [ ] \n' },
  { id: 'project', name: 'Project Brief', icon: 'briefcase', desc: 'Project planning template', content: '# Project: [Name]\n\n## Overview\n\n## Goals\n\n## Timeline\n\n| Phase | Start | End | Status |\n|-------|-------|-----|--------|\n|       |       |     |        |\n\n## Resources\n\n## Risks\n' },
  { id: 'research', name: 'Research Notes', icon: 'flask-conical', desc: 'Research documentation template', content: '# Research: [Topic]\n\n## Hypothesis\n\n## Methodology\n\n## Findings\n\n## Conclusion\n\n## References\n' },
  { id: 'weekly', name: 'Weekly Review', icon: 'calendar-days', desc: 'Weekly review template', content: '# Week [N] Review\n\n## Accomplished\n\n- \n\n## Challenges\n\n- \n\n## Next Week\n\n- \n\n## Metrics\n\n| Metric | Target | Actual |\n|--------|--------|--------|\n|        |        |        |\n' },
  { id: 'decision', name: 'Decision Record', icon: 'scale', desc: 'ADR template', content: '# ADR: [Title]\n\n**Status**: Proposed\n**Date**: \n\n## Context\n\n## Decision\n\n## Consequences\n\n### Positive\n\n### Negative\n' },
  { id: 'retrospective', name: 'Retrospective', icon: 'rotate-ccw', desc: 'Sprint retrospective template', content: '# Sprint Retrospective\n\n## What went well\n\n- \n\n## What could be improved\n\n- \n\n## Action items\n\n- [ ] \n' },
];

export const recentSearches = ['AI integration', 'roadmap Q2', 'privacy policy', 'dashboard metrics'];
