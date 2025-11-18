import { Sparkles, LogOut, Plus, Settings } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardHeaderProps {
  adminNome: string;
  onLogout: () => void;
  onNovoAgendamento: () => void;
  onGerenciarServicos: () => void;
}

export function DashboardHeader({ 
  adminNome, 
  onLogout, 
  onNovoAgendamento,
  onGerenciarServicos 
}: DashboardHeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-pink-900">Nails Designer</h1>
              <p className="text-sm text-pink-700">Olá, {adminNome}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={onGerenciarServicos}
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Serviços
            </Button>
            
            <Button
              onClick={onNovoAgendamento}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Agendamento
            </Button>

            <Button
              onClick={onLogout}
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
