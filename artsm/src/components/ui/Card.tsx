import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glass?: boolean;
}

export function Card({ children, glass = false, className = '', ...props }: CardProps) {
  return (
    <div
      className={`${
        glass 
          ? 'glass-card rounded-xl p-6' 
          : 'bg-slate-900/45 border border-slate-800/80 rounded-xl p-6 hover:border-slate-700/50 transition-all duration-300'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
