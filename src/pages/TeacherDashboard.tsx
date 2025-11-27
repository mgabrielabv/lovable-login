import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Calendar, Clock, FileText, Mail, Book, User, Music2, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  { key: 'evaluar', title: 'Evaluar Clases', desc: 'Registra calificaciones y progreso', icon: <CheckSquare /> },
  { key: 'planificar', title: 'Planificar Evaluaciones', desc: 'Crea y organiza tus exámenes', icon: <Calendar /> },
  { key: 'disponibilidad', title: 'Mi Disponibilidad', desc: 'Estables tus horas de oficina', icon: <Clock /> },
  { key: 'formatos', title: 'Formatos e Información', desc: 'Accede a plantillas y guías', icon: <FileText /> },
  { key: 'contacto', title: 'Actualizar Contacto', desc: 'Modifica tu información personal', icon: <Mail /> },
  { key: 'bibliografia', title: 'Consulta Bibliográfica', desc: 'Explora recursos de la biblioteca', icon: <Book /> }
];

const TeacherDashboard: React.FC = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const name = (loc.state as any)?.name || 'Profesor Álvarez';
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const go = (key: string) => {
    navigate('/dashboard', { state: { role: 'profesor', action: key } });
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'linear-gradient(180deg, rgba(93,0,103,0.06) 0%, #fff8e2 60%)' }}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <div className="rounded-xl overflow-hidden shadow-md bg-gradient-to-r from-[#5d0067] to-[#703384] p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-md shadow-md" style={{ background: '#fff8e2' }}>
                <Music2 className="w-6 h-6 text-[#5d0067]" />
              </div>
              <div className="text-white">
                <div className="text-sm opacity-80">CONSERVATORIO</div>
              </div>
            </div>

            <div className="flex-1 text-center">
              <div className="text-white font-semibold text-lg">Bienvenido, {name}</div>
            </div>

            <div className="flex items-center gap-3">
              <button className="px-3 py-1 rounded-md bg-white/10 text-white">Perfil</button>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <User className="w-5 h-5 text-[#5d0067]" />
              </div>
              <button onClick={handleLogout} title="Cerrar sesión" className="ml-2 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/90">
                <LogOut className="w-4 h-4 text-[#5d0067]" />
                <span className="text-sm text-[#5d0067]">Salir</span>
              </button>
            </div>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <Card key={f.key} className="p-8 rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-transform transform hover:-translate-y-1">
                <div className="w-20 h-20 rounded-lg flex items-center justify-center mb-4 bg-white">
                  {React.cloneElement(f.icon as any, { className: 'w-10 h-10 text-[#5d0067]' })}
                </div>
                <h3 className="text-lg font-semibold text-[#5d0067] mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
                <div className="mt-6 w-full">
                  <Button className="w-full mt-2" onClick={() => go(f.key)}>Entrar</Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
