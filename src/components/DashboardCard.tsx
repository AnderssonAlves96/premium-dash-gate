import { motion } from 'framer-motion';
import { icons } from 'lucide-react';
import { ExternalLink } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  link: string;
  icon: string;
  category: string;
  index: number;
}

const DashboardCard = ({ title, link, icon, category, index }: DashboardCardProps) => {
  const IconComponent = (icons as Record<string, React.ComponentType<{ className?: string }>>)[icon] || icons.BarChart3;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card group flex flex-col gap-4 p-6 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <IconComponent className="h-6 w-6 text-primary" />
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <span className="mt-1 inline-block text-xs font-medium text-muted-foreground">{category}</span>
      </div>
    </motion.a>
  );
};

export default DashboardCard;
