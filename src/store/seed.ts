import type { Doc } from './types';

export const seedDocs: Doc[] = [
  {
    id: '1', title: 'Q2 Product Roadmap', folder: 'Projects',
    content: '# Q2 Product Roadmap\n\n## Key Initiatives\n\n- Launch v2.0 with [[AI Integration]]\n- Improve [[Dashboard Analytics]] performance\n- Onboard 3 new enterprise clients\n\n## Timeline\n\n| Milestone | Date | Owner |\n|-----------|------|-------|\n| Alpha | Apr 15 | Engineering |\n| Beta | May 1 | Product |\n| GA | Jun 1 | All |\n\n> Focus on quality over speed this quarter.\n\nSee also: [[Technical Architecture]], [[Team Allocation]]',
    tags: ['roadmap', 'product', 'q2'], createdAt: '2026-03-15', updatedAt: '2026-06-01',
  },
  {
    id: '2', title: 'AI Integration Strategy', folder: 'Research',
    content: '# AI Integration Strategy\n\n## Overview\n\nIntegrating local LLM capabilities into the product for:\n- Smart search\n- Auto-tagging\n- Content summarization\n\n## Technical Approach\n\nUsing [[Technical Architecture]] as foundation.\n\n```python\ndef process_query(text: str) -> str:\n    embeddings = model.encode(text)\n    results = vector_store.search(embeddings, top_k=5)\n    return generate_response(results)\n```\n\nSee: [[Q2 Product Roadmap]], [[Data Privacy Policy]]',
    tags: ['ai', 'strategy', 'research'], createdAt: '2026-02-20', updatedAt: '2026-05-28',
  },
  {
    id: '3', title: 'Technical Architecture', folder: 'Projects',
    content: '# Technical Architecture\n\n## Stack\n\n- Frontend: React + TypeScript\n- Backend: Node.js + Express\n- Database: SQLite (local)\n- AI: Local LLM via Ollama\n\n## Components\n\nThe system follows a modular architecture described in [[AI Integration Strategy]].\n\nPerformance targets defined in [[Q2 Product Roadmap]].',
    tags: ['architecture', 'tech', 'engineering'], createdAt: '2026-01-10', updatedAt: '2026-05-20',
  },
  {
    id: '4', title: 'Team Standup - Week 22', folder: 'Meeting Notes',
    content: '# Team Standup - Week 22\n\n## Attendees\n- Product, Engineering, Design\n\n## Updates\n\n- [[Q2 Product Roadmap]] on track\n- [[Dashboard Analytics]] perf improved 40%\n- New hire starts next week\n\n## Action Items\n- [ ] Review [[Technical Architecture]] PR\n- [ ] Schedule [[Data Privacy Policy]] review',
    tags: ['standup', 'meeting', 'weekly'], createdAt: '2026-05-29', updatedAt: '2026-05-29',
  },
  {
    id: '5', title: 'Data Privacy Policy', folder: 'Legal Templates',
    content: '# Data Privacy Policy\n\n## Data Collection\n\nAll user data remains local. No telemetry.\n\n## Compliance\n\n- GDPR compliant\n- SOC2 in progress\n\nReferenced by: [[AI Integration Strategy]], [[Q2 Product Roadmap]]',
    tags: ['legal', 'privacy', 'compliance'], createdAt: '2026-01-05', updatedAt: '2026-04-10',
  },
  {
    id: '6', title: 'Dashboard Analytics', folder: 'Projects',
    content: '# Dashboard Analytics\n\n## Metrics\n- Page views: 12K/day\n- DAU: 850\n- Retention: 72%\n\n## Improvements\n\nOptimized per [[Technical Architecture]] guidelines.\nPart of [[Q2 Product Roadmap]] deliverables.',
    tags: ['analytics', 'dashboard', 'metrics'], createdAt: '2026-03-01', updatedAt: '2026-05-25',
  },
  {
    id: '7', title: 'Reading List 2026', folder: 'Personal',
    content: '# Reading List 2026\n\n- Designing Data-Intensive Applications\n- The Pragmatic Programmer\n- Atomic Habits\n\nNotes on AI books in [[AI Integration Strategy]].',
    tags: ['reading', 'personal', 'books'], createdAt: '2026-01-01', updatedAt: '2026-05-15',
  },
  {
    id: '8', title: 'Competitive Analysis', folder: 'Research',
    content: '# Competitive Analysis\n\n## Obsidian\n- Strengths: Plugin ecosystem, graph view\n- Weaknesses: No real-time collab\n\n## Notion\n- Strengths: Collaboration\n- Weaknesses: Cloud-only, privacy concerns\n\nOur advantage: [[Data Privacy Policy]] + [[AI Integration Strategy]]',
    tags: ['research', 'competitive', 'market'], createdAt: '2026-02-15', updatedAt: '2026-05-10',
  },
];

// Template generators
export function generateTemplateDocs(templateId: string): Doc[] {
  const now = new Date().toISOString();
  const templates: Record<string, { title: string; folder: string; content: string; tags: string[] }[]> = {
    legal: [
      { title: 'Case File: Johnson v. Smith', folder: 'Cases', content: '# Case File: Johnson v. Smith\n\n## Case Number\n2026-CV-1234\n\n## Parties\n- **Plaintiff**: Johnson\n- **Defendant**: Smith\n\n## Facts\n\n## Legal Issues\n\n## Applicable Law\n\nSee [[Client: Johnson]], [[Contract Template A]], [[Evidence Log]]\n\n## Strategy\n\n## Timeline\n\n| Date | Event | Status |\n|------|-------|--------|\n| Jan 15 | Filed | Done |\n| Mar 1 | Discovery | In Progress |\n', tags: ['case', 'litigation'] },
      { title: 'Client: Johnson', folder: 'Clients', content: '# Client: Johnson\n\n**Phone**: 555-0123\n**Email**: johnson@email.com\n**Retainer**: $5,000\n\n## Active Cases\n- [[Case File: Johnson v. Smith]]\n\n## Notes\n\n## Documents\n', tags: ['client', 'active'] },
      { title: 'Contract Template A', folder: 'Templates', content: '# Contract Template A\n\n## Parties\n\n## Terms\n\n1. ...\n2. ...\n\n## Obligations\n\n## Termination\n\n## Signatures\n\nUsed in: [[Case File: Johnson v. Smith]]\n', tags: ['template', 'contract'] },
      { title: 'Evidence Log', folder: 'Cases', content: '# Evidence Log\n\n## Exhibits\n\n| # | Description | Source | Date | Status |\n|---|-------------|--------|------|--------|\n| A | Contract | Client | Jan 20 | Admitted |\n| B | Emails | Discovery | Feb 5 | Pending |\n\nLinked cases: [[Case File: Johnson v. Smith]]\n', tags: ['evidence', 'log'] },
      { title: 'Legal Research Index', folder: 'Research', content: '# Legal Research Index\n\n## Contract Law\n- ...\n\n## Tort Law\n- ...\n\n## Relevant Statutes\n\n## Case Law Database\n\nReferences: [[Case File: Johnson v. Smith]], [[Contract Template A]]\n', tags: ['research', 'index'] },
    ],
    medical: [
      { title: 'Patient Record Template', folder: 'Patients', content: '# Patient Record\n\n**Name**: \n**DOB**: \n**ID**: \n\n## Medical History\n\n## Current Medications\n\n## Allergies\n\n## Visit Log\n\n| Date | Reason | Diagnosis | Treatment |\n|------|--------|-----------|----------|\n\n## Notes\n\nSee [[Treatment Protocol Index]], [[Drug Interaction Reference]]\n', tags: ['patient', 'template'] },
      { title: 'Treatment Protocol Index', folder: 'Protocols', content: '# Treatment Protocol Index\n\n## Cardiovascular\n- Hypertension: ...\n- Arrhythmia: ...\n\n## Respiratory\n- Asthma: ...\n\nReferenced by: [[Patient Record Template]]\n', tags: ['protocol', 'index'] },
      { title: 'Drug Interaction Reference', folder: 'Reference', content: '# Drug Interaction Reference\n\n## Common Interactions\n\n| Drug A | Drug B | Severity | Notes |\n|--------|--------|----------|-------|\n| ... | ... | ... | ... |\n\nSee [[Patient Record Template]]\n', tags: ['drugs', 'reference'] },
      { title: 'Appointment Schedule', folder: 'Admin', content: '# Appointment Schedule\n\n## This Week\n\n| Date | Time | Patient | Type |\n|------|------|---------|------|\n\n## Follow-ups\n\nLinked: [[Patient Record Template]]\n', tags: ['schedule', 'admin'] },
    ],
    education: [
      { title: 'Course Plan: Data Structures', folder: 'Courses', content: '# Course Plan: Data Structures\n\n**Semester**: Fall 2026\n**Credits**: 3\n\n## Objectives\n\n## Schedule\n\n| Week | Topic | Assignment |\n|------|-------|------------|\n| 1 | Arrays & Lists | HW1 |\n| 2 | Stacks & Queues | HW2 |\n\n## Assessment\n\nSee [[Lecture Notes Template]], [[Student Grade Sheet]]\n', tags: ['course', 'plan'] },
      { title: 'Lecture Notes Template', folder: 'Templates', content: '# Lecture Notes: [Topic]\n\n**Date**: \n**Course**: [[Course Plan: Data Structures]]\n\n## Key Concepts\n\n## Examples\n\n## Questions\n\n## Homework\n', tags: ['template', 'lecture'] },
      { title: 'Student Grade Sheet', folder: 'Admin', content: '# Student Grade Sheet\n\n**Course**: [[Course Plan: Data Structures]]\n\n| Student | HW1 | HW2 | Midterm | Final | Grade |\n|---------|-----|-----|---------|-------|-------|\n\n## Grade Distribution\n', tags: ['grades', 'admin'] },
      { title: 'Research Paper Reading List', folder: 'Research', content: '# Research Paper Reading List\n\n## Must Read\n1. ...\n\n## Supplementary\n1. ...\n\n## Notes\n\nLinks to: [[Course Plan: Data Structures]]\n', tags: ['reading', 'research'] },
    ],
    research: [
      { title: 'Thesis Outline', folder: 'Thesis', content: '# Thesis Outline\n\n**Title**: [Your Title]\n**Advisor**: \n\n## Chapter 1: Introduction\n\n## Chapter 2: Literature Review\n\n## Chapter 3: Methodology\n\n## Chapter 4: Results\n\n## Chapter 5: Discussion\n\n## Bibliography\n\nSee [[Experiment Log]], [[Reading Notes Index]], [[Meeting Notes with Advisor]]\n', tags: ['thesis', 'outline'] },
      { title: 'Experiment Log', folder: 'Experiments', content: '# Experiment Log\n\n## Experiment 1\n**Date**: \n**Hypothesis**: \n**Method**: \n**Results**: \n**Conclusion**: \n\n## Experiment 2\n\nLinked: [[Thesis Outline]]\n', tags: ['experiment', 'log'] },
      { title: 'Reading Notes Index', folder: 'Reading', content: '# Reading Notes Index\n\n## Papers Read\n\n| Paper | Year | Key Finding | Relevance |\n|-------|------|-------------|----------|\n\nSee [[Thesis Outline]], [[Experiment Log]]\n', tags: ['reading', 'index'] },
      { title: 'Meeting Notes with Advisor', folder: 'Meetings', content: '# Meeting Notes with Advisor\n\n**Date**: \n\n## Discussion\n\n## Feedback\n\n## Action Items\n\n- [ ] \n\nReferences: [[Thesis Outline]], [[Experiment Log]]\n', tags: ['meeting', 'advisor'] },
      { title: 'Code Notes', folder: 'Code', content: '# Code Notes\n\n## Environment Setup\n\n```bash\nconda activate thesis\n```\n\n## Key Scripts\n\n| Script | Purpose | Usage |\n|--------|---------|-------|\n| train.py | Model training | `python train.py --epochs 100` |\n\n## Issues & Solutions\n\nSee [[Experiment Log]], [[Thesis Outline]]\n', tags: ['code', 'notes'] },
    ],
    media: [
      { title: 'Content Calendar - June', folder: 'Planning', content: '# Content Calendar - June\n\n| Date | Platform | Topic | Status |\n|------|----------|-------|--------|\n| Jun 1 | Twitter | AI tools | Draft |\n| Jun 3 | Blog | Tutorial | Planned |\n| Jun 5 | YouTube | Demo | Idea |\n\nSee [[Topic Ideas Bank]], [[Analytics Tracker]]\n', tags: ['calendar', 'planning'] },
      { title: 'Topic Ideas Bank', folder: 'Ideas', content: '# Topic Ideas Bank\n\n## Evergreen\n- ...\n\n## Trending\n- ...\n\n## Series\n- ...\n\nLinked: [[Content Calendar - June]]\n', tags: ['ideas', 'brainstorm'] },
      { title: 'Analytics Tracker', folder: 'Data', content: '# Analytics Tracker\n\n## Monthly Overview\n\n| Metric | Jan | Feb | Mar |\n|--------|-----|-----|-----|\n| Followers | | | |\n| Engagement | | | |\n| Views | | | |\n\nSee [[Content Calendar - June]], [[Topic Ideas Bank]]\n', tags: ['analytics', 'tracking'] },
    ],
    enterprise: [
      { title: 'Standard Operating Procedure: Onboarding', folder: 'SOPs', content: '# SOP: Employee Onboarding\n\n**Version**: 1.0\n**Owner**: HR\n\n## Steps\n\n1. Send offer letter\n2. IT setup (laptop, email, access)\n3. Day 1 orientation\n4. Week 1 training\n5. 30-day check-in\n\nSee [[Org Chart]], [[Tool Access Matrix]]\n', tags: ['sop', 'onboarding', 'hr'] },
      { title: 'Org Chart', folder: 'Admin', content: '# Org Chart\n\n## Engineering\n- CTO\n  - VP Engineering\n    - Team Lead A\n    - Team Lead B\n\n## Product\n- CPO\n\nReferenced by: [[Standard Operating Procedure: Onboarding]]\n', tags: ['org', 'structure'] },
      { title: 'Tool Access Matrix', folder: 'Admin', content: '# Tool Access Matrix\n\n| Tool | Admin | Manager | IC | Intern |\n|------|-------|---------|-----|--------|\n| GitHub | R/W | R/W | R/W | R |\n| AWS | Admin | R/W | R | - |\n\nSee [[Standard Operating Procedure: Onboarding]]\n', tags: ['tools', 'access', 'security'] },
    ],
    consulting: [
      { title: 'Client Proposal Template', folder: 'Proposals', content: '# Client Proposal\n\n**Client**: \n**Date**: \n\n## Executive Summary\n\n## Scope of Work\n\n## Deliverables\n\n## Timeline\n\n## Pricing\n\n## Terms\n\nSee [[Project Tracker]], [[Client CRM Notes]]\n', tags: ['proposal', 'template'] },
      { title: 'Project Tracker', folder: 'Projects', content: '# Project Tracker\n\n| Project | Client | Status | Deadline | Budget |\n|---------|--------|--------|----------|--------|\n| ... | ... | Active | ... | ... |\n\nLinked: [[Client Proposal Template]]\n', tags: ['tracker', 'projects'] },
      { title: 'Client CRM Notes', folder: 'CRM', content: '# Client CRM Notes\n\n## Client A\n**Contact**: \n**Industry**: \n**History**: \n\nSee [[Client Proposal Template]], [[Project Tracker]]\n', tags: ['crm', 'clients'] },
    ],
  };

  const tpl = templates[templateId];
  if (!tpl) return [];

  return tpl.map(t => ({
    id: crypto.randomUUID(),
    title: t.title,
    folder: t.folder,
    content: t.content,
    tags: t.tags,
    createdAt: now,
    updatedAt: now,
  }));
}
