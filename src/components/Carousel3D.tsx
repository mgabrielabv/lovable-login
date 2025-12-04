import { useState, useEffect } from 'react';
import movie1 from '@/assets/foto1.jpg';
import movie2 from '@/assets/foto2.jpg';
import movie3 from '@/assets/foto3.jpg';
import movie4 from '@/assets/foto4.jpg';

interface Foto{
  id: number;
  title: string;
  image: string;
}

const fotos: Foto[] = [
  { id: 1, title: "El aplauso es el eco del esfuerzo", image: movie1 },
  { id: 2, title: "Una sola voz es perfecta sintonía", image: movie2 },
  { id: 3, title: "El origen de cada melodía", image: movie3 },
  { id: 4, title: "La armonía se construye en equipo", image: movie4 },
];

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = fotos.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, [totalItems]);

  const renderItems = () => {
    return fotos.map((foto, index) => {
      const distance = Math.abs(index - currentIndex);
      const isCenter = index === currentIndex;
      const isAdjacent = distance === 1;
      const isFar = distance > 1;

      let transform = '';
      let zIndex = 0;
      let scale = 1;
      let opacity = 1;

      if (isCenter) {
        scale = 1.3; // Más grande
        zIndex = 10;
        opacity = 1;
      } else if (isAdjacent) {
        scale = 0.95;
        zIndex = 5;
        opacity = 0.8;
      } else if (isFar) {
        scale = 0.75;
        zIndex = 1;
        opacity = 0.6;
      }

      // Posición horizontal (arco) - Ajustado para centrar y superponer
      const angle = ((index - currentIndex) * 20); // Ángulo para el arco
      const translateX = angle * 10; // Distancia horizontal reducida para mayor proximidad

      transform = `rotateY(${angle}deg) scale(${scale})`;

      return (
      <div
        key={foto.id}
        className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${isCenter ? 'z-10' : 'z-1'}`}
        style={{
          transform: `translateX(${translateX}px) ${transform}`,
          opacity: opacity,
          zIndex: zIndex,
          left: '34%',
          transformOrigin: 'center center',
          // 👇 Añade esto para centrar en móviles
          width: 'auto',
          margin: '20 auto',
        }}
      >
          <div className="w-72 h-56 bg-white rounded-lg overflow-hidden shadow-xl"> {/* Tamaño más grande */}
            <img
              src={foto.image}
              alt={foto.title}
              className="w-full h-full object-cover" // Imagen en horizontal
            />
            <div className="p-4">
              <h3 className="font-bold text-sm truncate">{foto.title}</h3>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
  <div className="relative w-full h-96 flex items-center justify-center my-6 px-4 md:px-8">
    <div className="relative w-full max-w-4xl mx-auto px-4 md:px-8">
      {renderItems()}
    </div>
  </div>
  );
}