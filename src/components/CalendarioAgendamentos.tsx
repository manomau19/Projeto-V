import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Agendamento } from '../App';
import { CalendarDays, TrendingUp } from 'lucide-react';

interface CalendarioAgendamentosProps {
  dataSelecionada: Date;
  onDataSelecionada: (data: Date) => void;
  agendamentos: Agendamento[];
}

export function CalendarioAgendamentos({
  dataSelecionada,
  onDataSelecionada,
  agendamentos
}: CalendarioAgendamentosProps) {
  const diasComAgendamentos = agendamentos.reduce((acc, ag) => {
    const dataStr = new Date(ag.data).toDateString();
    acc[dataStr] = (acc[dataStr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const agendamentosHoje = agendamentos.filter(ag => {
    const agData = new Date(ag.data);
    return agData.toDateString() === dataSelecionada.toDateString();
  });

  const faturamentoHoje = agendamentosHoje
    .filter(ag => ag.status !== 'cancelado')
    .reduce((total, ag) => total + ag.preco, 0);

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-pink-100">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="w-5 h-5 text-pink-600" />
          <h2 className="text-pink-900">Calendário</h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Badge variant="secondary" className="bg-pink-100 text-pink-700 justify-center py-2">
            {agendamentosHoje.length} agendamento{agendamentosHoje.length !== 1 ? 's' : ''}
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-700 justify-center py-2">
            <TrendingUp className="w-3 h-3 mr-1" />
            R$ {faturamentoHoje.toFixed(2)}
          </Badge>
        </div>
      </div>

      <Calendar
        mode="single"
        selected={dataSelecionada}
        onSelect={(date) => date && onDataSelecionada(date)}
        className="rounded-md border-0"
        modifiers={{
          booked: (date) => {
            const dataStr = date.toDateString();
            return !!diasComAgendamentos[dataStr];
          }
        }}
        modifiersStyles={{
          booked: {
            fontWeight: 'bold',
            textDecoration: 'underline',
            color: '#ec4899'
          }
        }}
      />

      <div className="mt-4 pt-4 border-t border-pink-100 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-pink-700">Total de agendamentos:</span>
          <span className="text-pink-900">{agendamentos.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pink-700">Confirmados:</span>
          <span className="text-green-700">
            {agendamentos.filter(ag => ag.status === 'confirmado').length}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-pink-700">Pendentes:</span>
          <span className="text-yellow-700">
            {agendamentos.filter(ag => ag.status === 'pendente').length}
          </span>
        </div>
      </div>
    </Card>
  );
}
