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

const AdminPanel = ({ onSaved }: { onSaved: () => void }) => {
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

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('dashboards').delete().eq('id', id);
    if (error) {
      toast.error('Erro ao excluir: ' + error.message);
    } else {
      toast.success('Dashboard excluído!');
      onSaved();
    }
  };

  return { isAdmin, handleAddClick, handleDelete, handlePasswordSubmit, handleSave, showPasswordDialog, setShowPasswordDialog, showAdminDialog, setShowAdminDialog, password, setPassword, title, setTitle, link, setLink, tipo, setTipo, saving };
};

export const AdminPanelUI = ({ onSaved }: { onSaved: () => void }) => {
  const admin = AdminPanel({ onSaved });

  return { ...admin };
};

export default AdminPanel;
