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
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'estudiante':
        return { label: 'Estudiante', color: 'bg-accent' };
      case 'profesor':
        return { label: 'Profesor', color: 'bg-lavender' };
      case 'admin':
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
                  <CardDescription className="text-base font-body">
                    Has iniciado sesión correctamente en el portal del conservatorio
                  </CardDescription>
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
                <div className="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200">
                  <span className="font-body font-medium text-green-900">
                    Login exitoso - Conexión verificada
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                    <User className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-body text-muted-foreground">Rol</p>
                      <p className="font-heading font-semibold text-foreground">
                        {roleDisplay.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50 border border-border">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-body text-muted-foreground">Correo</p>
                      <p className="font-heading font-semibold text-foreground break-all">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Information Card */}
          <Card className="border-2 border-accent shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="font-heading">Información del Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <User className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-body text-muted-foreground">Nombre Completo</p>
                    <p className="font-heading font-semibold">{user.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Mail className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-body text-muted-foreground">Correo Electrónico</p>
                    <p className="font-heading font-semibold">{user.email}</p>
                  </div>
                </div>
                {user.professorId && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-lavender/20 to-lightLavender/20 border-2 border-lavender/30">
                    <IdCard className="h-5 w-5 text-secondary" />
                    <div className="flex-1">
                      <p className="text-sm font-body text-muted-foreground">
                        ID de {user.role === 'profesor' ? 'Profesor' : 'Administrador'}
                      </p>
                      <p className="font-heading font-bold text-secondary">{user.professorId}</p>
                    </div>
                  </div>
                )}
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
                {user.role === 'admin' && (
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
