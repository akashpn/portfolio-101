
import { useEffect, RefObject } from 'react';
import { SectionId } from '../types';

interface SectionRef {
  id: SectionId;
  ref: RefObject<HTMLElement>;
}

export const useSectionObserver = (
  sectionRefs: SectionRef[],
  setActiveSection: (id: SectionId) => void
) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id as SectionId;
            setActiveSection(id);
          }
        });
      },
      {
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0,
      }
    );

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionRefs, setActiveSection]);
};
