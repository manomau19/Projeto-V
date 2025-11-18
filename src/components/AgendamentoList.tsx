import { Clock, Phone, DollarSign, X } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Agendamento } from '../App';

interface AgendamentoListProps {
  agendamentos: Agendamento[];
  dataSelecionada: Date;
  onCancelar: (id: string) => void;
}

export function AgendamentoList({ agendamentos, dataSelecionada, onCancelar }: AgendamentoListProps) {
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
        return 'bg-green-100 text-green-700';
      case 'pendente':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelado':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
    return a.horario.localeCompare(b.horario);
  });

  return (
    <div className="space-y-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-100">
        <h2 className="text-pink-900 mb-1">Agendamentos</h2>
        <p className="text-sm text-pink-700 mb-4">{formatarData(dataSelecionada)}</p>
        
        {agendamentosOrdenados.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-pink-400" />
            </div>
            <p className="text-pink-700">Nenhum agendamento para este dia</p>
          </div>
        ) : (
          <div className="space-y-3">
            {agendamentosOrdenados.map((agendamento) => (
              <Card 
                key={agendamento.id} 
                className="p-4 hover:shadow-lg transition-shadow bg-gradient-to-r from-white to-pink-50 border-pink-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-pink-900">{agendamento.clienteNome}</h3>
                      <Badge className={getStatusColor(agendamento.status)}>
                        {agendamento.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-1 text-sm text-pink-700">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{agendamento.horario} - {agendamento.duracao} min</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{agendamento.clienteTelefone}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        <span>R$ {agendamento.preco.toFixed(2)} - {agendamento.servico}</span>
                      </div>
                    </div>
                  </div>
                  
                  {agendamento.status !== 'cancelado' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCancelar(agendamento.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
