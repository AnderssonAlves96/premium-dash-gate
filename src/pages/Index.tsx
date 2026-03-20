import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FolderOpen, BarChart3, AppWindow, Layers } from 'lucide-react';
import { toast } from 'sonner';
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

  const handleDragStart = (id: string) => {
    dragItem.current = id;
  };

  const handleDragOver = (id: string) => {
    dragOverItem.current = id;
  };

  const handleDragEnd = async () => {
    if (!dragItem.current || !dragOverItem.current || dragItem.current === dragOverItem.current) return;

    const items = [...dashboards];
    const fromIdx = items.findIndex(d => d.id === dragItem.current);
    const toIdx = items.findIndex(d => d.id === dragOverItem.current);
    if (fromIdx === -1 || toIdx === -1) return;

    const [moved] = items.splice(fromIdx, 1);
    items.splice(toIdx, 0, moved);

    // Optimistic update
    setDashboards(items);

    // Persist positions
    const updates = items.map((d, i) =>
      supabase.from('dashboards').update({ position: i }).eq('id', d.id)
    );
    await Promise.all(updates);

    dragItem.current = null;
    dragOverItem.current = null;
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  // Stats
  const biCount = dashboards.filter(d => d.category === 'BI').length;
  const appCount = dashboards.filter(d => d.category === 'App').length;
  const totalCount = dashboards.length;

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />

      <main className="mx-auto max-w-7xl px-8 py-8">
        {/* Stats bar */}
        {!loading && dashboards.length > 0 && (
          <div className="mb-8 grid grid-cols-3 gap-4 max-w-xl">
            <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{totalCount}</p>
                <p className="text-[11px] text-muted-foreground">Total</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{biCount}</p>
                <p className="text-[11px] text-muted-foreground">BI</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-card border border-border p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <Smartphone className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{appCount}</p>
                <p className="text-[11px] text-muted-foreground">Apps</p>
              </div>
            </div>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl border border-border bg-card" />
            ))}
          </div>
        ) : dashboards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FolderOpen className="h-16 w-16 text-muted-foreground/40" />
            <p className="mt-4 text-base text-muted-foreground">
              Nenhum dashboard cadastrado ainda.
            </p>
          </div>
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
