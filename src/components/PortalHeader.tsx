import { getGreeting } from '@/lib/greeting';
import logo from '@/assets/logo-bq.png';

const PortalHeader = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-border">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {getGreeting()},{' '}
          <span className="text-primary">Gestor</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Seus dashboards executivos em um só lugar.
        </p>
      </div>
      <img src={logo} alt="B&Q Energia" className="h-14 w-auto" />
    </header>
  );
};

export default PortalHeader;
