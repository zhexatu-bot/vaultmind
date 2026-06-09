import { Network } from 'lucide-react';
import { graphNodes, graphEdges } from '../../data/mock';

interface Props {
  onNavigate: (page: string) => void;
}

export default function GraphPreview({ onNavigate }: Props) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-accent-purple" />
          <h3 className="text-sm font-semibold text-text-primary">Knowledge Graph</h3>
        </div>
        <button onClick={() => onNavigate('graph')} className="text-xs text-accent-blue hover:underline">Expand</button>
      </div>
      <div className="relative h-48 rounded-xl bg-black/20 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 600 400">
          {/* Edges */}
          {graphEdges.map((edge, i) => {
            const src = graphNodes.find(n => n.id === edge.source);
            const tgt = graphNodes.find(n => n.id === edge.target);
            if (!src || !tgt) return null;
            return <line key={i} x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y} className="graph-edge" />;
          })}
          {/* Nodes */}
          {graphNodes.map(node => (
            <g key={node.id} className="graph-node">
              <circle cx={node.x} cy={node.y} r={node.size} fill={node.color} opacity={0.8} />
              <text x={node.x} y={node.y + node.size + 14} textAnchor="middle" fill="#9CA3AF" fontSize="10" fontFamily="Inter, sans-serif">
                {node.label}
              </text>
            </g>
          ))}
        </svg>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
