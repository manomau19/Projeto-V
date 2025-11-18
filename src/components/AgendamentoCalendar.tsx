import { Calendar } from './ui/calendar';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Agendamento } from '../App';

interface AgendamentoCalendarProps {
  dataSelecionada: Date;
  onDataSelecionada: (data: Date) => void;
  agendamentos: Agendamento[];
}

export function AgendamentoCalendar({ 
  dataSelecionada, 
  onDataSelecionada,
  agendamentos 
}: AgendamentoCalendarProps) {
  const diasComAgendamentos = agendamentos.reduce((acc, ag) => {
    const dataStr = new Date(ag.data).toDateString();
    acc[dataStr] = (acc[dataStr] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalHoje = agendamentos.filter(ag => {
    const agData = new Date(ag.data);
    return agData.toDateString() === dataSelecionada.toDateString();
  }).length;

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-xl border-pink-100">
      <div className="mb-4">
        <h2 className="text-pink-900 mb-2">Calendário</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-pink-100 text-pink-700">
            {totalHoje} agendamento{totalHoje !== 1 ? 's' : ''} hoje
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
      
      <div className="mt-4 pt-4 border-t border-pink-100">
        <div className="text-sm text-pink-700">
          <p>Total de agendamentos: {agendamentos.length}</p>
        </div>
      </div>
    </Card>
  );
}
