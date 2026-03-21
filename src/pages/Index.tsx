import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FolderOpen, BarChart3, AppWindow, Layers, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import PortalHeader from '@/components/PortalHeader';
import DashboardCard from '@/components/DashboardCard';
import AdminPanel from '@/components/AdminPanel';

interface Dashboard {
  id: string;
  title: string;
  link: string;
  category: string;
  icon: string;
  position: number;
}

const Index = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const dragItem = useRef<string | null>(null);
  const dragOverItem = useRef<string | null>(null);

  const fetchDashboards = async () => {
    const { data, error } = await supabase
      .from('dashboards')
      .select('*')
      .order('position', { ascending: true });

    if (!error && data) {
      setDashboards(data as Dashboard[]);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('dashboards').delete().eq('id', id);
    if (error) {
      toast.error('Erro ao excluir: ' + error.message);
    } else {
      toast.success('Dashboard excluído!');
      fetchDashboards();
    }
  };

  const handleDragStart = (id: string) => { dragItem.current = id; };
  const handleDragOver = (id: string) => { dragOverItem.current = id; };

  const handleDragEnd = async () => {
    if (!dragItem.current || !dragOverItem.current || dragItem.current === dragOverItem.current) return;
    const items = [...dashboards];
    const fromIdx = items.findIndex(d => d.id === dragItem.current);
    const toIdx = items.findIndex(d => d.id === dragOverItem.current);
    if (fromIdx === -1 || toIdx === -1) return;
    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);
    setDashboards(items);
    const updates = items.map((d, i) =>
      supabase.from('dashboards').update({ position: i }).eq('id', d.id)
    );
    await Promise.all(updates);
    dragItem.current = null;
    dragOverItem.current = null;
  };

  useEffect(() => { fetchDashboards(); }, []);

  const biCount = dashboards.filter(d => d.category === 'BI').length;
  const appCount = dashboards.filter(d => d.category === 'App').length;
  const totalCount = dashboards.length;

  const stats = [
    { label: 'Total', value: totalCount, icon: Layers, gradient: 'gradient-primary', textColor: 'text-primary' },
    { label: 'BI', value: biCount, icon: BarChart3, gradient: 'gradient-primary', textColor: 'text-primary' },
    { label: 'Apps', value: appCount, icon: AppWindow, gradient: 'gradient-success', textColor: 'text-[hsl(152,60%,35%)]' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />

      <main className="mx-auto max-w-7xl px-8 py-8">
        {/* Stats bar */}
        {!loading && dashboards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 grid grid-cols-3 gap-4 max-w-xl"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-card transition-all duration-300 hover:shadow-card-hover">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.gradient} shadow-sm`}>
                  <s.icon className="h-5 w-5 text-[hsl(0,0%,100%)]" />
                </div>
                <div>
                  <p className={`text-lg font-bold ${s.textColor}`}>{s.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Section title */}
        {!loading && dashboards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="mb-6 flex items-center gap-2"
          >
            <TrendingUp className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-bold text-foreground tracking-wide uppercase">Seus Dashboards</h2>
            <div className="flex-1 h-px bg-border ml-3" />
          </motion.div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl border border-border bg-card shadow-card" />
            ))}
          </div>
        ) : dashboards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-muted mb-4">
              <FolderOpen className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <p className="text-base text-muted-foreground">
              Nenhum dashboard cadastrado ainda.
            </p>
            <p className="text-sm text-muted-foreground/60 mt-1">
              Clique no botão <span className="text-primary font-semibold">+</span> para começar.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dashboards.map((d, i) => (
              <DashboardCard
                key={d.id}
                id={d.id}
                title={d.title}
                link={d.link}
                category={d.category}
                index={i}
                isAdmin={isAdmin}
                onDelete={handleDelete}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
              />
            ))}
          </div>
        )}
      </main>

      <AdminPanel onSaved={fetchDashboards} onAdminChange={setIsAdmin} />
    </div>
  );
};

export default Index;
