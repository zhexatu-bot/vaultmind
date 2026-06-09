import { useState } from 'react';
import { graphNodes, graphEdges } from '../data/mock';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

export default function GraphView() {
  const [zoom, setZoom] = useState(1);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const scale = 0.9 * zoom;

  return (
    <div className="flex-1 relative overflow-hidden bg-bg-primary">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button onClick={() => setZoom(z => Math.min(z + 0.2, 2))} className="p-2 rounded-lg glass text-text-secondary hover:text-text-primary transition-colors">
          <ZoomIn className="w-4 h-4" />
        </button>
        <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))} className="p-2 rounded-lg glass text-text-secondary hover:text-text-primary transition-colors">
          <ZoomOut className="w-4 h-4" />
        </button>
        <button onClick={() => setZoom(1)} className="p-2 rounded-lg glass text-text-secondary hover:text-text-primary transition-colors">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 glass rounded-xl p-4">
        <h4 className="text-xs font-semibold text-text-primary mb-3">Groups</h4>
        <div className="flex flex-col gap-2">
          {[
            { color: '#38BDF8', label: 'Project' },
            { color: '#8B5CF6', label: 'Research' },
            { color: '#10B981', label: 'Meeting' },
            { color: '#F59E0B', label: 'Legal' },
            { color: '#EC4899', label: 'Personal' },
          ].map(g => (
            <div key={g.label} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: g.color }}></div>
              <span className="text-xs text-text-secondary">{g.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Graph */}
      <svg width="100%" height="100%" viewBox="0 0 1000 600">
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
                x1={src.x * 1.5} y1={src.y * 1.5}
                x2={tgt.x * 1.5} y2={tgt.y * 1.5}
                stroke={isHighlighted ? 'rgba(56,189,248,0.4)' : 'rgba(255,255,255,0.08)'}
                strokeWidth={isHighlighted ? 2 : 1}
                className="transition-all"
              />
            );
          })}
          {/* Nodes */}
          {graphNodes.map(node => {
            const isHovered = hoveredNode === node.id;
            const isConnected = hoveredNode ? graphEdges.some(e =>
              (e.source === hoveredNode && e.target === node.id) ||
              (e.target === hoveredNode && e.source === node.id)
            ) : false;
            return (
              <g
                key={node.id}
                className="graph-node"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <circle
                  cx={node.x * 1.5} cy={node.y * 1.5}
                  r={node.size * 1.2}
                  fill={node.color}
                  opacity={hoveredNode ? (isHovered || isConnected ? 1 : 0.3) : 0.8}
                  className="transition-all"
                />
                {isHovered && (
                  <circle
                    cx={node.x * 1.5} cy={node.y * 1.5}
                    r={node.size * 1.8}
                    fill="none"
                    stroke={node.color}
                    strokeWidth="2"
                    opacity="0.3"
                  />
                )}
                <text
                  x={node.x * 1.5} y={node.y * 1.5 + node.size * 1.2 + 18}
                  textAnchor="middle"
                  fill={isHovered ? '#E5E7EB' : '#9CA3AF'}
                  fontSize="12"
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
  );
}
