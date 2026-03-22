import { getGreeting } from '@/lib/greeting';
import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo-bq.png';

const PortalHeader = () => {
  return (
    <header className="relative overflow-hidden border-b border-border bg-card">
      {/* Layered mesh gradient background */}
      <div className="absolute inset-0 gradient-header" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]" style={{
        background: 'radial-gradient(circle, hsl(231 65% 55%), transparent 55%)'
      }} />
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full opacity-[0.04]" style={{
        background: 'radial-gradient(circle, hsl(215 80% 55%), transparent 55%)'
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] opacity-[0.02]" style={{
        background: 'radial-gradient(ellipse, hsl(231 65% 55%), transparent 60%)'
      }} />

      <div className="relative flex items-center gap-6 px-8 py-8">
        {/* Logo with glow ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <img src={logo} alt="B&Q Energia" className="h-14 w-auto rounded-2xl" />
        </motion.div>

        {/* Text block */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
            {getGreeting()},{' '}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Prezado(a)
            </span>
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-primary/50" />
            Visão consolidada dos principais indicadores B&Q Bahia.
          </p>
        </motion.div>

        {/* Decorative accent line */}
        <div className="ml-auto hidden md:flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full gradient-primary opacity-60" />
            <div className="w-2 h-2 rounded-full gradient-primary opacity-30" />
            <div className="w-2 h-2 rounded-full gradient-primary opacity-15" />
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </header>
  );
};

export default PortalHeader;
