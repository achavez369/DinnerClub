
import React from 'react';
import { Logo } from './UI/Logo';

interface LayoutProps {
  children: React.ReactNode;
  showLogo?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showLogo = true }) => {
  return (
    <div className="min-h-screen bg-navy-gradient flex flex-col items-center p-4 sm:p-6 md:p-8 font-['Inter']">
      <div className="w-full max-w-md flex flex-col items-center">
        {showLogo && (
          <div className="mb-10 flex flex-col items-center gap-4">
            <Logo className="w-48 h-12" />
            <div className="h-px w-12 bg-white/20"></div>
            <span className="text-white/60 text-[10px] tracking-[0.4em] font-light uppercase">Experience</span>
          </div>
        )}
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </div>
      </div>
    </div>
  );
};
