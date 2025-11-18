import { Clock, Phone, DollarSign, CreditCard, Trash2, Check, X as XIcon } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Agendamento } from '../App';

interface ListaAgendamentosProps {
  agendamentos: Agendamento[];
  dataSelecionada: Date;
  onAtualizar: (id: string, dados: Partial<Agendamento>) => void;
  onExcluir: (id: string) => void;
}

export function ListaAgendamentos({
  agendamentos,
  dataSelecionada,
  onAtualizar,
  onExcluir
}: ListaAgendamentosProps) {
  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(data);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'concluido':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelado':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPagamentoIcon = (formaPagamento: string) => {
    return <CreditCard className="w-4 h-4" />;
  };

  const getPagamentoLabel = (formaPagamento: string) => {
    const labels: Record<string, string> = {
      'dinheiro': 'Dinheiro',
      'pix': 'PIX',
      'cartao-debito': 'Cartão Débito',
      'cartao-credito': 'Cartão Crédito'
    };
    return labels[formaPagamento] || formaPagamento;
  };

  const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
    return a.horario.localeCompare(b.horario);
  });

  const handleConfirmar = (id: string) => {
    onAtualizar(id, { status: 'confirmado' });
  };

  const handleConcluir = (id: string) => {
    onAtualizar(id, { status: 'concluido' });
  };

  const handleCancelar = (id: string) => {
    if (confirm('Tem certeza que deseja cancelar este agendamento?')) {
      onAtualizar(id, { status: 'cancelado' });
    }
  };

  const handleExcluir = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este agendamento permanentemente?')) {
      onExcluir(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
        <div className="mb-4">
          <h2 className="text-pink-900 mb-1">Agendamentos do Dia</h2>
          <p className="text-sm text-pink-700">{formatarData(dataSelecionada)}</p>
        </div>

        {agendamentosOrdenados.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-pink-700">Nenhum agendamento para este dia</p>
            <p className="text-sm text-pink-600 mt-2">Clique em "Novo Agendamento" para adicionar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agendamentosOrdenados.map((agendamento) => (
              <Card
                key={agendamento.id}
                className="p-4 hover:shadow-lg transition-all bg-gradient-to-r from-white to-pink-50 border-pink-100"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-pink-900">{agendamento.clienteNome}</h3>
                        <Badge className={getStatusColor(agendamento.status)}>
                          {agendamento.status}
                        </Badge>
                      </div>

                      <div className="space-y-1.5 text-sm text-pink-700">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{agendamento.horario} - {agendamento.duracao} minutos</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{agendamento.clienteTelefone}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 flex-shrink-0" />
                          <span>R$ {agendamento.preco.toFixed(2)} - {agendamento.servico}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {getPagamentoIcon(agendamento.formaPagamento)}
                          <span>{getPagamentoLabel(agendamento.formaPagamento)}</span>
                        </div>

                        {agendamento.observacoes && (
                          <div className="mt-2 p-2 bg-purple-50 rounded-lg border border-purple-100">
                            <p className="text-xs text-purple-700">
                              <span className="font-medium">Obs:</span> {agendamento.observacoes}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-pink-100">
                    {agendamento.status === 'pendente' && (
                      <Button
                        size="sm"
                        onClick={() => handleConfirmar(agendamento.id)}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Confirmar
                      </Button>
                    )}

                    {agendamento.status === 'confirmado' && (
                      <Button
                        size="sm"
                        onClick={() => handleConcluir(agendamento.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Concluir
                      </Button>
                    )}

                    {agendamento.status !== 'cancelado' && agendamento.status !== 'concluido' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCancelar(agendamento.id)}
                        className="border-orange-200 text-orange-700 hover:bg-orange-50"
                      >
                        <XIcon className="w-4 h-4 mr-1" />
                        Cancelar
                      </Button>
                    )}

                    <div className="flex-1" />

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleExcluir(agendamento.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
