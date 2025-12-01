import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music2, AlertCircle, Eye, EyeOff, ArrowRight, ArrowLeft, IdCard, Key } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Candidate = { id: string; name: string; role: string; professorId?: string };

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [professorId, setProfessorId] = useState('');
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

  const findCandidates = () => {
    clearError();
    const stored = localStorage.getItem('conservatorio_users');
    let users: any[] = [];
    if (stored) {
      try {
        users = JSON.parse(stored);
      } catch (e) {
        const demo = [
          { id: '1', name: 'Profesor Álvarez', email: 'prof.alvarez@conservatorio.local', role: 'profesor', cedula: '123456', password: 'secret', professorId: 'PROF-001' },
          { id: '2', name: 'Estudiante Demo', email: 'est.demo@conservatorio.local', role: 'estudiante', cedula: '654321', password: 'secret' }
        ];
        try {
          localStorage.setItem('conservatorio_users', JSON.stringify(demo));
          users = demo;
          showNotice('Datos de usuarios reparados (demo) — usa 123456/secret o 654321/secret');
        } catch (e2) {
          setError('Error interno: no se pudo reparar datos de usuarios.');
          return [];
        }
      }
    }
    const matches = users.filter((u: any) => u.cedula === cedula && u.password === password);
    if (matches.length === 0) { setError('Credenciales inválidas'); return []; }
    const mapped = matches.map((u: any) => ({ id: u.id, name: u.name, role: u.role, professorId: u.professorId }));
    setCandidates(mapped);
    return mapped;
  };

  const handleInitialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cedula.trim() || !password.trim()) {
      setError('Completa cédula y contraseña');
      return;
    }
  const found = findCandidates();
    // If the user is registered both as estudiante and profesor, show role selection screen
    const hasStudent = found.some(f => f.role === 'estudiante');
    const hasProfesor = found.some(f => f.role === 'profesor');
    if (hasStudent && hasProfesor) {
      // Pass credentials along so the RoleSelection screen can complete the login
      navigate('/role-selection', { state: { candidates: found, cedula, password } });
      return;
    }
    if (found.length === 1) {
      const only = found[0];
      // If the found user is a professor or admin, restore inline flow: set selected role
      // and, if professorId exists, proceed immediately; otherwise show professorId input.
      if (only.role === 'profesor' || only.role === 'admin') {
        setSelectedRole(only.role);
        setProfessorId(only.professorId || '');
        // if we already have a stored professorId, proceed immediately
        if (only.professorId) {
          proceedLogin(only.role);
          return;
        }
        // keep candidate stored for later (will show professorId input)
        setCandidates([only]);
        return;
      }

      // default: single non-ambiguous role -> proceed
      proceedLogin(only.role);
    }
  };

  

  const proceedLogin = async (role: string) => {
    clearError();
    setLoading(true);
    showNotice('Ingresando...');
    try {
      // @ts-ignore
      await login(cedula, password, role as any, professorId || undefined);
      // Redirect by role: estudiantes → student dashboard, profesores → teacher dashboard
      if (role === 'estudiante') {
        navigate('/student/dashboard');
      } else if (role === 'profesor') {
        navigate('/teacher/dashboard');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err?.message || String(err));
      console.error('Login error', err);
    } finally {
      setLoading(false);
    }
=======
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
>>>>>>> origin/master
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
                <form onSubmit={handleInitialSubmit} className="space-y-4" aria-busy={loading} aria-live="polite">
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
                  {candidates.length > 1 && (
                    <div>
                      <Label>Selecciona tu rol</Label>
                      <div className="flex gap-2 mt-2">
                        {candidates.map(c => (
                          <Button key={c.id} type="button" onClick={() => setSelectedRole(c.role)} disabled={loading}>{c.name} — {c.role}</Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {(selectedRole && (selectedRole === 'profesor' || selectedRole === 'admin')) && (
                    <div>
                      <Label htmlFor="profesorId">ID Profesor (si corresponde)</Label>
                      <Input id="profesorId" value={professorId} onChange={e => setProfessorId(e.target.value)} placeholder="ID Profesor" className="mt-1 shadow-input" disabled={loading} />
                      <div className="flex justify-end mt-3">
                        <Button onClick={() => proceedLogin(selectedRole as string)} disabled={loading} className="flex items-center btn-brand-gradient px-4 py-2 rounded-full shadow-glow">
                          <span className="font-medium">{loading ? 'Ingresando...' : 'Ingresar'}</span>
                          <ArrowRight className="ml-3 w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {(!selectedRole && candidates.length <= 1) && (
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-slate-500">¿No tienes cuenta? <Link to="/registro/estudiante" className="text-primary underline">Regístrate</Link></div>
                        <Button type="submit" disabled={loading} className="flex items-center btn-brand-gradient px-4 py-2 rounded-full shadow-glow">
                          <span className="font-medium">{loading ? 'Ingresando...' : 'Ingresar'}</span>
                          <ArrowRight className="ml-3 w-4 h-4" />
                        </Button>
                    </div>
                  )}
=======
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-500">¿No tienes cuenta? <Link to="/registro/estudiante" className="text-primary underline">Regístrate</Link></div>
                    <Button type="submit" disabled={loading} className="flex items-center btn-brand-gradient px-4 py-2 rounded-full shadow-glow">
                      <span className="font-medium">{loading ? 'Ingresando...' : 'Ingresar'}</span>
                      <ArrowRight className="ml-3 w-4 h-4" />
                    </Button>
                  </div>
>>>>>>> origin/master
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
