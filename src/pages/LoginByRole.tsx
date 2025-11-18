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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-[var(--shadow-elegant)]">
            <Music2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Conservatorio
          </h1>
          <p className="text-xl font-heading text-foreground/80">
            José Luis Paz
          </p>
        </div>

        {/* Login Card */}
        <Card className="border-2 border-accent shadow-[var(--shadow-elegant)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-heading text-center">
              Iniciar Sesión - {getRoleTitle()}
            </CardTitle>
            <CardDescription className="text-center font-body">
              Ingresa tu cédula y contraseña
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

              <div className="space-y-2">
                <Label htmlFor="cedula" className="font-heading">
                  Cédula de Identidad
                </Label>
                <Input
                  id="cedula"
                  type="text"
                  placeholder="12345678"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  required
                  className="font-body"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-heading">
                  Contraseña
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="font-body"
                />
              </div>

              {(role === 'profesor' || role === 'admin') && (
                <div className="space-y-2">
                  <Label htmlFor="professorId" className="font-heading">
                    ID de {role === 'profesor' ? 'Profesor' : 'Administrador'}
                  </Label>
                  <Input
                    id="professorId"
                    type="text"
                    placeholder={`Ej: ${role === 'profesor' ? 'PROF' : 'ADM'}-12345`}
                    value={professorId}
                    onChange={(e) => setProfessorId(e.target.value)}
                    required
                    className="font-body"
                  />
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-heading"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : `Iniciar Sesión como ${getRoleTitle()}`}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              {role === 'estudiante' && (
                <div className="text-center">
                  <p className="text-sm font-body text-muted-foreground">
                    ¿No tienes cuenta?{' '}
                    <Link
                      to="/registro/estudiante"
                      className="text-primary hover:text-secondary font-medium underline underline-offset-4 transition-colors"
                    >
                      Regístrate aquí
                    </Link>
                  </p>
                </div>
              )}
              
              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/seleccion-modo')}
                  className="text-muted-foreground hover:text-foreground font-body"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver a selección de modo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm font-body text-muted-foreground mt-6">
          Sistema de gestión académica del Conservatorio de Música
        </p>
      </div>
    </div>
  );
};

export default LoginByRole;
