
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Button } from '../components/UI/Button';
import { useApp } from '../context/AppContext';

export const Prize: React.FC = () => {
  const { state, resetApp } = useApp();
  const navigate = useNavigate();

  const handleFinalize = () => {
    resetApp();
    navigate(state.isKioskMode ? '/kiosco' : '/');
  };

  if (!state.spinResult) {
    return null;
  }

  return (
    <Layout>
      <div className="bg-white/95 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-2xl flex flex-col items-center text-center gap-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-4xl">
           🎁
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-[#0B1B3B]">¡FELICIDADES!</h1>
          <p className="text-[#667085] font-medium">Has ganado el siguiente premio:</p>
        </div>

        <div className="w-full p-6 bg-[#F3F6FB] rounded-2xl border-2 border-dashed border-[#1E88E5]/30">
          <span className="text-2xl font-bold text-[#1E88E5] block uppercase">
            {state.spinResult}
          </span>
        </div>

        <div className="space-y-4 w-full">
          <div className="bg-navy-900 text-white p-4 rounded-xl space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-white/50">Código de Canje</span>
            <span className="text-xl font-mono font-bold block">{state.redeemCode}</span>
          </div>
          
          <p className="text-xs text-[#667085] leading-relaxed">
            Muestra esta pantalla al staff para reclamar tu premio.
            Una vez finalizado, no podrás volver a participar.
          </p>
        </div>

        <Button 
          fullWidth 
          onClick={handleFinalize}
          className="mt-2"
        >
          {state.isKioskMode ? 'SIGUIENTE PARTICIPANTE' : 'FINALIZAR'}
        </Button>
      </div>
    </Layout>
  );
};
