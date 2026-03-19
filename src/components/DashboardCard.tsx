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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col items-center gap-5 rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
        <LayoutDashboard className="h-7 w-7 text-primary" />
      </div>
      <div className="text-center">
        <h3 className="text-sm font-bold text-foreground leading-tight">{title}</h3>
        <span className="mt-1.5 inline-block rounded-full bg-muted px-3 py-0.5 text-xs font-medium text-primary">
          {category}
        </span>
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto rounded-lg bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-110"
      >
        Visualizar
      </a>
    </motion.div>
  );
};

export default DashboardCard;
