import { useMemo } from 'react';
import { Network } from 'lucide-react';
import { useStore } from '../../store/store';
import { generateGraph } from '../../store/types';
import { useI18n } from '../../i18n';

interface Props {
  onNavigate: (page: string) => void;
}

export default function GraphPreview({ onNavigate }: Props) {
  const { t } = useI18n();
  const { docs } = useStore();
  const { nodes, edges } = useMemo(() => generateGraph(docs), [docs]);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-accent-purple" />
          <h3 className="text-sm font-semibold text-text-primary">{t('knowledgeGraph')}</h3>
        </div>
        <button onClick={() => onNavigate('graph')} className="text-xs text-accent-blue hover:underline">{t('expand')}</button>
      </div>
      <div className="relative h-48 rounded-xl bg-black/20 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 600 400">
          {edges.map((edge, i) => {
            const src = nodes.find(n => n.id === edge.source);
            const tgt = nodes.find(n => n.id === edge.target);
            if (!src || !tgt) return null;
            return <line key={i} x1={src.x * 0.6} y1={src.y * 0.6} x2={tgt.x * 0.6} y2={tgt.y * 0.6} className="graph-edge" />;
          })}
          {nodes.map(node => (
            <g key={node.id} className="graph-node">
              <circle cx={node.x * 0.6} cy={node.y * 0.6} r={node.size * 0.7} fill={node.color} opacity={0.8} />
              <circle cx={node.x * 0.6} cy={node.y * 0.6} r={node.size * 1.2} fill={node.color} opacity={0.08} />
              <text x={node.x * 0.6} y={node.y * 0.6 + node.size * 0.7 + 12} textAnchor="middle" fill="#9CA3AF" fontSize="9" fontFamily="Inter, sans-serif">
                {node.label.length > 12 ? node.label.substring(0, 12) + '...' : node.label}
              </text>
            </g>
          ))}
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
