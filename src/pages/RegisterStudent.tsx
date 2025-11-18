import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Music2, AlertCircle, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RegisterStudent = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [edad, setEdad] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    // Paso 1: Información Personal
    name: '',
    fechaNacimiento: '',
    email: '',
    telefono: '',
    // Paso 2: Cédulas
    cedula: '',
    cedulaRepresentante: '',
    // Paso 3: Información Académica
    instrumento: '',
    nivel: '',
    horario: '',
    // Paso 4: Cuenta
    password: '',
    confirmPassword: ''
  });

  // Calcular edad cuando cambia la fecha de nacimiento
  useEffect(() => {
    if (formData.fechaNacimiento) {
      const hoy = new Date();
      const nacimiento = new Date(formData.fechaNacimiento);
      let edad = hoy.getFullYear() - nacimiento.getFullYear();
      const mes = hoy.getMonth() - nacimiento.getMonth();
      
      if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
      }
      
      setEdad(edad);
    } else {
      setEdad(null);
    }
  }, [formData.fechaNacimiento]);

  const esMenor = edad !== null && edad < 18;

  const validateStep1 = () => {
    if (!formData.name.trim()) {
      setError('El nombre completo es requerido');
      return false;
    }
    if (!formData.fechaNacimiento) {
      setError('La fecha de nacimiento es requerida');
      return false;
    }
    if (!formData.email.trim()) {
      setError('El correo electrónico es requerido');
      return false;
    }
    if (!formData.telefono.trim()) {
      setError('El teléfono de contacto es requerido');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (esMenor) {
      if (!formData.cedulaRepresentante.trim()) {
        setError('La cédula del representante es requerida para menores de edad');
        return false;
      }
      if (formData.cedulaRepresentante.length < 7) {
        setError('La cédula del representante debe tener al menos 7 dígitos');
        return false;
      }
    } else {
      if (!formData.cedula.trim()) {
        setError('Tu cédula es requerida');
        return false;
      }
      if (formData.cedula.length < 7) {
        setError('La cédula debe tener al menos 7 dígitos');
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    if (!formData.instrumento) {
      setError('Selecciona un instrumento');
      return false;
    }
    if (!formData.nivel) {
      setError('Selecciona un nivel');
      return false;
    }
    if (!formData.horario) {
      setError('Selecciona un horario');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError('');
    
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    
    setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        role: 'estudiante' as const,
        cedula: esMenor ? (formData.cedula || `EST-${Date.now()}`) : formData.cedula,
        cedulaRepresentante: esMenor ? formData.cedulaRepresentante : undefined,
        esMenor,
        fechaNacimiento: formData.fechaNacimiento,
        telefono: formData.telefono,
        instrumento: formData.instrumento,
        nivel: formData.nivel,
        horario: formData.horario
      };

      await register(userData, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[hsl(43,57%,95%)] via-background to-[hsl(256,50%,92%)]">
      {/* Decorative floating element */}
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
      
      <div className="w-full max-w-lg relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-lavender mb-6 shadow-glow animate-float">
            <Music2 className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-2">
            <span className="gradient-text">Registro de Estudiante</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold transition-all duration-300 ${
                  s === step 
                    ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow scale-110' 
                    : s < step 
                    ? 'bg-accent text-primary' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {s}
                </div>
                {s < 4 && <div className={`w-8 h-1 mx-1 rounded transition-colors ${s < step ? 'bg-accent' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>
          <p className="text-lg font-body text-muted-foreground mt-4">
            Paso {step} de 4
          </p>
        </div>

        <Card className="border-0 shadow-card glass-card animate-scale-in">
          <CardHeader className="space-y-2 pb-6">
            <CardTitle className="text-2xl md:text-3xl font-heading text-center font-bold">
              {step === 1 && 'Información Personal'}
              {step === 2 && 'Cédulas de Identificación'}
              {step === 3 && 'Información Académica'}
              {step === 4 && 'Creación de Cuenta'}
            </CardTitle>
            <CardDescription className="text-center font-body text-base">
              {step === 1 && 'Completa tus datos personales básicos'}
              {step === 2 && edad !== null && (esMenor ? 'Por ser menor de edad, requerimos la cédula del representante' : 'Por ser mayor de edad, ingresa tu cédula personal')}
              {step === 3 && 'Cuéntanos sobre tus intereses musicales'}
              {step === 4 && 'Crea tu contraseña de acceso segura'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Paso 1: Información Personal */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="space-y-3">
                  <Label htmlFor="name" className="font-heading text-base">
                    Nombre Completo *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan Pérez González"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="fechaNacimiento" className="font-heading text-base">
                    Fecha de Nacimiento *
                  </Label>
                  <Input
                    id="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                    className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                  />
                  {edad !== null && (
                    <div className={`text-sm font-body p-3 rounded-lg ${esMenor ? 'bg-blue-50 text-blue-900 border border-blue-200' : 'bg-accent/30 text-foreground'}`}>
                      <span className="font-semibold">Edad calculada:</span> {edad} años {esMenor && '(menor de edad)'}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="font-heading text-base">
                    Correo Electrónico *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="telefono" className="font-heading text-base">
                    Teléfono de Contacto *
                  </Label>
                  <Input
                    id="telefono"
                    type="tel"
                    placeholder="0414-1234567"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                  />
                </div>

                <Button
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-glow transition-all duration-300 font-heading text-base h-12 bg-[length:200%_100%] hover:bg-[position:100%_0] group/btn mt-6"
                >
                  Continuar
                  <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}

            {/* Paso 2: Cédulas */}
            {step === 2 && (
              <div className="space-y-5">
                {edad !== null && (
                  <Alert className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200">
                    <Info className="h-5 w-5 text-blue-600" />
                    <AlertDescription className="text-blue-900 font-body font-medium">
                      {esMenor 
                        ? 'Por ser menor de edad, es obligatorio ingresar la cédula de tu representante legal (padre, madre o tutor).'
                        : 'Por ser mayor de edad, debes ingresar tu cédula de identidad personal.'}
                    </AlertDescription>
                  </Alert>
                )}

                {esMenor ? (
                  <>
                    <div className="space-y-3">
                      <Label htmlFor="cedulaRepresentante" className="font-heading text-base">
                        Cédula del Representante *
                      </Label>
                      <Input
                        id="cedulaRepresentante"
                        type="text"
                        placeholder="V-12345678"
                        value={formData.cedulaRepresentante}
                        onChange={(e) => setFormData({ ...formData, cedulaRepresentante: e.target.value })}
                        className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                      />
                      <p className="text-sm text-muted-foreground font-body">
                        Cédula del padre, madre o tutor legal responsable
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="cedula" className="font-heading text-base">
                        Cédula del Estudiante <span className="text-muted-foreground">(opcional)</span>
                      </Label>
                      <Input
                        id="cedula"
                        type="text"
                        placeholder="V-12345678"
                        value={formData.cedula}
                        onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                        className="font-body h-12 text-base border-2 focus:border-accent transition-colors"
                      />
                      <p className="text-sm text-muted-foreground font-body">
                        Si el estudiante ya posee cédula, ingrésala aquí
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="space-y-3">
                    <Label htmlFor="cedula" className="font-heading text-base">
                      Tu Cédula de Identidad *
                    </Label>
                    <Input
                      id="cedula"
                      type="text"
                      placeholder="V-12345678"
                      value={formData.cedula}
                      onChange={(e) => setFormData({ ...formData, cedula: e.target.value })}
                      className="font-body h-12 text-base border-2 focus:border-primary transition-colors"
                    />
                    <p className="text-sm text-muted-foreground font-body">
                      Ingresa tu cédula incluyendo letra y guion
                    </p>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 font-heading h-12 border-2 border-accent hover:bg-accent/10 transition-all"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Atrás
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-glow transition-all duration-300 font-heading h-12 bg-[length:200%_100%] hover:bg-[position:100%_0] group/btn"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            )}

            {/* Paso 3: Información Académica */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="instrumento" className="font-heading">
                    Instrumento Principal de Interés *
                  </Label>
                  <Select value={formData.instrumento} onValueChange={(value) => setFormData({ ...formData, instrumento: value })}>
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Selecciona un instrumento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="piano">Piano</SelectItem>
                      <SelectItem value="violin">Violín</SelectItem>
                      <SelectItem value="guitarra">Guitarra</SelectItem>
                      <SelectItem value="canto">Canto</SelectItem>
                      <SelectItem value="flauta">Flauta</SelectItem>
                      <SelectItem value="teoria">Teoría Musical</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nivel" className="font-heading">
                    Nivel Musical Actual *
                  </Label>
                  <Select value={formData.nivel} onValueChange={(value) => setFormData({ ...formData, nivel: value })}>
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Selecciona tu nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="principiante">Principiante</SelectItem>
                      <SelectItem value="basico">Básico</SelectItem>
                      <SelectItem value="intermedio">Intermedio</SelectItem>
                      <SelectItem value="avanzado">Avanzado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horario" className="font-heading">
                    Horario Preferido *
                  </Label>
                  <Select value={formData.horario} onValueChange={(value) => setFormData({ ...formData, horario: value })}>
                    <SelectTrigger className="font-body">
                      <SelectValue placeholder="Selecciona un horario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manana">Mañana (8:00 AM - 12:00 PM)</SelectItem>
                      <SelectItem value="tarde">Tarde (2:00 PM - 6:00 PM)</SelectItem>
                      <SelectItem value="noche">Noche (6:00 PM - 9:00 PM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(2)}
                    className="flex-1 font-heading"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Atrás
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-heading"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Paso 4: Creación de Cuenta */}
            {step === 4 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-heading">
                    Contraseña *
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="font-body"
                  />
                  <p className="text-xs text-muted-foreground font-body">
                    Mínimo 6 caracteres
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-heading">
                    Confirmar Contraseña *
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="font-body"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(3)}
                    className="flex-1 font-heading"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
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

            {step === 1 && (
              <div className="mt-6 text-center">
                <p className="text-sm font-body text-muted-foreground">
                  ¿Ya tienes cuenta?{' '}
                  <Link
                    to="/login/estudiante"
                    className="text-primary hover:text-secondary font-medium underline underline-offset-4 transition-colors"
                  >
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterStudent;
