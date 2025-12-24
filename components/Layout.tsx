
import React from 'react';
import { Logo } from './UI/Logo';

interface LayoutProps {
  children: React.ReactNode;
  showLogo?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showLogo = true }) => {
  return (
    <div className="min-h-screen bg-navy-gradient flex flex-col items-center p-6 font-sans text-[#0B1B3B]">
      <div className="w-full max-w-md flex flex-col items-center">
        {showLogo && (
          <div className="mb-8 flex flex-col items-center gap-3">
            <Logo className="w-40 h-10" />
            <div className="flex items-center gap-3 w-full justify-center">
              <div className="h-[1px] w-8 bg-white/20"></div>
              <span className="text-white/60 text-[9px] tracking-[0.5em] font-medium uppercase">Experience</span>
              <div className="h-[1px] w-8 bg-white/20"></div>
            </div>
          </div>
        )}
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </div>
    </div>
  );
};
