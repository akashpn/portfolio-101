import { useState, useEffect, useRef, RefObject } from 'react';

// options: https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
export const useInView = (options?: IntersectionObserverInit): [RefObject<any>, boolean] => {
  const ref = useRef<any>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Trigger when the element is intersecting
      if (entry.isIntersecting) {
        setIsInView(true);
        // Stop observing the element after it has been seen.
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]); // Re-run effect if options change

  return [ref, isInView];
};
