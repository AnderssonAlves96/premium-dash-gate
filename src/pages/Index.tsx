import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FolderOpen } from 'lucide-react';
import PortalHeader from '@/components/PortalHeader';
import DashboardCard from '@/components/DashboardCard';
import AdminPanel from '@/components/AdminPanel';

interface Dashboard {
  id: string;
  title: string;
  link: string;
  category: string;
  icon: string;
}

const Index = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboards = async () => {
    const { data, error } = await supabase
      .from('dashboards')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDashboards(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboards();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <PortalHeader />

      <main className="mx-auto max-w-7xl px-8 py-10">
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-xl border border-border bg-card" />
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dashboards.map((d, i) => (
              <DashboardCard
                key={d.id}
                title={d.title}
                link={d.link}
                category={d.category}
                index={i}
              />
            ))}
          </div>
        )}
      </main>

      <AdminPanel onSaved={fetchDashboards} />
    </div>
  );
};

export default Index;
