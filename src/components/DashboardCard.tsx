import { motion } from 'framer-motion';
import { BarChart3, Trash2, GripVertical, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardCardProps {
  id: string;
  title: string;
  link: string;
  category: string;
  index: number;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onDragStart?: (id: string) => void;
  onDragOver?: (id: string) => void;
  onDragEnd?: () => void;
}

const categoryColor: Record<string, string> = {
  BI: 'bg-primary/10 text-primary',
  App: 'bg-green-100 text-green-700',
  Outro: 'bg-orange-100 text-orange-700',
};

const DashboardCard = ({
  id, title, link, category, index, isAdmin, onDelete,
  onDragStart, onDragOver, onDragEnd,
}: DashboardCardProps) => {
  const catClass = categoryColor[category] || 'bg-accent text-accent-foreground';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      draggable={isAdmin}
      onDragStart={() => onDragStart?.(id)}
      onDragOver={(e) => { e.preventDefault(); onDragOver?.(id); }}
      onDragEnd={() => onDragEnd?.()}
      className={`group relative flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${isAdmin ? 'cursor-grab active:cursor-grabbing' : ''}`}
    >
      {/* Admin controls */}
      {isAdmin && (
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={() => onDelete?.(id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent shadow-sm">
        <BarChart3 className="h-7 w-7 text-primary" />
      </div>

      {/* Title & Category */}
      <div className="text-center space-y-1.5">
        <h3 className="text-sm font-bold text-foreground leading-snug">{title}</h3>
        <span className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold ${catClass}`}>
          {category}
        </span>
      </div>

      {/* Action */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110"
      >
        Visualizar
        <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  );
};

export default DashboardCard;
