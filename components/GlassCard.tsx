import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  glowColor: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, glowColor }) => {
  return (
    <div 
      className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-400 hover:scale-[1.03] hover:border-white/20"
      style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 40px -10px ${glowColor.replace('0.2', '0.6').replace('0.25', '0.8')}`
        }}
      />
      <div className="relative">
        {children}
      </div>
    </div>
  );
};

export default GlassCard;