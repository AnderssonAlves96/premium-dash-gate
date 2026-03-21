import { getGreeting } from '@/lib/greeting';
import logo from '@/assets/logo-bq.png';

const PortalHeader = () => {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 gradient-header" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.04]" style={{
        background: 'radial-gradient(circle, hsl(231 65% 55%), transparent 60%)'
      }} />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-[0.03]" style={{
        background: 'radial-gradient(circle, hsl(160 55% 40%), transparent 60%)'
      }} />

      <div className="relative flex items-center gap-5 px-8 py-7">
        <img src={logo} alt="B&Q Energia" className="h-12 w-auto rounded-xl shadow-sm" />
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            {getGreeting()},{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Prezado(a)
            </span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Visão consolidada dos principais indicadores B&Q Bahia.
          </p>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
