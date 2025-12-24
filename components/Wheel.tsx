
import React, { useState } from 'react';
import { PRIZES } from '../types';

interface WheelProps {
  onFinished: (prize: string) => void;
}

const PrizeIcon = ({ name, className }: { name: string, className?: string }) => {
  switch (name) {
    case 'Kit Vino':
      return <path d="M45 20 V80 M35 30 Q50 15 65 30 V80 M30 80 H70 M55 45 Q75 45 75 60 V80" stroke="currentColor" strokeWidth="2.5" fill="none" className={className} />;
    case 'Termo de Acero':
      return <path d="M40 25 Q40 15 50 15 Q60 15 60 25 V80 Q50 85 40 80 Z M45 15 H55" stroke="currentColor" strokeWidth="2.5" fill="none" className={className} />;
    case 'Libro de Recetas':
      return <path d="M30 25 H70 V85 H30 Z M50 25 V85 M35 40 H45 M55 40 H65 M35 55 H45 M55 55 H65" stroke="currentColor" strokeWidth="2.5" fill="none" className={className} />;
    case 'Toalla Premium':
      return <path d="M30 35 H70 V75 H30 Z M30 45 H70 M30 55 H70 M30 65 H70" stroke="currentColor" strokeWidth="2.5" fill="none" className={className} />;
    case 'Prensa Francesa':
      return <path d="M35 30 H65 V85 H35 Z M50 15 V30 M30 35 H70 M40 50 H60" stroke="currentColor" strokeWidth="2.5" fill="none" className={className} />;
    case 'Set Cuchillos':
      return <path d="M35 30 L40 80 M50 20 L55 70 M65 40 L70 90" stroke="currentColor" strokeWidth="2.5" fill="none" className={className} />;
    case 'Velas Aromáticas':
      return <path d="M35 50 V85 H50 V50 Z M55 50 V85 H70 V50 Z M42 35 Q42 50 42 50 M62 35 Q62 50 62 50" stroke="currentColor" strokeWidth="2.5" fill="none" className={className} />;
    case 'Set de Té':
      return <path d="M35 45 Q50 25 65 45 V80 H35 Z M65 55 Q80 55 80 65 Q80 80 65 80" stroke="currentColor" strokeWidth="2.5" fill="none" className={className} />;
    default:
      return null;
  }
};

export const Wheel: React.FC<WheelProps> = ({ onFinished }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  
  const segments = PRIZES.length;
  const anglePerSegment = 360 / segments;
  // Paleta Dia Diners: Cyan, Royal Blue, Navy Blue
  const colors = ['#39C6F4', '#1E88E5', '#0B1B3B', '#1E88E5', '#39C6F4', '#1E88E5', '#0B1B3B', '#1E88E5'];

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    const extraSpins = 10 + Math.floor(Math.random() * 5);
    const randomSegment = Math.floor(Math.random() * segments);
    const stopAngle = (extraSpins * 360) + (randomSegment * anglePerSegment);
    
    setRotation(stopAngle);

    setTimeout(() => {
      setSpinning(false);
      const normalizedRotation = stopAngle % 360;
      const index = (segments - Math.floor(normalizedRotation / anglePerSegment)) % segments;
      onFinished(PRIZES[index]);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-full px-4 overflow-visible">
      <div className="relative w-full max-w-[340px] sm:max-w-[420px] aspect-square flex items-center justify-center">
        {/* Pointer Triangle - White and sharp */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-50 w-8 h-8 drop-shadow-md">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 100 L0 0 H100 Z" fill="white" />
          </svg>
        </div>

        {/* Wheel Container - Uses percentage based width for full responsiveness */}
        <div className="relative w-full h-full p-2 bg-white/10 rounded-full backdrop-blur-sm border-4 border-white shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div 
            className="w-full h-full rounded-full overflow-hidden transition-transform duration-[5000ms] cubic-bezier(0.15, 0, 0.15, 1) border-4 border-white"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {PRIZES.map((prize, i) => {
                const startAngle = i * anglePerSegment;
                const endAngle = (i + 1) * anglePerSegment;
                const midAngle = startAngle + anglePerSegment / 2;
                
                const x1 = 50 + 50 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 50 + 50 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 50 + 50 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 50 + 50 * Math.sin((endAngle - 90) * Math.PI / 180);

                const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`;

                return (
                  <g key={i}>
                    <path d={pathData} fill={colors[i]} stroke="white" strokeWidth="0.3" />
                    <g transform={`rotate(${midAngle} 50 50)`}>
                      {/* Texto curvo o alineado al radio */}
                      <text 
                        x="50" y="14" 
                        textAnchor="middle" 
                        fill="white" 
                        className="font-black uppercase tracking-tighter"
                        style={{ fontSize: '2.4px' }}
                      >
                        {prize}
                      </text>
                      {/* Icono centrado en el segmento */}
                      <g transform="translate(42, 22) scale(0.16)">
                        <PrizeIcon name={prize} className="text-white" />
                      </g>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Central DC Hub - Optimized for "Diners" branding */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full shadow-xl z-20 flex items-center justify-center border-2 border-[#0B1B3B]">
             <div className="w-9 h-9 sm:w-12 sm:h-12 bg-[#0B1B3B] rounded-full flex items-center justify-center">
                <span className="text-white text-[10px] sm:text-sm font-black tracking-tighter">DC</span>
             </div>
          </div>
        </div>
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className={`
          relative z-30 px-16 py-4 rounded-full font-black text-xl tracking-[0.1em] shadow-2xl transition-all duration-300
          ${spinning 
            ? 'bg-gray-200 text-gray-400 scale-95 opacity-80 cursor-not-allowed' 
            : 'bg-white text-[#0B1B3B] hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(255,255,255,0.2)]'
          }
        `}
      >
        {spinning ? 'ESPERA...' : 'GIRAR'}
      </button>
    </div>
  );
};
