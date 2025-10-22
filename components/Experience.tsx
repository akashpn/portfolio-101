import React, { forwardRef } from 'react';
import { SectionId } from '../types';
import AnimateOnScroll from './AnimateOnScroll';
import { EXPERIENCE_DATA } from '../constants';
import { THEMES } from '../constants';

const Experience = forwardRef<HTMLElement>((props, ref) => {
  const activeTheme = THEMES.teal;

  return (
    <section ref={ref} id={SectionId.Experience} className="min-h-screen flex flex-col justify-center py-20">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">Experience</h2>
      </AnimateOnScroll>
      
      <div className="relative">
        {/* Vertical Timeline Bar */}
        <div className="absolute left-4 top-2 h-full w-0.5 bg-white/10" />
        
        <div className="space-y-12">
          {EXPERIENCE_DATA.map((item, index) => (
            <AnimateOnScroll key={index} delay={index * 150}>
              <div className="relative pl-12 group">
                {/* Timeline Dot */}
                <div 
                  className="absolute left-4 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-500 border-2 border-black group-hover:bg-teal-400 transition-colors duration-300"
                  style={{boxShadow: `0 0 12px ${activeTheme.glowColor.replace('0.2', '0.9')}`}}
                />
                
                <p className="text-sm text-slate-400 mb-1">{item.date}</p>
                <h3 className="text-xl font-bold text-white">{item.role}</h3>
                <h4 className="text-lg font-medium text-slate-300 mb-3">{item.company}</h4>
                <p className="text-slate-400">{item.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Experience;