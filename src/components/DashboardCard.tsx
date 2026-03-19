import { motion } from 'framer-motion';
import { LayoutDashboard } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  link: string;
  category: string;
  index: number;
}

const DashboardCard = ({ title, link, category, index }: DashboardCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex flex-col items-center gap-4 rounded-lg border border-border bg-card p-6 transition-shadow duration-200 hover:shadow-md"
    >
      <LayoutDashboard className="h-8 w-8 text-muted-foreground" />
      <div className="text-center">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <span className="mt-1 inline-block text-xs text-muted-foreground">{category}</span>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto rounded-md bg-primary px-5 py-2 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90"
      >
        Visualizar
      </a>
    </motion.div>
  );
};

export default DashboardCard;
