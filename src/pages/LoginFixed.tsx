import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Music2, AlertCircle, ArrowRight } from 'lucide-react';
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
    const stored = localStorage.getItem('conservatorio_users');
    let users: any[] = [];
    if (stored) {
      try { users = JSON.parse(stored); } catch (e) { setError('Error interno: datos de usuarios corruptos.'); return []; }
    }
    const matches = users.filter((u: any) => u.cedula === cedula && u.password === password);
    if (matches.length === 0) { setError('Credenciales inválidas'); return []; }
    const mapped = matches.map((u: any) => ({ id: u.id, name: u.name, role: u.role, professorId: u.professorId }));
    setCandidates(mapped);
    return mapped;
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = findCandidates();
    if (found.length === 1) {
      const only = found[0];
      if (only.role === 'profesor' || only.role === 'admin') {
        setSelectedRole(only.role); setProfessorId(only.professorId || '');
        if (only.professorId) proceedLogin(only.role);
        return;
      }
      proceedLogin(only.role);
    }
  };

  const proceedLogin = async (role: string) => {
    setError(''); setLoading(true); showNotice('Ingresando...');
    try {
      // @ts-ignore
      await login(cedula, password, role as any, professorId || undefined);
      navigate('/dashboard');
    } catch (err: any) { setError(err?.message || String(err)); console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-6"><div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#c7a252] to-[#5d0067] mb-4"><Music2 className="w-10 h-10 text-white"/></div></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 rounded-2xl">
            <CardHeader><CardTitle>Iniciar sesión</CardTitle><CardDescription>Introduce tu cédula y contraseña.</CardDescription></CardHeader>
            <CardContent>
              <form onSubmit={handleInitialSubmit} className="space-y-4">
                {error && (<Alert variant="destructive"><AlertCircle className="mr-2"/><AlertDescription>{error}</AlertDescription></Alert>)}
                <div><Label htmlFor="cedula">Cédula</Label><Input id="cedula" value={cedula} onChange={e=>setCedula(e.target.value)} /></div>
                <div><Label htmlFor="password">Contraseña</Label><div className="relative"><Input id="password" type={'password'} value={password} onChange={e=>setPassword(e.target.value)} /><div className="absolute right-2 top-2"/></div></div>
                {(!selectedRole && candidates.length<=1) && (<div className="flex justify-end"><Button type="submit" disabled={loading}>{loading? 'Ingresando...':'Ingresar'}</Button></div>)}
                {candidates.length>1 && (<div><Label>Selecciona tu rol</Label><div className="flex gap-2 mt-2">{candidates.map(c=>(<Button key={c.id} type="button" onClick={()=>setSelectedRole(c.role)}>{c.name} — {c.role}</Button>))}</div></div>)}
                {(selectedRole && (selectedRole==='profesor'||selectedRole==='admin')) && (<div><Label htmlFor="profesorId">ID Profesor</Label><Input id="profesorId" value={professorId} onChange={e=>setProfessorId(e.target.value)}/><div className="flex justify-end mt-3"><Button onClick={()=>proceedLogin(selectedRole)} disabled={loading}>{loading? 'Ingresando...':'Ingresar'}</Button></div></div>)}
                <div className="text-sm text-center mt-2"><Link to="/registro/estudiante">¿No tienes cuenta? Regístrate</Link></div>
              </form>
            </CardContent>
          </Card>
          <div className="hidden md:flex flex-col justify-center p-6"><h3 className="text-2xl font-bold">Bienvenido al Conservatorio</h3><p className="text-slate-700">Accede a tus clases y materiales.</p></div>
        </div>
        {notice && <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/90 px-4 py-2 rounded-full shadow-md">{notice}</div>}
      </div>
    </div>
  );
};

export default LoginFixed;
