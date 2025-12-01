import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music2, AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft, IdCard, Key } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login: loginAuth } = useAuth();

  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  const noticeTimer = useRef<number | null>(null);
  useEffect(() => () => { if (noticeTimer.current) window.clearTimeout(noticeTimer.current); }, []);

  const showNotice = (msg: string, ms = 1600) => {
    setNotice(msg);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current!);
    // @ts-ignore
    noticeTimer.current = window.setTimeout(() => setNotice(''), ms);
  };

  const clearError = () => setError('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedula.trim() || !password.trim()) {
      setError('Completa cédula y contraseña');
      return;
    }
    setLoading(true);
    console.log('Login button clicked');
    try {
      // role/professorId not needed for backend login; they are ignored in context
      await loginAuth(cedula, password, 'estudiante');
      console.log('Login successful, navigating...');
      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Credenciales inválidas');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg, #5d0067, rgb(242, 238, 255))' }}>
      <div className="w-full max-w-4xl">
        <div className="mb-4">
          <button type="button" onClick={() => navigate('/')} className="btn-hero-contrast inline-flex items-center px-3 py-1.5 rounded-full text-sm">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Volver al inicio
          </button>
        </div>
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full shadow-xl ring-1 ring-white/10" style={{background: '#fff8e2'}}>
            <Music2 className="w-10 h-10 text-[#5d0067]" />
          </div>
        </div>

        <Card className="overflow-hidden rounded-3xl shadow-card border-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 border-0 rounded-l-2xl" style={{ background: '#f6f3ff' }}>
              <CardHeader className="p-0 mb-4">
                <CardTitle className="brand-title">Iniciar sesión</CardTitle>
                <CardDescription className="brand-paragraph">Introduce tus credenciales para acceder.</CardDescription>
              </CardHeader>

              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-4" aria-busy={loading} aria-live="polite">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="mr-2" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <Label htmlFor="cedula">Cédula</Label>
                    <div className="relative mt-1">
                      <Input id="cedula" value={cedula} onChange={e => setCedula(e.target.value)} placeholder="Cédula" className="pl-10 shadow-input" />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><IdCard className="w-4 h-4" /></div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative mt-1">
                      <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" disabled={loading} className="pl-10 pr-10 shadow-input" />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Key className="w-4 h-4" /></div>
                      <button type="button" aria-label="Mostrar contraseña" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword(s => !s)}>
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-500">¿No tienes cuenta? <Link to="/registro/estudiante" className="text-primary underline">Regístrate</Link></div>
                    <Button type="submit" disabled={loading} className="flex items-center btn-brand-gradient px-4 py-2 rounded-full shadow-glow">
                      <span className="font-medium">{loading ? 'Ingresando...' : 'Ingresar'}</span>
                      <ArrowRight className="ml-3 w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </div>
            <div className="hidden md:flex flex-col justify-center p-8 border-0" style={{background: 'linear-gradient(135deg, #5d0067, #4b1669)'}}>
              <h3 className="brand-subtitle mb-2 text-white">Bienvenido al Conservatorio</h3>
              <p className="text-white">Accede a tus clases, horarios y material pedagógico. Si necesitas ayuda, contacta con administración.</p>
            </div>
          </div>
        </Card>

        

        {notice && <div role="status" aria-live="polite" className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 px-4 py-2 rounded-full shadow-md">{notice}</div>}

        {/* Loading overlay */}
        {loading && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30">
            <div className="rounded-lg bg-white/90 p-6 flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-4 border-t-[#5d0067] border-gray-200 animate-spin" />
              <div className="text-sm font-medium">Ingresando...</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
