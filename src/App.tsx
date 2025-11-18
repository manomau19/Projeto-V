import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Dashboard } from './components/Dashboard';

export interface Agendamento {
  id: string;
  clienteNome: string;
  clienteTelefone: string;
  servico: string;
  data: Date;
  horario: string;
  duracao: number;
  preco: number;
  formaPagamento: 'dinheiro' | 'pix' | 'cartao-debito' | 'cartao-credito';
  status: 'confirmado' | 'pendente' | 'concluido' | 'cancelado';
  observacoes?: string;
}

export interface Servico {
  id: string;
  nome: string;
  duracao: number;
  preco: number;
  descricao: string;
}

export default function App() {
  const [estaLogado, setEstaLogado] = useState(false);
  const [adminNome, setAdminNome] = useState('');

  const handleLogin = (nome: string) => {
    setAdminNome(nome);
    setEstaLogado(true);
  };

  const handleLogout = () => {
    setEstaLogado(false);
    setAdminNome('');
  };

  if (!estaLogado) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return <Dashboard adminNome={adminNome} onLogout={handleLogout} />;
}
