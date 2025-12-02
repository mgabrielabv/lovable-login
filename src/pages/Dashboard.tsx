import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music2, LogOut, CheckCircle2, User, IdCard, Mail } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'estudiante':
        return { label: 'Estudiante', color: 'bg-accent' };
      case 'profesor':
        return { label: 'Profesor', color: 'bg-lavender' };
      case 'admin':
      case 'master':
        return { label: 'Administrador', color: 'bg-secondary' };
      default:
        return { label: role, color: 'bg-muted' };
    }
  };

  const roleDisplay = getRoleDisplay(user.role);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Music2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-display font-bold">
                  Conservatorio José Luis Paz
                </h1>
                <p className="text-sm font-body opacity-90">
                  Sistema de Gestión Académica
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 font-heading"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Welcome Card */}
          <Card className="border-2 border-accent shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-3xl font-display">
                  Bienvenido {roleDisplay.label}, {user.name}
                </CardTitle>
                <div className="text-base font-body space-y-1">
                  {user.esMenor && user.cedulaRepresentante && (
                    <div>Representante: Cédula {user.cedulaRepresentante}</div>
                  )}
                  {user.cedula && !user.esMenor && (
                    <div>Cédula: {user.cedula}</div>
                  )}
                  {user.professorId && (
                    <div>ID: {user.professorId}</div>
                  )}
                </div>
              </div>
                <Badge className={`${roleDisplay.color} text-white font-heading px-4 py-2 text-sm`}>
                  {roleDisplay.label}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Status Card */}
          <Card className="border-2 border-accent shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-heading">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Estado de Conexión
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <span className="font-body font-medium text-green-900">
                    ✅ Login exitoso - Rol: {user.role} - Conexión verificada
                  </span>
                </div>

                {/* Información adicional según el rol */}
                <div className="grid gap-4 mt-4">
                  <div className="p-4 rounded-lg bg-background border border-accent">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-heading font-semibold text-foreground">Información Personal</span>
                    </div>
                    <div className="space-y-1 text-sm font-body text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        {user.email}
                      </div>
                      {user.cedula && (
                        <div className="flex items-center gap-2">
                          <IdCard className="h-3 w-3" />
                          Cédula: {user.cedula}
                        </div>
                      )}
                      {user.esMenor && user.cedulaRepresentante && (
                        <div className="flex items-center gap-2">
                          <IdCard className="h-3 w-3" />
                          Representante: {user.cedulaRepresentante}
                        </div>
                      )}
                      {user.telefono && (
                        <div>Teléfono: {user.telefono}</div>
                      )}
                    </div>
                  </div>

                  {user.role === 'estudiante' && user.instrumento && (
                    <div className="p-4 rounded-lg bg-background border border-accent">
                      <div className="flex items-center gap-2 mb-2">
                        <Music2 className="h-4 w-4 text-primary" />
                        <span className="font-heading font-semibold text-foreground">Información Académica</span>
                      </div>
                      <div className="space-y-1 text-sm font-body text-muted-foreground">
                        <div>Instrumento: {user.instrumento}</div>
                        <div>Nivel: {user.nivel}</div>
                        <div>Horario: {user.horario}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Role-specific Information */}
          <Card className="border-2 border-accent shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="font-heading">Información Específica del Rol</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-body">
                {user.role === 'estudiante' && (
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent">
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Portal de Estudiantes
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Acceso a cursos inscritos</li>
                      <li>• Visualización de calificaciones</li>
                      <li>• Horarios de clases</li>
                      <li>• Material de estudio</li>
                    </ul>
                  </div>
                )}
                {user.role === 'profesor' && (
                  <div className="p-4 rounded-lg bg-lavender/10 border border-lavender">
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Portal de Profesores
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Gestión de cursos y estudiantes</li>
                      <li>• Registro de calificaciones</li>
                      <li>• Planificación de clases</li>
                      <li>• Comunicación con estudiantes</li>
                    </ul>
                  </div>
                )}
                {(user.role === 'admin' || user.role === 'master') && (
                  <div className="p-4 rounded-lg bg-secondary/10 border border-secondary">
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      Panel de Administración
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Gestión completa del sistema</li>
                      <li>• Administración de usuarios</li>
                      <li>• Configuración de cursos</li>
                      <li>• Reportes y estadísticas</li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
