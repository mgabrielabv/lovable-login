import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music2, GraduationCap, BookOpen, Shield, ArrowRight, Sparkles } from 'lucide-react';

const ModeSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-[hsl(43,57%,95%)] via-background to-[hsl(256,50%,92%)]">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-lavender/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="w-full max-w-6xl relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary via-secondary to-lavender mb-6 shadow-glow animate-float">
            <Music2 className="w-12 h-12 text-primary-foreground" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-3">
            <span className="gradient-text">Conservatorio de Música</span>
          </h1>
          <p className="text-2xl md:text-3xl font-heading text-foreground/90 mb-2">
            José Luis Paz
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            <Sparkles className="w-5 h-5 text-lavender" />
            <p className="text-lg font-body text-muted-foreground">
              Selecciona tu modo de acceso
            </p>
            <Sparkles className="w-5 h-5 text-lavender" />
          </div>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-scale-in">
          {/* Estudiante Card */}
          <Card className="group relative border-0 shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-2 glass-card overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-lavender/0 group-hover:from-accent/10 group-hover:to-lavender/10 transition-all duration-500" />
            
            <CardHeader className="text-center pb-4 relative">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/30 to-lavender/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-card">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-lavender flex items-center justify-center">
                  <GraduationCap className="w-9 h-9 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Soy Estudiante
              </CardTitle>
              <CardDescription className="font-body text-base md:text-lg mt-3 text-muted-foreground">
                Accede a tus cursos y materiales de estudio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              <Button
                onClick={() => navigate('/login/estudiante')}
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-glow transition-all duration-300 font-heading text-base h-12 bg-[length:200%_100%] hover:bg-[position:100%_0] group/btn"
              >
                <span className="relative z-10">Iniciar Sesión</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('/registro/estudiante')}
                variant="outline"
                className="w-full border-2 border-accent hover:border-lavender hover:bg-lavender/10 font-heading text-base h-12 transition-all duration-300"
              >
                Registrarme
              </Button>
            </CardContent>
          </Card>

          {/* Profesor Card */}
          <Card className="group relative border-0 shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-2 glass-card overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/0 to-primary/0 group-hover:from-secondary/10 group-hover:to-primary/10 transition-all duration-500" />
            
            <CardHeader className="text-center pb-4 relative">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/30 to-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-card">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center">
                  <BookOpen className="w-9 h-9 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Soy Profesor
              </CardTitle>
              <CardDescription className="font-body text-base md:text-lg mt-3 text-muted-foreground">
                Acceso al panel docente y gestión de clases
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              <Button
                onClick={() => navigate('/login/profesor')}
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-glow transition-all duration-300 font-heading text-base h-12 bg-[length:200%_100%] hover:bg-[position:100%_0] group/btn"
              >
                <span className="relative z-10">Iniciar Sesión</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              <p className="text-xs text-center text-muted-foreground font-body pt-1 italic">
                Registro exclusivo por administración
              </p>
            </CardContent>
          </Card>

          {/* Administrador Card */}
          <Card className="group relative border-0 shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-2 glass-card overflow-hidden">
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-lavender/0 to-accent/0 group-hover:from-lavender/10 group-hover:to-accent/10 transition-all duration-500" />
            
            <CardHeader className="text-center pb-4 relative">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-lavender/30 to-light-lavender/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-card">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-lavender to-light-lavender flex items-center justify-center">
                  <Shield className="w-9 h-9 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-heading font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Administrador
              </CardTitle>
              <CardDescription className="font-body text-base md:text-lg mt-3 text-muted-foreground">
                Panel de gestión y configuración del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 relative">
              <Button
                onClick={() => navigate('/login/admin')}
                className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-glow transition-all duration-300 font-heading text-base h-12 bg-[length:200%_100%] hover:bg-[position:100%_0] group/btn"
              >
                <span className="relative z-10">Iniciar Sesión</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
              <p className="text-xs text-center text-muted-foreground font-body pt-1 italic">
                Acceso restringido y confidencial
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <p className="text-center text-sm font-body text-muted-foreground mt-12 animate-fade-in">
          Sistema de gestión académica del Conservatorio de Música José Luis Paz
        </p>
      </div>
    </div>
  );
};

export default ModeSelection;
