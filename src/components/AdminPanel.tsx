import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
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
const SESSION_KEY = 'admin_authenticated';
const TYPE_OPTIONS = ['BI', 'App', 'Outro'];

interface AdminPanelProps {
  onSaved: () => void;
  onAdminChange?: (isAdmin: boolean) => void;
}

const AdminPanel = ({ onSaved, onAdminChange }: AdminPanelProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tipo, setTipo] = useState('BI');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setIsAdmin(true);
      onAdminChange?.(true);
    }
  }, []);

  const handleAddClick = () => {
    if (isAdmin) {
      setShowAdminDialog(true);
    } else {
      setShowPasswordDialog(true);
      setPassword('');
    }
  };

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAdmin(true);
      onAdminChange?.(true);
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
      category: tipo,
      icon: 'BarChart3',
    });
    setSaving(false);
    if (error) {
      toast.error('Erro ao salvar: ' + error.message);
    } else {
      toast.success('Dashboard salvo com sucesso!');
      setTitle('');
      setLink('');
      setTipo('BI');
      setShowAdminDialog(false);
      onSaved();
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleAddClick}
          className="flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary shadow-fab text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Plus className="h-7 w-7" />
        </button>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-sm rounded-2xl border-border">
          <DialogHeader>
            <DialogTitle className="text-lg">Acesso Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-sm font-medium">Senha</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Digite a senha..."
                className="mt-1.5 rounded-xl"
              />
            </div>
            <Button onClick={handlePasswordSubmit} className="w-full rounded-xl gradient-primary border-0 shadow-sm hover:shadow-md transition-all">
              Entrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="sm:max-w-md rounded-2xl border-border">
          <DialogHeader>
            <DialogTitle className="text-lg">Novo Dashboard</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label className="text-sm font-medium">Nome do Dashboard</Label>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Vendas Mensal"
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Link</Label>
              <Input
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="https://app.powerbi.com/..."
                className="mt-1.5 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger className="mt-1.5 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSave} disabled={saving} className="w-full rounded-xl gradient-primary border-0 shadow-sm hover:shadow-md transition-all">
              {saving ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminPanel;
