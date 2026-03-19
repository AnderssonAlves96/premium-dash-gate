import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import PortalHeader from '@/components/PortalHeader';
import GreetingBanner from '@/components/GreetingBanner';
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
    <div className="mesh-gradient-bg min-h-screen">
      <PortalHeader />
      <GreetingBanner />

      <main className="px-8 py-6">
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card h-36 animate-pulse" />
            ))}
          </div>
        ) : dashboards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-muted-foreground">
              Nenhum dashboard cadastrado ainda.
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Use o ícone de engrenagem abaixo para adicionar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dashboards.map((d, i) => (
              <DashboardCard
                key={d.id}
                title={d.title}
                link={d.link}
                icon={d.icon}
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
