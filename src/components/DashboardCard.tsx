import { motion } from 'framer-motion';
import { BarChart3, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardCardProps {
  id: string;
  title: string;
  link: string;
  category: string;
  index: number;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

const DashboardCard = ({ id, title, link, category, index, isAdmin, onDelete }: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete?.(id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent">
        <BarChart3 className="h-5 w-5 text-primary" />
      </div>

      <div className="text-center">
        <h3 className="text-xs font-bold text-foreground leading-tight">{title}</h3>
        <span className="mt-1 inline-block rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
          {category}
        </span>
      </div>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto rounded-lg bg-primary px-5 py-2 text-[11px] font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110"
      >
        Visualizar
      </a>
    </motion.div>
  );
};

export default DashboardCard;
