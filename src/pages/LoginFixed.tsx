import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music2, AlertCircle, ArrowRight, ArrowLeft, IdCard, Key, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type Candidate = { id: string; name: string; role: string; professorId?: string };

const LoginFixed: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [professorId, setProfessorId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const noticeTimer = React.useRef<number | null>(null);
  React.useEffect(() => () => { if (noticeTimer.current) window.clearTimeout(noticeTimer.current); }, []);

  const showNotice = (msg: string, ms = 1800) => {
    setNotice(msg);
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current!);
    // @ts-ignore
    noticeTimer.current = window.setTimeout(() => setNotice(''), ms);
  };


  const findCandidates = () => {
    setError('');
    // Look for users across multiple possible keys to be resilient
    const keysToTry = ['conservatorio_users', 'localUsers', 'localCandidates', 'localCandidates_' + cedula];
    console.log('findCandidates: keysToTry', keysToTry);
    let users: any[] = [];
    for (const k of keysToTry) {
      const raw = localStorage.getItem(k);
      console.log('findCandidates: key', k, 'raw present?', !!raw);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        console.log('findCandidates: parsed from', k, parsed);
        if (Array.isArray(parsed)) users = users.concat(parsed);
        else if (parsed && Array.isArray(parsed.candidates)) users = users.concat(parsed.candidates);
        else if (typeof parsed === 'object') users.push(parsed);
      } catch (e) {
        // ignore parse errors for this key
        console.warn('findCandidates: parse error for key', k, e);
      }
    }
    // Deduplicate by cedula+role+id
    users = users.filter((v, i, a) => a.findIndex(x => x.id === v.id && x.cedula === v.cedula && x.role === v.role) === i);

    console.log('findCandidates: aggregated users', users);
    const matches = users.filter((u: any) => u.cedula === cedula && (u.password === undefined || u.password === password || String(u.password) === String(password)));
    console.log('findCandidates: matches', matches);
    if (matches.length === 0) { setError('Credenciales inválidas'); return []; }
    const mapped = matches.map((u: any) => ({ id: u.id, name: u.name, role: u.role, professorId: u.professorId }));
    console.log('findCandidates: mapped', mapped);
    setCandidates(mapped);
    return mapped;
  };

  const seedTestData = () => {
    const seed = [
      {id:'1', name:'Admin Test', email:'admin@example.com', role:'master', cedula:'99999999', password:'adminpass', professorId:'ADM-001'},
      {id:'2', name:'Profe Test', email:'profe@example.com', role:'profesor', cedula:'88888888', password:'profepass', professorId:'PROF-001'},
      {id:'3', name:'Profe Test (estudiante)', email:'profe@example.com', role:'estudiante', cedula:'88888888', password:'profepass'},
      {id:'1764131601403', name:'maria bermudez', email:'maria.32520312@uru.edu', role:'estudiante', cedula:'32520312', esMenor:false, fechaNacimiento:'2006-10-22', telefono:'04245781071', instrumento:'violin', nivel:'basico', horario:'tarde', password:'maria123'}
    ];
    try {
    localStorage.setItem('conservatorio_users', JSON.stringify(seed));
    // also store under localUsers for compatibility with other helpers
    localStorage.setItem('localUsers', JSON.stringify(seed));
      // also create localCandidates per cedula
      const byCed: Record<string, any[]> = {};
      seed.forEach(u => {
        if (!u.cedula) return;
        byCed[u.cedula] = byCed[u.cedula] || [];
        byCed[u.cedula].push({ cedula: u.cedula, nombres: u.name.split(' ')[0] || u.name, apellidos: u.name.split(' ').slice(1).join(' ') || '', rol: u.role, role: u.role, id: u.id, email: u.email, professorId: u.professorId });
      });
      Object.keys(byCed).forEach(k => localStorage.setItem(`localCandidates_${k}`, JSON.stringify(byCed[k])));
      const adminOrMaster = seed.find(s => s.role === 'admin' || s.role === 'master');
      if (adminOrMaster) localStorage.setItem('localCurrentUser', JSON.stringify({ id: adminOrMaster.id, name: adminOrMaster.name, email: adminOrMaster.email, role: adminOrMaster.role, cedula: adminOrMaster.cedula }));
      setNotice('Datos de prueba cargados en localStorage');
      setTimeout(() => setNotice(''), 1800);
    } catch (e) {
      setError('No se pudieron cargar los datos de prueba');
    }
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    try {
      e.preventDefault();
    } catch (err) {
      // in case called from onClick without FormEvent
    }
    console.log('handleInitialSubmit start', { cedula });
    const found = findCandidates();
    if (found.length === 1) {
      const only = found[0];
      if (only.role === 'profesor' || only.role === 'admin') {
        setSelectedRole(only.role); setProfessorId(only.professorId || '');
        if (only.professorId) proceedLogin(only.role);
        return;
      }
      proceedLogin(only.role);
      return;
    }

    if (found.length > 1) {
      console.log('Multiple candidates found - redirecting to role-selection', found);
      navigate('/role-selection', { state: { candidates: found, cedula, password } });
      return;
    }
  };

  const proceedLogin = async (role: string) => {
    setError(''); setLoading(true); showNotice('Ingresando...');
    console.log('proceedLogin', { cedula, role, professorId });
    try {
      // @ts-ignore
      await login(cedula, password, role as any, professorId || undefined);
      // Navigate to role-specific dashboards
      if (role === 'estudiante') navigate('/student/dashboard');
      else if (role === 'profesor') navigate('/teacher/dashboard');
      else if (role === 'personal') navigate('/personal/dashboard');
      else if (role === 'master' || role === 'admin') navigate('/master/dashboard');
      else navigate('/dashboard');
    } catch (err: any) { setError(err?.message || String(err)); console.error(err); }
    finally { setLoading(false); }
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
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-500">¿No tienes cuenta? <Link to="/registro/estudiante" className="text-primary underline">Regístrate</Link></div>
                      <Button type="submit" disabled={loading} className="flex items-center btn-brand-gradient px-4 py-2 rounded-full shadow-glow" onClick={(ev:any) => { ev.preventDefault(); console.log('submit button clicked'); handleInitialSubmit(ev); }}>
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

export default LoginFixed;
