import { motion } from 'framer-motion';
import { BarChart3, Trash2, GripVertical, ExternalLink, AppWindow, Globe } from 'lucide-react';
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

const categoryConfig: Record<string, { badge: string; iconBg: string; btnClass: string; accent: string }> = {
  BI: {
    badge: 'bg-accent text-accent-foreground',
    iconBg: 'gradient-primary',
    btnClass: 'gradient-primary text-primary-foreground',
    accent: 'group-hover:border-primary/20',
  },
  App: {
    badge: 'bg-success/10 text-success',
    iconBg: 'gradient-success',
    btnClass: 'gradient-success text-success-foreground',
    accent: 'group-hover:border-success/20',
  },
  Outro: {
    badge: 'bg-warning/10 text-warning',
    iconBg: 'gradient-warning',
    btnClass: 'gradient-warning text-warning-foreground',
    accent: 'group-hover:border-warning/20',
  },
};

const DashboardCard = ({
  id, title, link, category, index, isAdmin, onDelete,
  onDragStart, onDragOver, onDragEnd,
}: DashboardCardProps) => {
  const config = categoryConfig[category] || categoryConfig.BI;
  const IconComponent = category === 'App' ? AppWindow : category === 'Outro' ? Globe : BarChart3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      draggable={isAdmin}
      onDragStart={() => onDragStart?.(id)}
      onDragOver={(e) => { e.preventDefault(); onDragOver?.(id); }}
      onDragEnd={() => onDragEnd?.()}
      className={`group relative flex flex-col items-center gap-5 rounded-2xl border border-border bg-card p-7 shadow-card transition-all duration-300 hover:shadow-card-hover ${config.accent} ${isAdmin ? 'cursor-grab active:cursor-grabbing' : ''}`}
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
      <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${config.iconBg} shadow-md`}>
        <IconComponent className="h-7 w-7 text-primary-foreground" />
      </div>

      {/* Title & Category */}
      <div className="text-center space-y-2">
        <h3 className="text-sm font-bold text-foreground leading-snug">{title}</h3>
        <span className={`inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold ${config.badge}`}>
          {category}
        </span>
      </div>

      {/* Action */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-auto inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110 ${config.btnClass}`}
      >
        Visualizar
        <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  );
};

export default DashboardCard;
