import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

type Candidate = { id: string; name: string; role: string; professorId?: string };

const RoleSelection: React.FC = () => {
  const loc = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const candidates: Candidate[] = (loc.state as any)?.candidates || [];
  const cedula: string = (loc.state as any)?.cedula || '';
  const password: string = (loc.state as any)?.password || '';

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChoose = async (role: string) => {
    setError('');
    // If we have credentials from the previous screen, perform the login here
    if (cedula && password) {
      setLoading(true);
      try {
        // find a candidate with the selected role so we can provide professorId when present
        const chosen = candidates.find(c => c.role === role);
        const professorId = chosen?.professorId;
        // @ts-ignore
        await login(cedula, password, role as any, professorId || undefined);
        if (role === 'profesor') {
          navigate('/teacher/dashboard', { state: { name: chosen?.name } });
        } else {
          navigate('/dashboard');
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
    } else {
      navigate('/dashboard', { state: { role } });
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
            <button
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

            <button
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
