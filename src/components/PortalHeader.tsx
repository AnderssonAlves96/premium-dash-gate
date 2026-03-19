import { getGreeting } from '@/lib/greeting';
import logo from '@/assets/logo-bq.png';

const PortalHeader = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-border">
      <div className="flex items-center gap-4">
        <img src={logo} alt="B&Q Energia" className="h-14 w-auto" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {getGreeting()},{' '}
            <span className="text-primary">Prezado(a)</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Todos os seus dashboards reunidos em um só ambiente.
          </p>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
