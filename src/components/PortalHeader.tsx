import { getGreeting } from '@/lib/greeting';
import logo from '@/assets/logo-bq.png';

const PortalHeader = () => {
  return (
    <header className="flex items-center gap-5 px-8 py-7 border-b border-border bg-card shadow-sm">
      <img src={logo} alt="B&Q Energia" className="h-14 w-auto rounded-lg" />
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          {getGreeting()},{' '}
          <span className="text-primary">Prezado(a)</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Visão consolidada dos principais indicadores B&Q Bahia.
        </p>
      </div>
    </header>
  );
};

export default PortalHeader;
