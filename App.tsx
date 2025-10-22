import React, { useState, useRef, useEffect, useMemo } from 'react';
import { SECTIONS, THEMES } from './constants';
import { SectionId, SectionTheme } from './types';
import { useSectionObserver } from './hooks/useSectionObserver';
import { useSmoothFollow } from './hooks/useSmoothFollow';
import Header from './components/Header';
import Blob from './components/Blob';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ParticleCanvas from './components/ParticleCanvas';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.About);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const smoothPosition = useSmoothFollow(mousePosition, 0.04);

  const aboutRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const sectionRefs = useMemo(() => [
    { id: SectionId.About, ref: aboutRef },
    { id: SectionId.Projects, ref: projectsRef },
    { id: SectionId.Skills, ref: skillsRef },
    { id: SectionId.Contact, ref: contactRef },
  ], []);

  useSectionObserver(sectionRefs, setActiveSection);

  const activeTheme = SECTIONS.find(s => s.id === activeSection)?.theme || THEMES.blue;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const renderSection = (id: SectionId) => {
    switch (id) {
      case SectionId.About:
        return <About ref={aboutRef} />;
      case SectionId.Projects:
        return <Projects ref={projectsRef} activeTheme={activeTheme} />;
      case SectionId.Skills:
        return <Skills ref={skillsRef} activeTheme={SECTIONS.find(s => s.id === SectionId.Skills)!.theme} mousePosition={mousePosition} />;
      case SectionId.Contact:
        return <Contact ref={contactRef} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor activeTheme={activeTheme} />
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-colors duration-1000" 
        style={{
          background: `radial-gradient(1200px at ${smoothPosition.x}px ${smoothPosition.y}px, ${activeTheme.glowColor.replace('0.25', '0.1')}, transparent 80%)`
        }}
      />
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-colors duration-1000" 
        style={{
          background: `radial-gradient(600px at ${smoothPosition.x}px ${smoothPosition.y}px, ${activeTheme.glowColor}, transparent 80%)`
        }}
      />
      <ParticleCanvas 
        isActive={activeSection === SectionId.Contact} 
        themeColor={THEMES.red.glowColor} 
        mousePosition={mousePosition}
      />
      <Blob theme={activeTheme} position={smoothPosition} />
      <Header activeSection={activeSection} />
      <main className="relative z-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          {SECTIONS.map(section => (
            <div key={section.id}>
              {renderSection(section.id)}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;