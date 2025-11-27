import React, { useEffect, useState } from "react";
import "./MusicalNotesRain.css";

interface Note {
  id: number;
  left: number;
  symbol: string;
  size: number;
  duration: number;
  delay: number;
}

const MusicalNotesRain: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newNote: Note = {
        id: Date.now(),
        left: Math.random() * 100, // posición horizontal
        symbol: Math.random() > 0.5 ? "♪" : "♫",
        size: 16 + Math.random() * 24, // tamaño entre 16px y 40px
        duration: 4 + Math.random() * 4, // duración entre 4s y 8s
        delay: Math.random() * 2, // desfase hasta 2s
      };
      setNotes((prev) => [...prev, newNote]);
    }, 700); // cada 0.7s aparece una nueva nota

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="notes-rain">
      {notes.map((note) => (
        <div
          key={note.id}
          className="note"
          style={{
            left: `${note.left}%`,
            fontSize: `${note.size}px`,
            animationDuration: `${note.duration}s`,
            animationDelay: `${note.delay}s`,
          }}
        >
          {note.symbol}
        </div>
      ))}
    </div>
  );
};

export default MusicalNotesRain;