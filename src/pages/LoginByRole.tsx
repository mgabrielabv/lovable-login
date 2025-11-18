import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Music2, AlertCircle, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginByRole = () => {
  const navigate = useNavigate();
  const { role } = useParams<{ role: UserRole }>();
  const { login } = useAuth();
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const [professorId, setProfessorId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getRoleTitle = () => {
    switch (role) {
      case 'estudiante':
        return 'Estudiante';
      case 'profesor':
        return 'Profesor';
      case 'admin':
        return 'Administrador';
      default:
        return 'Usuario';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!role) {
        throw new Error('Tipo de usuario no especificado');
      }

      await login(cedula, password, role, professorId || undefined);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[hsl(43,57%,95%)] via-background to-[hsl(256,50%,92%)]">
      {/* Decorative floating element */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-lavender mb-6 shadow-glow animate-float">
            <Music2 className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            <span className="gradient-text">Conservatorio</span>
          </h1>
          <p className="text-xl md:text-2xl font-heading text-foreground/90">
            José Luis Paz
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-card glass-card animate-scale-in">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl md:text-3xl font-heading text-center font-bold">
              Iniciar Sesión - {getRoleTitle()}
            </CardTitle>
            <CardDescription className="text-center font-body text-base">
              Ingresa tu cédula y contraseña para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-3">
                <Label htmlFor="cedula" className="font-heading text-base">
                  Cédula de Identidad *
                </Label>
                <Input
                  id="cedula"
                  type="text"
                  placeholder="12345678"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                  className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="font-heading text-base">
                  Contraseña *
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                />
              </div>

              {(role === 'profesor' || role === 'admin') && (
                <div className="space-y-3">
                  <Label htmlFor="professorId" className="font-heading text-base">
                    ID de {role === 'profesor' ? 'Profesor' : 'Administrador'} *
                  </Label>
                  <Input
                    id="professorId"
                    type="text"
                    placeholder={`Ej: ${role === 'profesor' ? 'PROF' : 'ADM'}-12345`}
                    value={professorId}
                    onChange={(e) => setProfessorId(e.target.value)}
                    required
                    className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-glow transition-all duration-300 font-heading text-base h-12 bg-[length:200%_100%] hover:bg-[position:100%_0] mt-6"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : `Iniciar Sesión como ${getRoleTitle()}`}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              {role === 'estudiante' && (
                <div className="text-center pt-2">
                  <p className="text-sm font-body text-muted-foreground">
                    ¿No tienes cuenta?{' '}
                    <Link
                      to="/registro/estudiante"
                      className="text-primary hover:text-lavender font-medium underline underline-offset-4 transition-colors"
                    >
                      Regístrate aquí
                    </Link>
                  </p>
                </div>
              )}
              
              <div className="text-center pt-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/seleccion-modo')}
                  className="text-muted-foreground hover:text-primary font-body transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a selección de modo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm font-body text-muted-foreground mt-8 animate-fade-in">
          Sistema de gestión académica del Conservatorio de Música José Luis Paz
        </p>
      </div>
    </div>
  );
};

export default LoginByRole;
