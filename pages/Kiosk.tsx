
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/UI/Button';
import { useApp } from '../context/AppContext';

export const Kiosk: React.FC = () => {
  const { setKioskMode, resetApp } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    setKioskMode(true);
  }, [setKioskMode]);

  const handleStart = () => {
    resetApp();
    navigate('/');
  };

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-12 text-center p-4">
        <div className="space-y-4 animate-in zoom-in-90 duration-700">
           <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="w-24 h-24 text-white">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
                  <path d="M50 30L50 70M30 50L70 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
           </div>
           
           <h1 className="text-4xl font-black text-white leading-tight uppercase tracking-tight">
             Experiencia <br/> <span className="text-[#39C6F4]">Diners Club</span>
           </h1>
           <p className="text-white/60 text-lg max-w-xs mx-auto">
             Vive el placer de ganar premios exclusivos diseñados para ti.
           </p>
        </div>

        <Button 
          onClick={handleStart}
          className="px-12 py-6 text-xl rounded-full shadow-2xl"
        >
          EMPEZAR AHORA
        </Button>

        <div className="absolute bottom-10 text-white/20 text-[10px] tracking-[0.3em] uppercase">
          Kiosk Mode Enabled
        </div>
      </div>
    </Layout>
  );
};
