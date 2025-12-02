import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare, Calendar, Clock, FileText, Mail, Book, User, Music2, LogOut } from 'lucide-react';
import './dashboard-theme.css';
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

  useEffect(() => {
    // ensure body bg handled elsewhere if needed; no inline bg here
    return () => {};
  }, []);

  return (
    <div className="dashboard-theme min-h-screen">
      <header className="w-full bg-gradient-to-r from-[#5d0067] to-[#703384]">
        <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center header-logo rounded-md shadow-md" style={{ background: '#fff8e2', padding: '0.6rem' }}>
              <Music2 className="header-logo-icon" style={{ width: '40px', height: '40px' }} />
            </div>
          </div>

          <div className="text-left">
            <div className="text-white font-semibold text-lg">Bienvenido, {name}</div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1 rounded-md bg-white/10 text-white">Perfil</button>
            <div className="avatar rounded-full bg-white flex items-center justify-center">
              <User className="avatar-icon" />
            </div>
            <button onClick={handleLogout} title="Cerrar sesión" className="ml-2 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/90">
              <LogOut className="logout-icon" />
              <span className="text-sm text-[#5d0067]">Salir</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <main>
          <div className="dashboard-grid">
            {features.map((f) => (
              <Card key={f.key} className="card-elevated rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-transform transform hover:-translate-y-1 overflow-visible">
                  <div className="mb-3 relative">
                  <div className="rounded-full flex items-center justify-center icon-bubble">
                    {React.cloneElement(f.icon as any, { className: 'feature-icon icon-beige' })}
                    <span className="icon-inner-accent" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#5d0067] mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
                <div className="mt-4 w-full">
                  <Button className="w-full mt-2 dashboard-btn" onClick={() => go(f.key)}>Entrar</Button>
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


