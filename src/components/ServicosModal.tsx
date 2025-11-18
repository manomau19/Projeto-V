import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Textarea } from './ui/textarea';
import { Servico } from '../App';
import { Plus, Trash2, Edit, DollarSign, Clock } from 'lucide-react';

interface ServicosModalProps {
  aberto: boolean;
  onAbertoChange: (aberto: boolean) => void;
  servicos: Servico[];
  onServicosChange: (servicos: Servico[]) => void;
}

export function ServicosModal({
  aberto,
  onAbertoChange,
  servicos,
  onServicosChange
}: ServicosModalProps) {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [servicoEditando, setServicoEditando] = useState<Servico | null>(null);
  const [nome, setNome] = useState('');
  const [duracao, setDuracao] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  const iniciarNovoServico = () => {
    setModoEdicao(true);
    setServicoEditando(null);
    setNome('');
    setDuracao('');
    setPreco('');
    setDescricao('');
  };

  const iniciarEdicao = (servico: Servico) => {
    setModoEdicao(true);
    setServicoEditando(servico);
    setNome(servico.nome);
    setDuracao(servico.duracao.toString());
    setPreco(servico.preco.toString());
    setDescricao(servico.descricao);
  };

  const cancelarEdicao = () => {
    setModoEdicao(false);
    setServicoEditando(null);
    setNome('');
    setDuracao('');
    setPreco('');
    setDescricao('');
  };

  const salvarServico = () => {
    if (!nome || !duracao || !preco) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const duracaoNum = parseInt(duracao);
    const precoNum = parseFloat(preco);

    if (isNaN(duracaoNum) || isNaN(precoNum)) {
      alert('Duração e preço devem ser números válidos');
      return;
    }

    if (servicoEditando) {
      // Editar serviço existente
      onServicosChange(
        servicos.map(s =>
          s.id === servicoEditando.id
            ? { ...s, nome, duracao: duracaoNum, preco: precoNum, descricao }
            : s
        )
      );
    } else {
      // Adicionar novo serviço
      const novoServico: Servico = {
        id: Date.now().toString(),
        nome,
        duracao: duracaoNum,
        preco: precoNum,
        descricao
      };
      onServicosChange([...servicos, novoServico]);
    }

    cancelarEdicao();
  };

  const excluirServico = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      onServicosChange(servicos.filter(s => s.id !== id));
    }
  };

  return (
    <Dialog open={aberto} onOpenChange={onAbertoChange}>
      <DialogContent className="sm:max-w-[700px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-pink-900">Gerenciar Serviços</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {!modoEdicao ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-pink-700">
                  {servicos.length} serviço{servicos.length !== 1 ? 's' : ''} cadastrado{servicos.length !== 1 ? 's' : ''}
                </p>
                <Button
                  onClick={iniciarNovoServico}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Serviço
                </Button>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {servicos.map((servico) => (
                  <Card
                    key={servico.id}
                    className="p-4 bg-gradient-to-r from-white to-pink-50 border-pink-100"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-pink-900 mb-2">{servico.nome}</h3>
                        <p className="text-sm text-pink-600 mb-3">{servico.descricao}</p>
                        <div className="flex items-center gap-4 text-sm text-pink-700">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{servico.duracao} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span>R$ {servico.preco.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => iniciarEdicao(servico)}
                          className="border-purple-200 text-purple-700 hover:bg-purple-50"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => excluirServico(servico.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}

                {servicos.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-pink-700">Nenhum serviço cadastrado</p>
                    <p className="text-sm text-pink-600 mt-2">
                      Clique em "Novo Serviço" para adicionar
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <h3 className="text-pink-900">
                {servicoEditando ? 'Editar Serviço' : 'Novo Serviço'}
              </h3>

              <div className="space-y-2">
                <Label htmlFor="servico-nome">Nome do Serviço *</Label>
                <Input
                  id="servico-nome"
                  placeholder="Ex: Manicure Completa"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servico-duracao">Duração (minutos) *</Label>
                  <Input
                    id="servico-duracao"
                    type="number"
                    placeholder="60"
                    value={duracao}
                    onChange={(e) => setDuracao(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servico-preco">Preço (R$) *</Label>
                  <Input
                    id="servico-preco"
                    type="number"
                    step="0.01"
                    placeholder="50.00"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="servico-descricao">Descrição</Label>
                <Textarea
                  id="servico-descricao"
                  placeholder="Descreva o que está incluso no serviço..."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-pink-100">
                <Button
                  variant="outline"
                  onClick={cancelarEdicao}
                  className="border-pink-200 text-pink-700 hover:bg-pink-50"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={salvarServico}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
                >
                  Salvar
                </Button>
              </div>
            </div>
          )}
        </div>

        {!modoEdicao && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => onAbertoChange(false)}
              className="border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              Fechar
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
