
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Wheel } from '../components/Wheel';
import { useApp } from '../context/AppContext';

export const Roulette: React.FC = () => {
  const { state, setSpinResult } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.formData) {
      navigate('/');
    }
  }, [state.formData, navigate]);

  const handleFinish = (prize: string) => {
    setSpinResult(prize);
    setTimeout(() => {
      navigate('/premio');
    }, 1500);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-8 py-4 max-w-lg mx-auto overflow-hidden">
        <div className="text-center space-y-3 animate-in fade-in slide-in-from-top-4 duration-700">
          <h1 className="text-4xl font-black text-white leading-none tracking-tight">Ruleta Día Diners</h1>
          <p className="text-white/70 text-sm font-medium max-w-[280px] mx-auto">Pon a prueba tu suerte y gana experiencias únicas</p>
        </div>

        <Wheel onFinished={handleFinish} />
        
        <div className="text-center mt-2">
          <svg viewBox="0 0 100 100" className="w-8 h-8 text-white/20 mx-auto animate-pulse">
            <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="currentColor" />
          </svg>
        </div>
      </div>
    </Layout>
  );
};
