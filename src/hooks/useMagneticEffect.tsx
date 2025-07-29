import { useRef, useEffect } from 'react';

export const useMagneticEffect = <T extends Element = HTMLElement>(strength: number = 0.3) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      if (element instanceof HTMLElement || element instanceof SVGElement) {
        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    };

    const handleMouseLeave = () => {
      if (element instanceof HTMLElement || element instanceof SVGElement) {
        element.style.transform = 'translate(0px, 0px)';
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
};

export default useMagneticEffect;