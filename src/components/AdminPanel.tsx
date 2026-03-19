import { useState } from 'react';
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

const TYPE_OPTIONS = ['BI', 'App', 'Outro'];

const AdminPanel = ({ onSaved }: { onSaved: () => void }) => {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [tipo, setTipo] = useState('BI');
  const [saving, setSaving] = useState(false);

  const handleAddClick = () => {
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
      category: tipo,
      icon: 'LayoutDashboard',
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
        <Button onClick={handleAddClick} size="icon" className="h-14 w-14 rounded-full shadow-lg text-lg">
          <Plus className="h-7 w-7" />
        </Button>
      </div>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Acesso Admin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Senha</Label>
              <Input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePasswordSubmit()}
                placeholder="Digite a senha..."
                className="mt-1"
              />
            </div>
            <Button onClick={handlePasswordSubmit} className="w-full">
              Entrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Novo Dashboard</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Nome do Dashboard</Label>
              <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Ex: Vendas Mensal"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Link</Label>
              <Input
                value={link}
                onChange={e => setLink(e.target.value)}
                placeholder="https://app.powerbi.com/..."
                className="mt-1"
              />
            </div>
            <div>
              <Label>Tipo</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPE_OPTIONS.map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
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
