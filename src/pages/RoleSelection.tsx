import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, User } from 'lucide-react';
import { AUTH_SELECT_ROLE_ENDPOINT, AUTH_ME_ENDPOINTS } from '@/api/config';
import gateway from '@/api/gateway';
import { useAuth } from '@/contexts/AuthContext';

type Candidate = { id: string; name: string; role: string; professorId?: string };

const RoleSelection: React.FC = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const { login, setUser } = useAuth();
  const roles: string[] = (loc.state as any)?.roles || [];
  const cedula: string = (loc.state as any)?.cedula || '';
  const password: string = (loc.state as any)?.password || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractUser = (data: any): any => {
    if (!data || typeof data !== 'object') return null;
    const candidate = (data.user && typeof data.user === 'object') ? data.user : data;
    if (candidate && candidate.rol && candidate.nombres) {
      return {
        id: candidate.id || candidate.cedula || 'self',
        name: `${candidate.nombres} ${candidate.apellidos || ''}`.trim(),
        email: candidate.email || '',
        role: candidate.rol,
        cedula: candidate.cedula || '',
        cedulaRepresentante: candidate.cedulaRepresentante || undefined,
        esMenor: candidate.esMenor || undefined,
        professorId: candidate.professorId || undefined,
        fechaNacimiento: candidate.fechaNacimiento || undefined,
        telefono: candidate.telefono || undefined,
        instrumento: candidate.instrumento || undefined,
        nivel: candidate.nivel || undefined,
        horario: candidate.horario || undefined,
      };
    }
    if (candidate && candidate.id && candidate.role) return candidate;
    // Nuevo: manejar payload de JWT con userId y rol
    if (candidate && candidate.userId && candidate.rol) {
      return {
        id: candidate.userId.toString(),
        name: 'Usuario',
        email: '',
        role: candidate.rol,
        cedula: '',
      };
    }
    return null;
  };

  const handleChoose = async (role: string) => {
    setError('');
    // If we have credentials from the previous screen, perform the select-role here
    if (cedula && password) {
      setLoading(true);
      try {
        // Llamar a select-role con el rol elegido
        const res = await gateway.post(AUTH_SELECT_ROLE_ENDPOINT, { role });
        if (res.error) {
          setError(res.error);
          return;
        }
        // Después de seleccionar rol, validar sesión para obtener el usuario
        const validateEndpoint = AUTH_ME_ENDPOINTS[0] || '/auth/validate';
        const valRes = await gateway.get(validateEndpoint);
        if (valRes.error) {
          setError(valRes.error || 'Error al validar sesión después de seleccionar rol');
          return;
        }
        const user = extractUser(valRes.data);
        if (!user) {
          setError('No se pudo obtener el usuario después de seleccionar rol');
          return;
        }
        // Setear usuario y navegar según rol elegido
        setUser(user);
        if (role === 'profesor') {
          navigate('/teacher/dashboard');
        } else if (role === 'personal') {
          navigate('/personal/dashboard');
        } else if (role === 'master' || role === 'admin') {
          navigate('/master/dashboard');
        } else {
          navigate('/student/dashboard');
        }
        return;
      } catch (err: any) {
        setError(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    }

    // Fallback: navigate to dashboard route (ProtectedRoute will redirect to login if needed)
    if (role === 'profesor') {
      navigate('/teacher/dashboard', { state: { role } });
    } else if (role === 'personal') {
      navigate('/personal/dashboard', { state: { role } });
    } else if (role === 'master' || role === 'admin') {
      navigate('/master/dashboard', { state: { role } });
    } else {
      navigate('/student/dashboard', { state: { role } });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'linear-gradient(135deg,#5d0067, rgb(242,238,255))' }}>
      <div className="w-full max-w-3xl">
        <Card className="p-6 rounded-2xl shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#5d0067]">Selecciona tu Rol</h1>
            <p className="mt-2 text-sm text-slate-600">Hemos detectado que estás registrado con múltiples roles. Por favor, elige cómo deseas acceder a la plataforma en este momento.</p>
          </div>

          {error && <div className="text-sm text-red-600 text-center mb-4">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dynamically render role options based on roles from backend */}
            {(() => {
              // Prefer ordering: master, personal, profesor, estudiante
              const order = ['master', 'personal', 'profesor', 'estudiante', 'admin'];
              const sortedRoles = roles.sort((a: string, b: string) => order.indexOf(a) - order.indexOf(b));
              return sortedRoles.map((r) => {
                if (r === 'profesor') {
                  return (
                    <button
                      key={r}
                      role="button"
                      aria-label="Ingresar como Profesor"
                      onClick={() => handleChoose('profesor')}
                      disabled={loading}
                      className="flex flex-col items-start gap-3 p-5 bg-gradient-to-br from-[#5d0067] to-[#4b1669] text-white rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#fff8e2]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">Modo Profesor</div>
                          <div className="text-sm">Gestiona tus cursos, toma asistencia y revisa las calificaciones.</div>
                        </div>
                      </div>
                    </button>
                  );
                }
                if (r === 'estudiante') {
                  return (
                    <button
                      key={r}
                      role="button"
                      aria-label="Ingresar como Estudiante"
                      onClick={() => handleChoose('estudiante')}
                      disabled={loading}
                      className="flex flex-col items-start gap-3 p-5 bg-[#fff8e2] rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5d0067]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80">
                          <BookOpen className="w-6 h-6 text-[#5d0067]" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">Modo Estudiante</div>
                          <div className="text-sm text-slate-600">Consulta tus clases, horarios, tareas y material pedagógico.</div>
                        </div>
                      </div>
                    </button>
                  );
                }
                if (r === 'personal') {
                  return (
                    <button
                      key={r}
                      role="button"
                      aria-label="Ingresar como Personal"
                      onClick={() => handleChoose('personal')}
                      disabled={loading}
                      className="flex flex-col items-start gap-3 p-5 bg-[#eef6ff] rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#5d0067]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/80">
                          <BookOpen className="w-6 h-6 text-[#5d0067]" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">Modo Personal</div>
                          <div className="text-sm text-slate-600">Gestiona inscripciones, secciones y listados administrativos.</div>
                        </div>
                      </div>
                    </button>
                  );
                }
                if (r === 'master' || r === 'admin') {
                  return (
                    <button
                      key={r}
                      role="button"
                      aria-label="Ingresar como Master"
                      onClick={() => handleChoose(r)}
                      disabled={loading}
                      className="flex flex-col items-start gap-3 p-5 bg-[#222023] text-white rounded-2xl shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#fff8e2]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-lg">Modo Master</div>
                          <div className="text-sm">Acceso a panel de administración y configuración del sistema.</div>
                        </div>
                      </div>
                    </button>
                  );
                }
                return null;
              });
            })()}
          </div>

          <div className="mt-6 text-center text-sm text-slate-500">
            ¿Necesitas ayuda o deseas cambiar tus roles? <a className="text-primary underline" href="mailto:admin@conservatorio.local">Contacta a Administración</a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RoleSelection;
