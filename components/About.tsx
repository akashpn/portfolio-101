import React, { forwardRef } from 'react';
import { SectionId } from '../types';
import AnimateOnScroll from './AnimateOnScroll';

const About = forwardRef<HTMLElement>((props, ref) => {
  return (
    <section ref={ref} id={SectionId.About} className="min-h-screen flex flex-col justify-center items-start py-20">
      <AnimateOnScroll as="div" className="text-5xl md:text-8xl font-black text-white tracking-tight py-2">
        Akash.
      </AnimateOnScroll>
      <AnimateOnScroll as="div" className="text-2xl md:text-4xl font-medium text-slate-300 tracking-tight py-1" delay={200}>
        Software & Web Developer.
      </AnimateOnScroll>
      <AnimateOnScroll as="p" className="mt-6 max-w-2xl text-lg md:text-xl text-slate-400" delay={400}>
        I specialize in crafting dynamic and engaging digital experiences, transforming complex problems into elegant, user-centric solutions. My passion lies at the intersection of clean code and intuitive design.
      </AnimateOnScroll>
    </section>
  );
});

export default About;