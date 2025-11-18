import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music2, GraduationCap, BookOpen, Shield, ArrowRight } from 'lucide-react';

const ModeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-5xl">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-[var(--shadow-elegant)]">
            <Music2 className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-display font-bold text-foreground mb-2">
            Conservatorio de Música
          </h1>
          <p className="text-xl font-heading text-foreground/80">
            José Luis Paz
          </p>
          <p className="text-base font-body text-muted-foreground mt-4">
            Selecciona tu modo de acceso
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Estudiante Card */}
          <Card className="border-2 border-accent shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-heading">
                Soy Estudiante
              </CardTitle>
              <CardDescription className="font-body text-base">
                Accede a tus cursos y materiales
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate('/login/estudiante')}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-heading"
              >
                Iniciar Sesión
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                onClick={() => navigate('/registro/estudiante')}
                variant="outline"
                className="w-full border-2 border-accent font-heading"
              >
                Registrarme
              </Button>
            </CardContent>
          </Card>

          {/* Profesor Card */}
          <Card className="border-2 border-accent shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-heading">
                Soy Profesor
              </CardTitle>
              <CardDescription className="font-body text-base">
                Acceso al panel docente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate('/login/profesor')}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-heading"
              >
                Iniciar Sesión
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground font-body">
                Registro solo por administración
              </p>
            </CardContent>
          </Card>

          {/* Administrador Card */}
          <Card className="border-2 border-accent shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)] transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-lavender/20 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-heading">
                Administrador
              </CardTitle>
              <CardDescription className="font-body text-base">
                Gestión del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate('/login/admin')}
                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity font-heading"
              >
                Iniciar Sesión
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-xs text-center text-muted-foreground font-body">
                Acceso restringido
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <p className="text-center text-sm font-body text-muted-foreground mt-8">
          Sistema de gestión académica del Conservatorio de Música
        </p>
      </div>
    </div>
  );
};

export default ModeSelection;
