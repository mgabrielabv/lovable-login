import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Music, Heart, Target, Users, GraduationCap, Piano, Mic2, BookOpen, Calendar, MapPin, Mail, Phone, Facebook, Instagram, Youtube, Menu, X } from "lucide-react";
import heroImage from "@/assets/hero-music.jpg";
import Carousel3D from "@/components/Carousel3D";
import MusicalNotesRain from "@/components/MusicalNotesRain";
import logo from '@/assets/logo.png';
import foto from "@/assets/foto.png";
import pensumImage from '../assets/Pensum.jpg';
import HistoryScroll from '@/components/HistoryScroll';

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [showPensum, setShowPensum] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

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
            <img src={logo} alt="Logo Conservatorio" className="h-20 w-20 object-contain" />
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
              <button onClick={() => setShowPensum(true)} className="font-heading text-sm font-medium hover:text-primary transition-colors">
                Pensum
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
                <button onClick={() => scrollToSection("pensum")} className="font-heading text-sm font-medium hover:text-primary transition-colors text-left">
                  Pensum
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

      {/* Carrusel 3D */}
      <Carousel3D />

      {/* Lluvia de notas musicales */}
      <MusicalNotesRain />


      {/* Sobre Nosotros Section */}
      <section id="sobre-nosotros" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
            Sobre Nosotros
          </h2>
          <p className="font-body text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Una institución dedicada a la excelencia musical y la formación integral de artistas
          </p>
          
          <div className="flex flex-col gap-6 max-w-6xl mx-auto">
            {/* Misión y Visión en una fila */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-accent/20 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
            </div>

            {/* Historia - acordeón */}
            <div className="bg-background rounded-xl shadow-lg overflow-hidden">
              <div 
                className={`p-6 cursor-pointer flex justify-between items-center transition-colors ${isHistoryOpen ? 'bg-[#5d0067] text-[#f5e9ce]' : 'bg-[#f5e9ce] hover:bg-[#fff8e2]'}`}
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              >
                <h2 className={`font-display text-3xl font-bold ${isHistoryOpen ? 'text-[#f5e9ce]' : 'text-primary'}`}>HISTORIA</h2>
                <svg 
                  width="24" 
                  height="24" 
                  fill={isHistoryOpen ? '#f5e9ce' : '#5d0067'} 
                  viewBox="0 0 24 24" 
                  className={`transition-transform duration-300 ${isHistoryOpen ? 'rotate-180' : ''}`}
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.88-.69 6.9L12 19l-4.31 2.16-.69-6.9-5-4.88 6.91-1.01L12 2z"/>
                </svg>
              </div>

              {/* Contenido de la Historia (expandido) */}
              {isHistoryOpen && (
                <div className="p-6 space-y-6">
                  <p className="font-body text-base leading-relaxed text-[#5d0067] text-center">
                    Fundado en 1985, el Conservatorio José Luis Paz ha formado a generaciones de músicos destacados. Con casi 40 años de trayectoria, somos un referente en educación musical de excelencia.
                  </p>

                  {/* Origen del Conservatorio */}
                  <div className="space-y-4">
                    <h3 className="font-heading text-2xl font-bold text-primary text-center">Origen del Conservatorio de Música José Luis Paz</h3>
                    <p className="font-body text-base leading-relaxed text-[#5d0067] text-center">
                      El Conservatorio José Luis Paz nace de una visión compartida: democratizar la educación musical de excelencia y formar artistas comprometidos con su comunidad.
                      Desde sus inicios, ha mantenido un compromiso inquebrantable con la calidad pedagógica y el desarrollo integral de sus estudiantes.
                    </p>
                  </div>

                  {/* Fundación y Fecha */}
                  <div className="bg-white p-4 rounded-lg border-l-4 border-[#5d0067] opacity-90">
                    <h4 className="font-heading text-xl font-bold text-primary mb-2">Fundación y Fecha</h4>
                    <p className="font-body text-sm text-[#5d0067] mb-2"><strong>FUNDACIÓN:</strong> 15 de marzo de 1985</p>
                    <p className="font-body text-sm text-[#5d0067] mb-2"><strong>UBICACIÓN:</strong> Ciudad de Maracaibo, Edo. Zulia, Venezuela</p>
                    <p className="font-body text-sm text-[#5d0067]">
                      En una época de renacimiento cultural en la región, el maestro José Luis Paz, junto con un grupo de visionarios músicos y educadores, estableció las bases de lo que se convertiría en una de las instituciones musicales más respetadas del país.
                    </p>
                  </div>

                  {/* Visionarios y Fundadores */}
                  <div className="bg-white p-4 rounded-lg border-l-4 border-[#5d0067] opacity-90">
                    <h4 className="font-heading text-xl font-bold text-primary mb-2">Visionarios y Fundadores</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-body text-sm text-[#5d0067]"><strong>JOSÉ LUIS PAZ</strong> - Fundador y Director Fundador</p>
                        <p className="font-body text-sm text-[#5d0067]">
                          Maestro compositor y pedagogo, graduado del Conservatorio Nacional con especialización en Europa. Su visión de una educación musical accesible pero rigurosa fue el motor que impulsó la creación del conservatorio.
                        </p>
                      </div>
                      <div>
                        <p className="font-body text-sm text-[#5d0067]"><strong>MARÍA TORRES</strong> - Co-fundadora</p>
                        <p className="font-body text-sm text-[#5d0067]">
                          Pianista concertista y educadora musical, quien estableció el programa pedagógico de piano y música de cámara.
                        </p>
                      </div>
                      <div>
                        <p className="font-body text-sm text-[#5d0067]"><strong>CARLOS MENDOZA</strong> - Co-fundador</p>
                        <p className="font-body text-sm text-[#5d0067]">
                          Director de orquesta y violinista, quien formó la primera orquesta sinfónica juvenil del conservatorio.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Primeros Talentos y Cantantes */}
                  <div className="bg-white p-4 rounded-lg border-l-4 border-[#5d0067] opacity-90">
                    <h4 className="font-heading text-xl font-bold text-primary mb-2">Primeros Talentos y Cantantes</h4>
                    <p className="font-body text-sm text-[#5d0067]">
                      Entre los primeros graduados del conservatorio se encuentran nombres que hoy brillan en escenarios nacionales e internacionales:
                    </p>
                    <ul className="font-body text-sm text-[#5d0067] mt-2 space-y-1">
                      <li><strong>LAURA GONZÁLEZ</strong> (Promoción 1989) - Soprano internacional, actualmente en la Ópera de París.</li>
                      <li><strong>JUAN RAMÍREZ</strong> (Promoción 1990) - Director de orquesta, ganador del Premio Internacional de Dirección de Orquesta.</li>
                      <li><strong>ANA MARTÍNEZ</strong> (Promoción 1991) - Pianista concertista, becaria de la Fundación Cultural Europea.</li>
                    </ul>
                  </div>

                  {/* Hitos Importantes */}
                  <div className="bg-white p-4 rounded-lg border-l-4 border-[#5d0067] opacity-90">
                    <h4 className="font-heading text-xl font-bold text-primary mb-2">Hitos Importantes</h4>
                    <div className="space-y-2">
                      <div className="flex gap-4">
                        <span className="font-bold text-[#5d0067]">1985  ➛</span>
                        <span className="text-[#5d0067]">Fundación del Conservatorio con 45 estudiantes</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="font-bold text-[#5d0067]">1990  ➛</span>
                        <span className="text-[#5d0067]">Primera graduación, 12 músicos profesionales</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="font-bold text-[#5d0067]">1998  ➛</span>
                        <span className="text-[#5d0067]">Cambio de sede a instalaciones más amplias, expansión del programa académico</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="font-bold text-[#5d0067]">2005  ➛</span>
                        <span className="text-[#5d0067]">Reconocimiento nacional de excelencia académica por el Ministerio de Cultura</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="font-bold text-[#5d0067]">2012  ➛</span>
                        <span className="text-[#5d0067]">Convenios internacionales con conservatorios de Europa y América Latina</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="font-bold text-[#5d0067]">2020  ➛</span>
                        <span className="text-[#5d0067]">Apertura de la Sala de Conciertos José Luis Paz con capacidad para 500 personas</span>
                      </div>
                      <div className="flex gap-4">
                        <span className="font-bold text-[#5d0067]">2025  ➛</span>
                        <span className="text-[#5d0067]">40 aniversario: más de 5,000 graduados y presencia en 3 sedes regionales</span>
                      </div>
                    </div>
                  </div>

                  {/* Legado y Logros */}
                  <div className="bg-[#4b1669] rounded-xl shadow-lg p-6 mt-6">
                    <h3 className="font-heading text-2xl font-bold text-[#fff8e2] mb-4">Legado y Logros</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Tarjeta 1 */}
                      <div className="bg-white p-4 rounded-lg flex items-start space-x-3">
                        <svg width="24" height="24" fill="#5d0067" viewBox="0 0 24 24">
                          <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 12l-4 4h14l-4-4H10z"/>
                        </svg>
                        <p className="font-body text-sm text-[#5d0067] leading-relaxed">
                          Más de 5,000 estudiantes graduados en programas de excelencia
                        </p>
                      </div>

                      {/* Tarjeta 2 */}
                      <div className="bg-white p-4 rounded-lg flex items-start space-x-3">
                        <svg width="24" height="24" fill="#5d0067" viewBox="0 0 24 24">
                          <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 12l-4 4h14l-4-4H10z"/>
                        </svg>
                        <p className="font-body text-sm text-[#5d0067] leading-relaxed">
                          25 premios nacionales e internacionales de música clásica
                        </p>
                      </div>

                      {/* Tarjeta 3 */}
                      <div className="bg-white p-4 rounded-lg flex items-start space-x-3">
                        <svg width="24" height="24" fill="#5d0067" viewBox="0 0 24 24">
                          <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 12l-4 4h14l-4-4H10z"/>
                        </svg>
                        <p className="font-body text-sm text-[#5d0067] leading-relaxed">
                          Convenios activos con 15 conservatorios de Europa y América
                        </p>
                      </div>

                      {/* Tarjeta 4 */}
                      <div className="bg-white p-4 rounded-lg flex items-start space-x-3">
                        <svg width="24" height="24" fill="#5d0067" viewBox="0 0 24 24">
                          <path d="M12 3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2s2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 12l-4 4h14l-4-4H10z"/>
                        </svg>
                        <p className="font-body text-sm text-[#5d0067] leading-relaxed">
                          Más de 300 conciertos y recitales anuales abiertos al público
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Modal para el Pensum */}
      {showPensum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-7xl max-h-[90vh] overflow-y-auto p-6">
            {/* Título */}
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
              SISTEMA DE RELACIONES DEL PLAN DE ESTUDIO DE LA INSTITUCIÓN
            </h2>

            {/* Imagen del pensum */}
            <div className="flex justify-center">
              <img src={pensumImage} alt="Pensum" className="max-w-full h-auto rounded-lg" />
            </div>

            {/* Botón para cerrar */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowPensum(false)}
                className="px-4 py-2 bg-primary text-white rounded-md font-medium hover:bg-primary/90"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      
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
                  backgroundColor: 'hsl(var(--light-lavender))'
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
