import { getGreeting } from '@/lib/greeting';

const GreetingBanner = () => {
  return (
    <div className="px-8 pb-2">
      <h1 className="font-display text-3xl font-semibold text-foreground">
        {getGreeting()},{' '}
        <span className="text-primary">Gestor</span>
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Seus dashboards executivos em um só lugar.
      </p>
    </div>
  );
};

export default GreetingBanner;
