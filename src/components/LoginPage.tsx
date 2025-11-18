import { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import logoImage from 'figma:asset/d7b70b5942bcf5f2738cbc62346042e0dbcfa8a0.png';

interface LoginPageProps {
  onLogin: (nome: string) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    // Validação simples (em produção, usar autenticação real)
    if (usuario === 'Victoria' && senha === 'Victoria10') {
      onLogin('Victoria Freitas');
    } else {
      setErro('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/50 via-white to-pink-100/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-200/30 via-transparent to-transparent" />
      
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl shadow-2xl border border-purple-200/50 relative z-10">
        <div className="p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="mb-6 bg-black rounded-2xl p-6">
              <img 
                src={logoImage} 
                alt="Studio Victoria Freitas - Nails Designer" 
                className="w-full h-auto max-w-sm mx-auto"
              />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent mb-6" />
            <p className="text-purple-600 tracking-wider">Sistema de Agendamentos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="usuario" className="text-purple-900">
                Usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                <Input
                  id="usuario"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="pl-10 bg-purple-50/50 border-purple-200 text-purple-900 placeholder:text-purple-400 focus:border-purple-500 focus:ring-purple-500/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha" className="text-purple-900">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-500" />
                <Input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="pl-10 bg-purple-50/50 border-purple-200 text-purple-900 placeholder:text-purple-400 focus:border-purple-500 focus:ring-purple-500/20"
                  required
                />
              </div>
            </div>

            {erro && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {erro}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30 h-12 transition-all duration-300 hover:shadow-purple-600/40"
            >
              Entrar no Sistema
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}