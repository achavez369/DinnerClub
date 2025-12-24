
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label: string;
  error?: string;
  as?: 'input' | 'select';
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, as = 'input', children, containerClassName = '', ...props }) => {
  const Component = as as any;
  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      <label className="text-[11px] font-bold text-[#667085] uppercase tracking-wider ml-1">{label}</label>
      <Component
        className={`px-4 py-3.5 rounded-xl border-2 transition-all outline-none bg-white text-[#0B1B3B] text-sm placeholder:text-[#667085]/40
          ${error ? 'border-red-400 focus:border-red-500' : 'border-[#F3F6FB] focus:border-[#1E88E5]'}`}
        {...props}
      >
        {children}
      </Component>
      {error && <span className="text-[10px] text-red-500 ml-1 font-medium">{error}</span>}
    </div>
  );
};
