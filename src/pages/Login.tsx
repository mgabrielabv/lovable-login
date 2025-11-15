import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('estudiante');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Verificar que el rol del usuario coincida con el rol seleccionado
      const storedUser = localStorage.getItem('conservatorio_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.role !== selectedRole) {
          setError(`El usuario no tiene el rol de ${selectedRole}`);
          setLoading(false);
          return;
        }
      }
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
              Iniciar Sesión
            </CardTitle>
            <CardDescription className="text-center font-body">
              Ingresa tus credenciales para acceder al portal
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
                <Label htmlFor="email" className="font-heading">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="role" className="font-heading">
                  Tipo de Usuario
                </Label>
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                  <SelectTrigger className="font-body">
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="estudiante">Estudiante</SelectItem>
                    <SelectItem value="profesor">Profesor</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-heading"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm font-body text-muted-foreground">
                ¿No tienes cuenta?{' '}
                <Link
                  to="/registro"
                  className="text-primary hover:text-secondary font-medium underline underline-offset-4 transition-colors"
                >
                  Regístrate aquí
                </Link>
              </p>
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

export default Login;
