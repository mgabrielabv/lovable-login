import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard-theme.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Users, FileText, Calendar, Star, BarChart2, Music2, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const features = [
  { key: 'registro', title: 'Registrar Profesor/Estudiante', desc: 'Agregar nuevos usuarios al sistema', icon: <UserPlus /> },
  { key: 'secciones', title: 'Cambio de Sección/Traslados', desc: 'Mover alumnos entre secciones', icon: <Users /> },
  { key: 'cupos', title: 'Abrir Nuevos Cupos', desc: 'Gestionar cupos disponibles', icon: <FileText /> },
  { key: 'horarios', title: 'Definir Horarios y Salones', desc: 'Asignar salones y horarios', icon: <Calendar /> },
  { key: 'calendario', title: 'Modificar Calendario de Eventos', desc: 'Agregar o editar eventos del calendario', icon: <Star /> },
  { key: 'informes', title: 'Consulta de Registros', desc: 'Generar informes básicos', icon: <BarChart2 /> },
];

const PersonalDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const name = user?.name || 'Personal';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const go = (key: string) => {
    // placeholder navigation - adapt to your routes
    navigate(`/personal/${key}`);
  };

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
            <div className="text-white font-semibold text-lg">Bienvenido(a), {name}</div>
            <div className="text-white text-sm opacity-70">Dashboard del Personal</div>
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

      <div className="max-w-6xl mx-auto p-8">
        <main>
          <div className="dashboard-grid">
            {features.map((f) => (
              <Card key={f.key} className="card-elevated rounded-2xl flex flex-col items-center text-center">
                <div className="mb-3 relative">
                  <div className="rounded-full flex items-center justify-center icon-bubble">
                    {React.cloneElement(f.icon as any, { className: 'feature-icon' })}
                    <span className="icon-inner-accent" aria-hidden="true" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-[#5d0067] mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600">{f.desc}</p>
                <div className="mt-4 w-full">
                  <Button className="w-full mt-2 dashboard-btn" onClick={() => go(f.key)}>Abrir</Button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PersonalDashboard;
