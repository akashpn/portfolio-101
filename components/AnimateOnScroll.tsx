import React from 'react';
import { useInView } from '../hooks/useInView';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in ms
  // FIX: Replaced `keyof JSX.IntrinsicElements` with `React.ElementType` to resolve "Cannot find namespace 'JSX'".
  as?: React.ElementType;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({ children, className = '', delay = 0, as: Element = 'div' }) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <Element
      ref={ref}
      className={`${className} animate-reveal-wrapper`}
    >
      <div
        className={`animate-reveal ${isInView ? 'is-visible' : ''}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </Element>
  );
};

export default AnimateOnScroll;