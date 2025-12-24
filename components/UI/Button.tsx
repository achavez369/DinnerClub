
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-center";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#1E88E5] to-[#39C6F4] text-white shadow-lg hover:shadow-[#1E88E5]/40",
    secondary: "bg-[#0E2553] text-white hover:bg-[#122e66]",
    outline: "border-2 border-[#1E88E5] text-[#1E88E5] hover:bg-[#1E88E5]/10"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
