import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Agendamento, Servico } from '../App';

interface NovoAgendamentoModalProps {
  aberto: boolean;
  onAbertoChange: (aberto: boolean) => void;
  onSalvar: (agendamento: Omit<Agendamento, 'id'>) => void;
  servicos: Servico[];
}

const horarios = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
];

const formasPagamento = [
  { valor: 'dinheiro', label: 'Dinheiro' },
  { valor: 'pix', label: 'PIX' },
  { valor: 'cartao-debito', label: 'Cartão de Débito' },
  { valor: 'cartao-credito', label: 'Cartão de Crédito' }
];

export function NovoAgendamentoModal({
  aberto,
  onAbertoChange,
  onSalvar,
  servicos
}: NovoAgendamentoModalProps) {
  const [clienteNome, setClienteNome] = useState('');
  const [clienteTelefone, setClienteTelefone] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [formaPagamento, setFormaPagamento] = useState<'dinheiro' | 'pix' | 'cartao-debito' | 'cartao-credito'>('pix');
  const [observacoes, setObservacoes] = useState('');

  const handleSalvar = () => {
    if (!clienteNome || !clienteTelefone || !servicoId || !data || !horario) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const servico = servicos.find(s => s.id === servicoId);
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
      formaPagamento,
      status: 'pendente',
      observacoes: observacoes || undefined
    });

    // Limpar formulário
    setClienteNome('');
    setClienteTelefone('');
    setServicoId('');
    setData('');
    setHorario('');
    setFormaPagamento('pix');
    setObservacoes('');
    onAbertoChange(false);
  };

  const servicoSelecionado = servicos.find(s => s.id === servicoId);

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="sm:max-w-[550px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-pink-900">Novo Agendamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Cliente *</Label>
            <Input
              id="nome"
              placeholder="Digite o nome completo"
              value={clienteNome}
              onChange={(e) => setClienteNome(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone *</Label>
            <Input
              id="telefone"
              placeholder="(11) 98765-4321"
              value={clienteTelefone}
              onChange={(e) => setClienteTelefone(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="servico">Serviço *</Label>
            <Select value={servicoId} onValueChange={setServicoId}>
              <SelectTrigger id="servico">
                <SelectValue placeholder="Selecione um serviço" />
              </SelectTrigger>
              <SelectContent>
                {servicos.map((servico) => (
                  <SelectItem key={servico.id} value={servico.id}>
                    {servico.nome} - R$ {servico.preco.toFixed(2)} ({servico.duracao} min)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {servicoSelecionado && (
              <p className="text-xs text-pink-600">{servicoSelecionado.descricao}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="data">Data *</Label>
              <Input
                id="data"
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horario">Horário *</Label>
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

          <div className="space-y-2">
            <Label htmlFor="pagamento">Forma de Pagamento *</Label>
            <Select 
              value={formaPagamento} 
              onValueChange={(value) => setFormaPagamento(value as any)}
            >
              <SelectTrigger id="pagamento">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {formasPagamento.map((forma) => (
                  <SelectItem key={forma.valor} value={forma.valor}>
                    {forma.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              placeholder="Preferências de cor, alergias, etc..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              rows={3}
            />
          </div>

          {servicoSelecionado && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="text-sm text-purple-900 mb-2">Resumo do Agendamento</h4>
              <div className="space-y-1 text-sm text-purple-700">
                <p><span className="font-medium">Serviço:</span> {servicoSelecionado.nome}</p>
                <p><span className="font-medium">Duração:</span> {servicoSelecionado.duracao} minutos</p>
                <p><span className="font-medium">Valor:</span> R$ {servicoSelecionado.preco.toFixed(2)}</p>
              </div>
            </div>
          )}
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
