import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Music2, AlertCircle, ArrowRight, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<UserRole>('estudiante');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    professorId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = () => {
    if (!role) {
      setError('Por favor selecciona un tipo de usuario');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if ((role === 'profesor' || role === 'admin') && !formData.professorId.trim()) {
      setError(`El ID de ${role === 'profesor' ? 'profesor' : 'administrador'} es obligatorio`);
      return;
    }

    setLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.password,
        role,
        role !== 'estudiante' ? formData.professorId : undefined
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
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

        {/* Register Card */}
        <Card className="border-2 border-accent shadow-[var(--shadow-elegant)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-heading text-center">
              Registro
            </CardTitle>
            <CardDescription className="text-center font-body">
              {step === 1 
                ? 'Selecciona tu tipo de usuario' 
                : 'Completa tus datos personales'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              // Step 1: Role Selection
              <div className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3">
                  <Label className="font-heading text-base">
                    Tipo de Usuario
                  </Label>
                  <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-accent/50 hover:border-accent hover:bg-accent/10 transition-colors cursor-pointer">
                      <RadioGroupItem value="estudiante" id="estudiante" />
                      <Label 
                        htmlFor="estudiante" 
                        className="font-body flex-1 cursor-pointer"
                      >
                        <div>
                          <div className="font-heading font-semibold">Estudiante</div>
                          <div className="text-sm text-muted-foreground">
                            Acceso al portal de estudiantes
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-accent/50 hover:border-accent hover:bg-accent/10 transition-colors cursor-pointer">
                      <RadioGroupItem value="profesor" id="profesor" />
                      <Label 
                        htmlFor="profesor" 
                        className="font-body flex-1 cursor-pointer"
                      >
                        <div>
                          <div className="font-heading font-semibold">Profesor</div>
                          <div className="text-sm text-muted-foreground">
                            Gestión de cursos y estudiantes
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 rounded-lg border-2 border-accent/50 hover:border-accent hover:bg-accent/10 transition-colors cursor-pointer">
                      <RadioGroupItem value="admin" id="admin" />
                      <Label 
                        htmlFor="admin" 
                        className="font-body flex-1 cursor-pointer"
                      >
                        <div>
                          <div className="font-heading font-semibold">Administrador</div>
                          <div className="text-sm text-muted-foreground">
                            Acceso completo al sistema
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-900 text-sm">
                    <strong>Nota importante:</strong> Los administradores NO se registran por este medio. 
                    El registro de profesores lo realiza directamente el administrador desde el panel de control. 
                    La opción "Administrador" está disponible solo para pruebas de desarrollo.
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleRoleSelect}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-heading"
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center pt-2">
                  <p className="text-sm font-body text-muted-foreground">
                    ¿Ya tienes cuenta?{' '}
                    <Link
                      to="/login"
                      className="text-primary hover:text-secondary font-medium underline underline-offset-4 transition-colors"
                    >
                      Inicia sesión aquí
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              // Step 2: Registration Form
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name" className="font-heading">
                    Nombre Completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-heading">
                    Correo Electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="font-body"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-heading">
                    Confirmar Contraseña
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                    className="font-body"
                  />
                </div>

                {(role === 'profesor' || role === 'admin') && (
                  <div className="space-y-2">
                    <Label htmlFor="professorId" className="font-heading">
                      ID de {role === 'profesor' ? 'Profesor' : 'Administrador'} *
                    </Label>
                    <Input
                      id="professorId"
                      type="text"
                      placeholder={`Ej: ${role === 'profesor' ? 'PROF' : 'ADM'}-12345`}
                      value={formData.professorId}
                      onChange={(e) => setFormData({ ...formData, professorId: e.target.value })}
                      required
                      className="font-body"
                    />
                    <p className="text-xs text-muted-foreground font-body">
                      Campo obligatorio para {role === 'profesor' ? 'profesores' : 'administradores'}
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 font-heading"
                  >
                    Atrás
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-heading"
                    disabled={loading}
                  >
                    {loading ? 'Registrando...' : 'Registrarse'}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
