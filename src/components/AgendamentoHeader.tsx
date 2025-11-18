import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface AgendamentoHeaderProps {
  onNovoAgendamento: () => void;
}

export function AgendamentoHeader({ onNovoAgendamento }: AgendamentoHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-pink-900">Agendamentos de Unhas</h1>
              <p className="text-sm text-pink-700">Gerencie seus horários</p>
            </div>
          </div>
          
          <Button 
            onClick={onNovoAgendamento}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
          >
            Novo Agendamento
          </Button>
        </div>
      </div>
    </header>
  );
}
