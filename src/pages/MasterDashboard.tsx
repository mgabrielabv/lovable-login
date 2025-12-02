import React from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard-theme.css';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Settings, BookOpen, DollarSign, PieChart, ClipboardList, UserPlus, Shield } from 'lucide-react';

const features = [
  { key: 'usuarios', title: 'Gestionar Usuarios', desc: 'Administrar cuentas y permisos', icon: <Users /> },
  { key: 'config', title: 'Configuración General', desc: 'Ajustes del sistema', icon: <Settings /> },
  { key: 'cursos', title: 'Catálogo de Cursos', desc: 'Ver y editar cursos', icon: <BookOpen /> },
  { key: 'pagos', title: 'Pagos y Matriculación', desc: 'Controlar pagos y matrículas', icon: <DollarSign /> },
  { key: 'reportes', title: 'Reportes Avanzados', desc: 'Informes y estadísticas', icon: <PieChart /> },
  { key: 'auditoria', title: 'Auditoría y Logs', desc: 'Revisar actividad del sistema', icon: <ClipboardList /> },
  { key: 'roles', title: 'Roles y Permisos', desc: 'Asignar roles a cuentas', icon: <UserPlus /> },
  { key: 'integraciones', title: 'Integraciones', desc: 'Configurar servicios externos', icon: <Settings /> },
  { key: 'seguridad', title: 'Seguridad', desc: 'Políticas y backups', icon: <Shield /> },
];

const MasterDashboard: React.FC = () => {
  const navigate = useNavigate();

  const go = (key: string) => navigate(`/master/${key}`);

  return (
    <div className="dashboard-theme min-h-screen">
      <header className="w-full bg-[#5d0067]">
        <div className="max-w-6xl mx-auto p-6 flex items-center justify-between">
          <div className="text-white font-semibold text-xl">Dashboard Master</div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8">
        <main>
          <div className="dashboard-grid-3">
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

export default MasterDashboard;
