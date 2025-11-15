import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Music, Heart, Target, Users, GraduationCap, Piano, Mic2, BookOpen, Calendar, MapPin, Mail, Phone, Facebook, Instagram, Youtube, Menu, X } from "lucide-react";
import heroImage from "@/assets/hero-music.jpg";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const values = [
    {
      icon: Heart,
      title: "Excelencia",
      description: "Compromiso con la calidad educativa",
      expanded: "Nos dedicamos a ofrecer la más alta calidad en educación musical, con profesores altamente capacitados y programas académicos rigurosos que preparan a nuestros estudiantes para destacar en el mundo de la música."
    },
    {
      icon: Users,
      title: "Inclusión",
      description: "Música para todos",
      expanded: "Creemos que la música es un derecho universal. Por eso ofrecemos programas accesibles para todas las edades, niveles y condiciones socioeconómicas, fomentando la diversidad y la equidad en nuestra comunidad musical."
    },
    {
      icon: Target,
      title: "Innovación",
      description: "Metodologías modernas",
      expanded: "Combinamos la tradición con la innovación, integrando tecnología y métodos pedagógicos contemporáneos que enriquecen la experiencia de aprendizaje y preparan a nuestros estudiantes para los desafíos del siglo XXI."
    },
    {
      icon: Music,
      title: "Pasión",
      description: "Amor por la música",
      expanded: "La pasión por la música es el motor que impulsa cada clase, cada ensayo y cada presentación. Cultivamos en nuestros estudiantes el amor genuino por el arte musical y el deseo de compartirlo con el mundo."
    }
  ];

  const programs = [
    {
      title: "Clases Regulares",
      description: "Programas estructurados de estudio musical con currículo progresivo",
      features: ["Clases semanales", "Evaluación continua", "Certificación oficial"]
    },
    {
      title: "Talleres",
      description: "Experiencias intensivas enfocadas en técnicas y repertorios específicos",
      features: ["Sesiones prácticas", "Grupos reducidos", "Proyectos colaborativos"]
    },
    {
      title: "Diplomados",
      description: "Programas profesionales de formación musical avanzada",
      features: ["Titulación profesional", "Prácticas incluidas", "Networking musical"]
    }
  ];

  const areas = [
    { name: "Piano", icon: Piano, description: "Técnica clásica y contemporánea" },
    { name: "Violín", icon: Music, description: "Repertorio clásico y moderno" },
    { name: "Canto", icon: Mic2, description: "Técnica vocal y expresión artística" },
    { name: "Teoría Musical", icon: BookOpen, description: "Fundamentos y análisis musical" },
    { name: "Dirección", icon: GraduationCap, description: "Dirección coral y orquestal" }
  ];

  const events = [
    { title: "Conciertos Mensuales", description: "Presentaciones de estudiantes y profesores", date: "Último viernes de cada mes" },
    { title: "Recitales de Grado", description: "Culminación de estudios formales", date: "Junio y Diciembre" },
    { title: "Clases Magistrales", description: "Con músicos invitados nacionales e internacionales", date: "Trimestralmente" }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Music className="h-8 w-8 text-primary" />
              <span className="font-display text-2xl font-bold text-primary">
                José Luis Paz
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection("sobre-nosotros")} className="font-heading text-sm font-medium hover:text-primary transition-colors">
                Sobre Nosotros
              </button>
              <button onClick={() => scrollToSection("valores")} className="font-heading text-sm font-medium hover:text-primary transition-colors">
                Valores
              </button>
              <button onClick={() => scrollToSection("programas")} className="font-heading text-sm font-medium hover:text-primary transition-colors">
                Programas
              </button>
              <button onClick={() => scrollToSection("areas")} className="font-heading text-sm font-medium hover:text-primary transition-colors">
                Áreas
              </button>
              <button onClick={() => scrollToSection("eventos")} className="font-heading text-sm font-medium hover:text-primary transition-colors">
                Eventos
              </button>
              <button onClick={() => scrollToSection("contacto")} className="font-heading text-sm font-medium hover:text-primary transition-colors">
                Contacto
              </button>
            </nav>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link to="/login">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link to="/registro">Registrarse</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-3">
                <button onClick={() => scrollToSection("sobre-nosotros")} className="font-heading text-sm font-medium hover:text-primary transition-colors text-left">
                  Sobre Nosotros
                </button>
                <button onClick={() => scrollToSection("valores")} className="font-heading text-sm font-medium hover:text-primary transition-colors text-left">
                  Valores
                </button>
                <button onClick={() => scrollToSection("programas")} className="font-heading text-sm font-medium hover:text-primary transition-colors text-left">
                  Programas
                </button>
                <button onClick={() => scrollToSection("areas")} className="font-heading text-sm font-medium hover:text-primary transition-colors text-left">
                  Áreas
                </button>
                <button onClick={() => scrollToSection("eventos")} className="font-heading text-sm font-medium hover:text-primary transition-colors text-left">
                  Eventos
                </button>
                <button onClick={() => scrollToSection("contacto")} className="font-heading text-sm font-medium hover:text-primary transition-colors text-left">
                  Contacto
                </button>
                <div className="pt-3 space-y-2">
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/login">Iniciar Sesión</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link to="/registro">Registrarse</Link>
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-secondary/60 to-accent/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 animate-fade-in">
            Conservatorio de Música<br />José Luis Paz
          </h1>
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-primary-foreground/90 mb-8 animate-fade-in">
            Formando músicos integrales desde 1985
          </p>
          <Button 
            size="lg" 
            className="bg-lavender hover:bg-lavender/90 text-primary font-heading text-lg px-8 animate-fade-in"
            onClick={() => scrollToSection("programas")}
          >
            Descubre Nuestros Programas
          </Button>
        </div>
      </section>

      {/* Sobre Nosotros Section */}
      <section id="sobre-nosotros" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Sobre Nosotros
          </h2>
          <p className="font-body text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Una institución dedicada a la excelencia musical y la formación integral de artistas
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-muted hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary">Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-base leading-relaxed">
                  Formar músicos integrales con excelencia técnica, sensibilidad artística y compromiso social, 
                  promoviendo el desarrollo cultural de nuestra comunidad a través de la educación musical de calidad.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-accent/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary">Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-base leading-relaxed">
                  Ser el conservatorio de música líder en la región, reconocido por la excelencia académica, 
                  la innovación pedagógica y la formación de músicos profesionales que contribuyan al desarrollo cultural del país.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-heading text-2xl text-primary">Historia</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="font-body text-base leading-relaxed">
                  Fundado en 1985, el Conservatorio José Luis Paz ha formado a generaciones de músicos destacados. 
                  Con casi 40 años de trayectoria, somos un referente en educación musical de excelencia.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section id="valores" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Nuestros Valores
          </h2>
          <p className="font-body text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Los principios que guían nuestra labor educativa
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index}
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-primary/50"
                  onClick={() => setSelectedValue(value.title)}
                  style={{
                    backgroundColor: index % 4 === 0 ? 'hsl(var(--background))' : 
                                     index % 4 === 1 ? 'hsl(var(--accent))' :
                                     index % 4 === 2 ? 'hsl(var(--muted))' :
                                     'hsl(var(--accent) / 0.3)'
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="font-accent text-2xl text-primary">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-body text-center">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dialog for Values */}
      <Dialog open={selectedValue !== null} onOpenChange={() => setSelectedValue(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-primary">
              {values.find(v => v.title === selectedValue)?.title}
            </DialogTitle>
            <DialogDescription className="font-body text-base leading-relaxed pt-4">
              {values.find(v => v.title === selectedValue)?.expanded}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Lo que Hacemos Section */}
      <section id="programas" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Lo que Hacemos
          </h2>
          <p className="font-body text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Descubre nuestra oferta académica y actividades culturales
          </p>
          
          <Tabs defaultValue="programas" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="programas" className="font-heading">Programas</TabsTrigger>
              <TabsTrigger value="areas" className="font-heading" id="areas">Áreas Musicales</TabsTrigger>
              <TabsTrigger value="eventos" className="font-heading" id="eventos">Eventos</TabsTrigger>
            </TabsList>
            
            <TabsContent value="programas">
              <div className="grid md:grid-cols-3 gap-6">
                {programs.map((program, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <CardTitle className="font-heading text-xl text-primary">{program.title}</CardTitle>
                      <CardDescription className="font-body">{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {program.features.map((feature, idx) => (
                          <li key={idx} className="font-body text-sm flex items-center">
                            <span className="mr-2 text-primary">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="areas">
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {areas.map((area, index) => {
                  const Icon = area.icon;
                  return (
                    <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <CardHeader>
                        <div className="mx-auto mb-2 p-3 bg-primary/10 rounded-full w-fit">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="font-heading text-lg text-primary">{area.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="font-body text-sm">{area.description}</CardDescription>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="eventos">
              <div className="grid md:grid-cols-3 gap-6">
                {events.map((event, index) => (
                  <Card key={index} className="hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="mb-2 p-2 bg-lavender/20 rounded-full w-fit">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="font-heading text-xl text-primary">{event.title}</CardTitle>
                      <CardDescription className="font-body">{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-accent text-sm text-primary">{event.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Contacto */}
            <div>
              <h3 className="font-heading text-lg font-bold mb-4">Contacto</h3>
              <div className="space-y-3 font-body text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span>Av. Principal #123<br />Ciudad, País</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+58 (123) 456-7890</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>info@joseluispaz.edu</span>
                </div>
              </div>
            </div>

            {/* Enlaces Rápidos */}
            <div>
              <h3 className="font-heading text-lg font-bold mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2 font-body text-sm">
                <li>
                  <button onClick={() => scrollToSection("sobre-nosotros")} className="hover:text-lavender transition-colors">
                    Sobre Nosotros
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("valores")} className="hover:text-lavender transition-colors">
                    Valores
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("programas")} className="hover:text-lavender transition-colors">
                    Programas
                  </button>
                </li>
                <li>
                  <Link to="/login" className="hover:text-lavender transition-colors">
                    Portal de Acceso
                  </Link>
                </li>
              </ul>
            </div>

            {/* Horarios */}
            <div>
              <h3 className="font-heading text-lg font-bold mb-4">Horarios</h3>
              <div className="space-y-2 font-body text-sm">
                <p>Lunes - Viernes<br />8:00 AM - 8:00 PM</p>
                <p>Sábados<br />9:00 AM - 2:00 PM</p>
                <p>Domingos<br />Cerrado</p>
              </div>
            </div>

            {/* Redes Sociales */}
            <div>
              <h3 className="font-heading text-lg font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-lavender transition-colors">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-lavender transition-colors">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="hover:text-lavender transition-colors">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center font-body text-sm">
            <p>© {new Date().getFullYear()} Conservatorio de Música José Luis Paz. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
