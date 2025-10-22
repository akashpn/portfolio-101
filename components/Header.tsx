import React, { useState, useEffect, useRef } from 'react';
import { SECTIONS } from '../constants';
import { SectionId } from '../types';

interface HeaderProps {
  activeSection: SectionId;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [highlightStyle, setHighlightStyle] = useState({});
  const navRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<SectionId, HTMLAnchorElement | null>>(new Map());

  const activeTheme = SECTIONS.find(s => s.id === activeSection)?.theme;

  useEffect(() => {
    const activeItem = itemRefs.current.get(activeSection);
    if (activeItem && navRef.current) {
      const navRect = navRef.current.getBoundingClientRect();
      const itemRect = activeItem.getBoundingClientRect();
      setHighlightStyle({
        width: itemRect.width,
        height: itemRect.height,
        left: itemRect.left - navRect.left,
        backgroundColor: activeTheme?.glowColor.replace('0.2', '0.3').replace('0.25', '0.4'),
      });
    }
  }, [activeSection, activeTheme]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: SectionId) => {
    e.preventDefault();
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <nav ref={navRef} className="relative flex items-center gap-2 rounded-full border border-white/10 bg-black/30 p-2 text-sm shadow-lg backdrop-blur-lg">
        <span
          className="absolute -z-10 rounded-full"
          style={{
            ...highlightStyle,
            transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
        ></span>
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            ref={(el) => itemRefs.current.set(section.id, el)}
            onClick={(e) => handleNavClick(e, section.id)}
            className={`relative rounded-full px-4 py-2 transition-colors duration-300 ${
              activeSection === section.id
                ? 'text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {section.name}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;