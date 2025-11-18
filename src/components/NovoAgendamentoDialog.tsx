import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Agendamento } from '../App';

interface NovoAgendamentoDialogProps {
  aberto: boolean;
  onAbertoChange: (aberto: boolean) => void;
  onSalvar: (agendamento: Omit<Agendamento, 'id'>) => void;
}

const servicos = [
  { nome: 'Manicure Simples', duracao: 45, preco: 40 },
  { nome: 'Manicure Completa', duracao: 60, preco: 50 },
  { nome: 'Pedicure Simples', duracao: 45, preco: 45 },
  { nome: 'Pedicure Completa', duracao: 60, preco: 55 },
  { nome: 'Pedicure + Manicure', duracao: 90, preco: 80 },
  { nome: 'Unhas em Gel', duracao: 120, preco: 120 },
  { nome: 'Unhas em Fibra', duracao: 120, preco: 150 },
  { nome: 'Alongamento', duracao: 150, preco: 180 },
  { nome: 'Spa dos Pés', duracao: 90, preco: 100 },
];

const horarios = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
];

export function NovoAgendamentoDialog({ aberto, onAbertoChange, onSalvar }: NovoAgendamentoDialogProps) {
  const [clienteNome, setClienteNome] = useState('');
  const [clienteTelefone, setClienteTelefone] = useState('');
  const [servicoSelecionado, setServicoSelecionado] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');

  const handleSalvar = () => {
    if (!clienteNome || !clienteTelefone || !servicoSelecionado || !data || !horario) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    const servico = servicos.find(s => s.nome === servicoSelecionado);
    if (!servico) return;

    const [ano, mes, dia] = data.split('-').map(Number);
    const [hora, minuto] = horario.split(':').map(Number);
    const dataAgendamento = new Date(ano, mes - 1, dia, hora, minuto);

    onSalvar({
      clienteNome,
      clienteTelefone,
      servico: servico.nome,
      data: dataAgendamento,
      horario,
      duracao: servico.duracao,
      preco: servico.preco,
      status: 'pendente'
    });

    // Limpar formulário
    setClienteNome('');
    setClienteTelefone('');
    setServicoSelecionado('');
    setData('');
    setHorario('');
    onAbertoChange(false);
  };

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-pink-900">Novo Agendamento</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Cliente</Label>
            <Input
              id="nome"
              placeholder="Digite o nome"
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              placeholder="(11) 98765-4321"
              value={clienteTelefone}
              onChange={(e) => setClienteTelefone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="servico">Serviço</Label>
            <Select value={servicoSelecionado} onValueChange={setServicoSelecionado}>
              <SelectTrigger id="servico">
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {servicos.map((servico) => (
                  <SelectItem key={servico.nome} value={servico.nome}>
                    {servico.nome} - R$ {servico.preco} ({servico.duracao} min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input
                id="data"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horario">Horário</Label>
              <Select value={horario} onValueChange={setHorario}>
                <SelectTrigger id="horario">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {horarios.map((h) => (
                    <SelectItem key={h} value={h}>
                      {h}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button 
            variant="outline" 
            onClick={() => onAbertoChange(false)}
            className="border-pink-200 text-pink-700 hover:bg-pink-50"
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSalvar}
            className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
          >
            Salvar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
