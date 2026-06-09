import { useState } from 'react';
import { graphNodes, graphEdges, notes } from '../data/mock';
import { ZoomIn, ZoomOut, Maximize2, Link2, FileText, Tag } from 'lucide-react';
import { useI18n } from '../i18n';

export default function GraphView() {
  const { t } = useI18n();
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const scale = 0.85 * zoom;
  const hovered = graphNodes.find(n => n.id === hoveredNode);
  const selected = graphNodes.find(n => n.id === selectedNode);
  const connectedNodes = hoveredNode
    ? graphEdges.filter(e => e.source === hoveredNode || e.target === hoveredNode)
        .map(e => e.source === hoveredNode ? e.target : e.source)
    : [];

  const groups = [
    { color: '#38BDF8', label: t('project') },
    { color: '#8B5CF6', label: t('research') },
    { color: '#10B981', label: t('meeting') },
    { color: '#F59E0B', label: 'Legal' },
    { color: '#EC4899', label: t('personal') },
  ];

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Graph area */}
      <div className="flex-1 relative overflow-hidden bg-mesh">
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          {[['Zoom in', <ZoomIn className="w-4 h-4" />, () => setZoom(z => Math.min(z + 0.2, 2))],
            ['Zoom out', <ZoomOut className="w-4 h-4" />, () => setZoom(z => Math.max(z - 0.2, 0.4))],
            ['Reset', <Maximize2 className="w-4 h-4" />, () => setZoom(1)]
          ].map(([title, icon, fn]) => (
            <button key={title as string} onClick={fn as () => void} className="p-2.5 rounded-xl glass text-text-secondary hover:text-text-primary hover:border-border-hover transition-all" title={title as string}>
              {icon}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute top-4 left-4 z-10 glass rounded-xl p-4">
          <h4 className="text-xs font-semibold text-text-primary mb-3">{t('groups')}</h4>
          <div className="flex flex-col gap-2">
            {groups.map(g => (
              <div key={g.label} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full shadow-[0_0_6px_rgba(255,255,255,0.1)]" style={{ background: g.color }}></div>
                <span className="text-xs text-text-secondary">{g.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hover tooltip */}
        {hovered && !selectedNode && (
          <div className="graph-tooltip" style={{ left: hovered.x * scale + 100, top: hovered.y * scale - 30 }}>
            <div className="text-sm font-semibold text-text-primary mb-1">{hovered.label}</div>
            <div className="text-xs text-text-muted mb-2">{hovered.group}</div>
            <div className="flex items-center gap-1.5 text-xs text-accent-blue">
              <Link2 className="w-3 h-3" />
              {connectedNodes.length} connections
            </div>
          </div>
        )}

        {/* SVG Graph */}
        <svg width="100%" height="100%" viewBox="0 0 1000 700">
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g transform={`scale(${scale})`}>
            {/* Edges */}
            {graphEdges.map((edge, i) => {
              const src = graphNodes.find(n => n.id === edge.source);
              const tgt = graphNodes.find(n => n.id === edge.target);
              if (!src || !tgt) return null;
              const isHighlighted = hoveredNode === edge.source || hoveredNode === edge.target;
              return (
                <line
                  key={i}
                  x1={src.x * 1.4} y1={src.y * 1.4}
                  x2={tgt.x * 1.4} y2={tgt.y * 1.4}
                  stroke={isHighlighted ? 'rgba(56,189,248,0.5)' : 'rgba(255,255,255,0.06)'}
                  strokeWidth={isHighlighted ? 2.5 : 1}
                  strokeDasharray={isHighlighted ? 'none' : '4 4'}
                  className="transition-all"
                />
              );
            })}
            {/* Nodes */}
            {graphNodes.map(node => {
              const isHovered = hoveredNode === node.id;
              const isConnected = connectedNodes.includes(node.id);
              const isActive = isHovered || isConnected;
              return (
                <g
                  key={node.id}
                  className="graph-node"
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                >
                  {/* Outer glow */}
                  <circle cx={node.x * 1.4} cy={node.y * 1.4} r={node.size * 2.5} fill={node.color} opacity={isActive ? 0.06 : 0} className="transition-all" />
                  {/* Middle ring */}
                  <circle cx={node.x * 1.4} cy={node.y * 1.4} r={node.size * 1.6} fill={node.color} opacity={isActive ? 0.12 : 0} className="transition-all" />
                  {/* Main node */}
                  <circle
                    cx={node.x * 1.4} cy={node.y * 1.4}
                    r={node.size * 1.1}
                    fill={node.color}
                    opacity={hoveredNode ? (isActive ? 1 : 0.25) : 0.8}
                    filter={isHovered ? 'url(#glow)' : undefined}
                    className="transition-all"
                  />
                  {/* Label */}
                  <text
                    x={node.x * 1.4} y={node.y * 1.4 + node.size * 1.1 + 16}
                    textAnchor="middle"
                    fill={isHovered ? '#E5E7EB' : '#6B7280'}
                    fontSize="11"
                    fontFamily="Inter, sans-serif"
                    fontWeight={isHovered ? '600' : '400'}
                    className="transition-all"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Right panel for selected node */}
      <div className="w-[300px] border-l border-border bg-bg-sidebar overflow-y-auto">
        <div className="p-5">
          {selected ? (
            <>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: selected.color + '20' }}>
                  <FileText className="w-5 h-5" style={{ color: selected.color }} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{selected.label}</h3>
                  <span className="text-xs text-text-muted">{selected.group}</span>
                </div>
              </div>

              {/* Backlinks */}
              <section className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Link2 className="w-3.5 h-3.5 text-accent-blue" />
                  <span className="text-xs font-semibold text-text-primary">{t('backlinks')}</span>
                </div>
                <div className="flex flex-col gap-1">
                  {graphEdges.filter(e => e.source === selected.id || e.target === selected.id).map((e, i) => {
                    const otherId = e.source === selected.id ? e.target : e.source;
                    const other = graphNodes.find(n => n.id === otherId);
                    return other ? (
                      <div key={i} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/[0.03] cursor-pointer transition-all">
                        <div className="w-2 h-2 rounded-full" style={{ background: other.color }}></div>
                        <span className="text-xs text-text-secondary">{other.label}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </section>

              {/* Tags */}
              <section className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-3.5 h-3.5 text-accent-purple" />
                  <span className="text-xs font-semibold text-text-primary">{t('tags')}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(notes.find(n => n.title.includes(selected.label.split(' ')[0]))?.tags || ['project']).map(tag => (
                    <span key={tag} className="tag-badge">#{tag}</span>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-7 h-7 text-accent-blue/40" />
              </div>
              <p className="text-xs text-text-muted">Click a node to see details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
