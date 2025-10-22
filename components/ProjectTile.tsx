import React from 'react';

interface ProjectTileProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  glowColor: string;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ icon, title, description, glowColor }) => {
  return (
    <div 
      className="group h-full relative p-6 aspect-square flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-400 hover:scale-[1.03] hover:border-white/20"
      style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
    >
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          boxShadow: `0 0 40px -10px ${glowColor.replace('0.2', '0.6').replace('0.25', '0.8')}`
        }}
      />
      <div className="relative text-center flex flex-col items-center">
        {/* Default State */}
        <div className="transition-opacity duration-300 group-hover:opacity-0">
          {icon}
          <h3 className="text-md font-bold text-white mt-2 capitalize">{title}</h3>
        </div>
        
        {/* Hover State */}
        <div className="absolute inset-0 p-4 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
          <h3 className="text-md font-bold text-white capitalize mb-1">{title}</h3>
          <p className="text-sm text-slate-400 leading-snug">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;