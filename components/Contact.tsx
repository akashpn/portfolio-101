import React, { forwardRef } from 'react';
import { SectionId } from '../types';
import AnimateOnScroll from './AnimateOnScroll';

const Contact = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} id={SectionId.Contact} className="min-h-screen flex flex-col justify-center items-center text-center py-20 relative z-10">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Get in Touch
        </h2>
      </AnimateOnScroll>
      <AnimateOnScroll delay={200}>
        <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out.
        </p>
      </AnimateOnScroll>
      <AnimateOnScroll delay={400}>
        <div className="flex flex-col items-center gap-6">
            <a 
              href="mailto:akashpn.work@gmail.com" 
              className="px-8 py-4 text-lg rounded-full bg-red-500/80 text-white font-semibold hover:bg-red-500 transition-colors duration-300 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
            >
              akashpn.work@gmail.com
            </a>
            <div className="flex gap-4">
              <a href="https://github.com/akashpn" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors duration-300">GitHub</a>
              <a href="https://www.linkedin.com/in/akash-pn/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors duration-300">LinkedIn</a>
            </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
});

export default Contact;