
import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2000); // Reducido a 2 segundos

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 scale-105 pointer-events-none'
      }`}
      style={{
        background: 'radial-gradient(circle, #0E2553 0%, #050D1D 100%)'
      }}
    >
      <div className="relative flex flex-col items-center">
        <div className="w-20 h-20 animate-[pulse_2s_infinite_ease-in-out]">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            <path 
              d="M50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0ZM50 15V85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15Z" 
              fill="currentColor" 
            />
          </svg>
        </div>
        <div className="mt-8 h-[1px] w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
      </div>
    </div>
  );
};
