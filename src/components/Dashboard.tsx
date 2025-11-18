import { useState, useEffect } from 'react';
import { DashboardHeader } from './DashboardHeader';
import { CalendarioAgendamentos } from './CalendarioAgendamentos';
import { ListaAgendamentos } from './ListaAgendamentos';
import { NovoAgendamentoModal } from './NovoAgendamentoModal';
import { ServicosModal } from './ServicosModal';
import { Agendamento, Servico } from '../App';

interface DashboardProps {
  adminNome: string;
  onLogout: () => void;
}

const servicosIniciais: Servico[] = [
  {
    id: '1',
    nome: 'Manicure Simples',
    duracao: 45,
    preco: 40,
    descricao: 'Esmaltação simples com design básico'
  },
  {
    id: '2',
    nome: 'Manicure Completa',
    duracao: 60,
    preco: 50,
    descricao: 'Cutilagem + esmaltação + hidratação'
  },
  {
    id: '3',
    nome: 'Pedicure Completa',
    duracao: 60,
    preco: 55,
    descricao: 'Tratamento completo dos pés'
  },
  {
    id: '4',
    nome: 'Unhas em Gel',
    duracao: 120,
    preco: 120,
    descricao: 'Aplicação de unhas em gel'
  },
  {
    id: '5',
    nome: 'Unhas em Fibra',
    duracao: 120,
    preco: 150,
    descricao: 'Alongamento com fibra de vidro'
  },
  {
    id: '6',
    nome: 'Alongamento',
    duracao: 150,
    preco: 180,
    descricao: 'Alongamento completo'
  },
  {
    id: '7',
    nome: 'Blindagem',
    duracao: 90,
    preco: 80,
    descricao: 'Tratamento de fortalecimento'
  },
  {
    id: '8',
    nome: 'Nail Art',
    duracao: 30,
    preco: 50,
    descricao: 'Design artístico personalizado'
  }
];

const agendamentosIniciais: Agendamento[] = [
  {
    id: '1',
    clienteNome: 'Maria Silva',
    clienteTelefone: '(11) 98765-4321',
    servico: 'Manicure Completa',
    data: new Date(2025, 10, 11, 10, 0),
    horario: '10:00',
    duracao: 60,
    preco: 50,
    formaPagamento: 'pix',
    status: 'confirmado',
    observacoes: 'Cliente prefere cores claras'
  },
  {
    id: '2',
    clienteNome: 'Ana Costa',
    clienteTelefone: '(11) 91234-5678',
    servico: 'Unhas em Gel',
    data: new Date(2025, 10, 11, 14, 0),
    horario: '14:00',
    duracao: 120,
    preco: 120,
    formaPagamento: 'cartao-credito',
    status: 'confirmado'
  },
  {
    id: '3',
    clienteNome: 'Julia Santos',
    clienteTelefone: '(11) 99876-5432',
    servico: 'Alongamento',
    data: new Date(2025, 10, 12, 15, 0),
    horario: '15:00',
    duracao: 150,
    preco: 180,
    formaPagamento: 'dinheiro',
    status: 'pendente'
  }
];

export function Dashboard({ adminNome, onLogout }: DashboardProps) {
  // Carregar servicos do localStorage ou usar valores iniciais
  const [servicos, setServicos] = useState<Servico[]>(() => {
    try {
      const servicosSalvos = localStorage.getItem('victoria-nails-servicos');
      return servicosSalvos ? JSON.parse(servicosSalvos) : servicosIniciais;
    } catch (error) {
      console.error('Erro ao carregar serviços:', error);
      return servicosIniciais;
    }
  });

  // Carregar agendamentos do localStorage ou usar valores iniciais
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(() => {
    try {
      const agendamentosSalvos = localStorage.getItem('victoria-nails-agendamentos');
      if (agendamentosSalvos) {
        const parsed = JSON.parse(agendamentosSalvos);
        // Converter strings de data de volta para objetos Date
        return parsed.map((ag: any) => ({
          ...ag,
          data: new Date(ag.data)
        }));
      }
      return agendamentosIniciais;
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error);
      return agendamentosIniciais;
    }
  });

  // Salvar servicos no localStorage sempre que mudarem
  useEffect(() => {
    try {
      localStorage.setItem('victoria-nails-servicos', JSON.stringify(servicos));
    } catch (error) {
      console.error('Erro ao salvar serviços:', error);
    }
  }, [servicos]);

  // Salvar agendamentos no localStorage sempre que mudarem
  useEffect(() => {
    try {
      localStorage.setItem('victoria-nails-agendamentos', JSON.stringify(agendamentos));
    } catch (error) {
      console.error('Erro ao salvar agendamentos:', error);
    }
  }, [agendamentos]);

  const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date());
  const [modalNovoAberto, setModalNovoAberto] = useState(false);
  const [modalServicosAberto, setModalServicosAberto] = useState(false);

  const adicionarAgendamento = (novoAgendamento: Omit<Agendamento, 'id'>) => {
    const agendamento: Agendamento = {
      ...novoAgendamento,
      id: Date.now().toString()
    };
    setAgendamentos([...agendamentos, agendamento]);
  };

  const atualizarAgendamento = (id: string, dados: Partial<Agendamento>) => {
    setAgendamentos(agendamentos.map(ag =>
      ag.id === id ? { ...ag, ...dados } : ag
    ));
  };

  const excluirAgendamento = (id: string) => {
    setAgendamentos(agendamentos.filter(ag => ag.id !== id));
  };

  const agendamentosDoDia = agendamentos.filter(ag => {
    const agData = new Date(ag.data);
    return agData.toDateString() === dataSelecionada.toDateString();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100">
      <DashboardHeader
        adminNome={adminNome}
        onLogout={onLogout}
        onNovoAgendamento={() => setModalNovoAberto(true)}
        onGerenciarServicos={() => setModalServicosAberto(true)}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CalendarioAgendamentos
              dataSelecionada={dataSelecionada}
              onDataSelecionada={setDataSelecionada}
              agendamentos={agendamentos}
            />
          </div>

          <div className="lg:col-span-2">
            <ListaAgendamentos
              agendamentos={agendamentosDoDia}
              dataSelecionada={dataSelecionada}
              onAtualizar={atualizarAgendamento}
              onExcluir={excluirAgendamento}
            />
          </div>
        </div>
      </div>

      <NovoAgendamentoModal
        aberto={modalNovoAberto}
        onAbertoChange={setModalNovoAberto}
        onSalvar={adicionarAgendamento}
        servicos={servicos}
      />

      <ServicosModal
        aberto={modalServicosAberto}
        onAbertoChange={setModalServicosAberto}
        servicos={servicos}
        onServicosChange={setServicos}
      />
    </div>
  );
}