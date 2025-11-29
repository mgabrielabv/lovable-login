// src/components/HistoryScroll.tsx
import React, { useState } from 'react';

const HistoryScroll = () => {
  const [isRolled, setIsRolled] = useState(true);

  const toggleScroll = () => {
    if (isRolled) {
      setIsRolled(false);
    }
  };

  return (
    <div
      className="relative w-full max-w-4xl mx-auto bg-[#e8d5b5] rounded-xl shadow-lg overflow-hidden cursor-pointer"
      onClick={toggleScroll}
      aria-label="Abrir historia del conservatorio"
    >
      {/* Rollo cerrado (solo el lazo) */}
      {isRolled && (
        <div className="h-48 flex items-center justify-center relative">
          <div className="absolute top-4 right-4 w-8 h-8 bg-[#5d0067] rounded-full"></div>
          <p className="text-[#5d0067] text-lg font-medium">Haz clic para ver la historia</p>
        </div>
      )}

      {/* Rollo abierto (texto visible) */}
      {!isRolled && (
        <div className="p-8">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#5d0067] mb-6 text-center">
            Historia
          </h2>
          <p className="font-serif text-xl text-[#5d0067] text-center leading-relaxed">
            Fundado en 1985, el Conservatorio José Luis Paz ha formado a generaciones de músicos destacados.
            Con casi 40 años de trayectoria, somos un referente en educación musical de excelencia.
          </p>

          {/* Simulación de pluma y tinta (estática, sin animación compleja) */}
          <div className="flex justify-center mt-6 space-x-4">
            <svg width="24" height="24" fill="#5d0067" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.88-.69 6.9L12 19l-4.31 2.16-.69-6.9-5-4.88 6.91-1.01L12 2z"/>
            </svg>
            <div className="w-6 h-6 bg-[#5d0067]/20 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryScroll;