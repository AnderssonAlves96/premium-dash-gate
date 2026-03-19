import { Briefcase } from 'lucide-react';

const PortalHeader = () => {
  return (
    <header className="flex items-center justify-between px-8 py-6">
      <div />
      <div className="flex items-center gap-3">
        <div className="glass-card flex items-center gap-2 px-4 py-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-semibold tracking-wide text-foreground">
            B&Q
          </span>
        </div>
      </div>
    </header>
  );
};

export default PortalHeader;
