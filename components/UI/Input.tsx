import React from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>, 'prefix'> {
  label: string;
  error?: string;
  as?: 'input' | 'select';
  containerClassName?: string;
  startAdornment?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  as = 'input', 
  children, 
  containerClassName = '', 
  startAdornment,
  ...props 
}) => {
  const Component = as as any;
  return (
    <div className={`flex flex-col gap-1 w-full ${containerClassName}`}>
      <label className="text-[10px] font-extrabold text-[#667085] uppercase tracking-widest ml-1">{label}</label>
      <div className={`flex items-center rounded-xl border-2 transition-all bg-[#F9FBFF] overflow-hidden min-h-[50px]
        ${error ? 'border-red-400 focus-within:border-red-500' : 'border-[#F0F4F8] focus-within:border-diners-royal focus-within:bg-white'}`}>
        
        {startAdornment && (
          <div className="h-full border-r border-[#F0F4F8] bg-white/50 px-2 flex items-center justify-center">
            {startAdornment}
          </div>
        )}

        <Component
          className="w-full px-4 py-3 bg-transparent text-[#0B1B3B] text-sm font-semibold outline-none placeholder:text-gray-300"
          {...props}
        >
          {children}
        </Component>
      </div>
      {error && <span className="text-[10px] text-red-500 ml-1 font-bold">{error}</span>}
    </div>
  );
};