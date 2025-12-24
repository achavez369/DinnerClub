
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12" }) => (
  <div className={`${className} flex items-center justify-center`}>
    <img 
      src="https://www.dinersclub.pe/themes/custom/dinersclubperu/assets/images/logo-diners-white.svg" 
      alt="Diners Club International" 
      className="w-full h-full object-contain"
      style={{ minWidth: '100%' }}
    />
  </div>
);
