import { getGreeting } from '@/lib/greeting';
import logo from '@/assets/logo-bq.png';

const PortalHeader = () => {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card">
      {/* Subtle decorative accent */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 80% 50%, hsl(217 91% 50%), transparent 50%), radial-gradient(circle at 20% 80%, hsl(152 60% 42%), transparent 40%)'
      }} />
      
      <div className="relative flex items-center gap-5 px-8 py-6">
        <img src={logo} alt="B&Q Energia" className="h-12 w-auto rounded-xl shadow-sm" />
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            {getGreeting()},{' '}
            <span className="bg-gradient-to-r from-primary to-[hsl(217,91%,65%)] bg-clip-text text-transparent">
              Prezado(a)
            </span>
          </h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Visão consolidada dos principais indicadores B&Q Bahia.
          </p>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
