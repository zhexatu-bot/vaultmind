import { FileText, Link2, Tag, HardDrive } from 'lucide-react';

const stats = [
  { label: 'Total Notes', value: '46', icon: <FileText className="w-5 h-5" />, color: 'from-blue-500/20 to-cyan-500/20', iconColor: 'text-blue-400' },
  { label: 'Backlinks', value: '128', icon: <Link2 className="w-5 h-5" />, color: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-400' },
  { label: 'Tags', value: '23', icon: <Tag className="w-5 h-5" />, color: 'from-emerald-500/20 to-teal-500/20', iconColor: 'text-emerald-400' },
  { label: 'Storage', value: '12MB', icon: <HardDrive className="w-5 h-5" />, color: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-400' },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.label} className="glass-card p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-text-muted font-medium uppercase tracking-wider">{s.label}</span>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center ${s.iconColor}`}>
              {s.icon}
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary">{s.value}</div>
        </div>
      ))}
    </div>
  );
}
