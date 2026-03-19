import { useState } from 'react';
import { Settings } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ADMIN_PASSWORD = 'admin123';

const CATEGORIES = ['Financeiro', 'Operações', 'Comercial', 'RH', 'TI', 'Geral'];

const ICON_OPTIONS = [
  'BarChart3', 'PieChart', 'TrendingUp', 'DollarSign', 'Users', 'ShoppingCart',
  'Activity', 'Target', 'Briefcase', 'LineChart', 'Layers', 'Database',
];

const AdminPanel = ({ onSaved }: { onSaved: () => void }) => {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [category, setCategory] = useState('Geral');
  const [icon, setIcon] = useState('BarChart3');
  const [saving, setSaving] = useState(false);

  const handleGearClick = () => {
    setShowPasswordDialog(true);
    setPassword('');
  };

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setShowPasswordDialog(false);
      setShowAdminDialog(true);
    } else {
      toast.error('Senha incorreta.');
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !link.trim()) {
      toast.error('Preencha título e link.');
      return;
    }
    setSaving(true);
    const { error } = await supabase.from('dashboards').insert({
      title: title.trim(),
      link: link.trim(),
      category,
      icon,
    });
    setSaving(false);
    if (error) {
      toast.error('Erro ao salvar: ' + error.message);
    } else {
      toast.success('Dashboard salvo com sucesso!');
      setTitle('');
      setLink('');
      setCategory('Geral');
      setIcon('BarChart3');
      setShowAdminDialog(false);
      onSaved();
    }
  };

  return (
    <>
      <footer className="flex justify-center py-8">
        <button onClick={handleGearClick} className="transition-opacity hover:opacity-30">
          <Settings className="h-5 w-5 text-foreground opacity-[0.1]" />
        </button>
      </footer>

      {/* Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="glass-card border-border sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">Acesso Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-muted-foreground">Senha</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Digite a senha..."
                className="mt-1 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <Button onClick={handlePasswordSubmit} className="w-full">
              Entrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Form Dialog */}
      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="glass-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-foreground">Novo Dashboard</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-muted-foreground">Título</Label>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Vendas Mensal"
                className="mt-1 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label className="text-muted-foreground">Link do BI</Label>
              <Input
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="https://app.powerbi.com/..."
                className="mt-1 border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div>
              <Label className="text-muted-foreground">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1 border-border bg-secondary text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover">
                  {CATEGORIES.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-muted-foreground">Ícone</Label>
              <Select value={icon} onValueChange={setIcon}>
                <SelectTrigger className="mt-1 border-border bg-secondary text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-border bg-popover">
                  {ICON_OPTIONS.map(i => (
                    <SelectItem key={i} value={i}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full">
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPanel;
