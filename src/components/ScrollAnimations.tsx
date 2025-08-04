import React, { useEffect, useState } from 'react';

const ScrollAnimations = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Trigger animations for elements in view
      const elements = document.querySelectorAll('.scroll-trigger');
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isInView) {
          element.classList.add('in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Parallax Background Elements */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 animate-rotate-slow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`,
          filter: 'blur(60px)',
        }}
      />
      
      <div
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-15 animate-tilt"
        style={{
          background: 'radial-gradient(circle, hsl(var(--secondary)) 0%, transparent 70%)',
          transform: `translateY(${scrollY * -0.2}px) rotate(${-scrollY * 0.05}deg)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Floating Connection Visualization */}
      <div 
        className="absolute top-1/2 left-1/2 w-64 h-64 opacity-30"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)`,
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          
          {/* Connection Nodes */}
          <circle cx="50" cy="50" r="8" fill="hsl(var(--primary))" opacity="0.8" className="animate-pulse-glow" />
          <circle cx="150" cy="50" r="6" fill="hsl(var(--secondary))" opacity="0.6" className="animate-float" />
          <circle cx="100" cy="100" r="10" fill="hsl(var(--primary))" opacity="0.9" className="animate-pulse-glow" />
          <circle cx="50" cy="150" r="7" fill="hsl(var(--secondary))" opacity="0.7" className="animate-float" />
          <circle cx="150" cy="150" r="5" fill="hsl(var(--primary))" opacity="0.5" className="animate-pulse-glow" />
          
          {/* Connection Lines */}
          <path
            d="M50,50 Q100,75 150,50 Q125,100 100,100 Q75,125 50,150 Q100,125 150,150"
            fill="none"
            stroke="url(#connectionGradient)"
            strokeWidth="2"
            className="connection-line"
            style={{
              animationDelay: `${scrollY * 0.01}s`,
            }}
          />
        </svg>
      </div>

      {/* Security Shield Animation */}
      <div 
        className="absolute top-1/4 right-1/4 w-32 h-32 opacity-25"
        style={{
          transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * 0.02}deg)`,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path
            d="M50,10 L20,25 L20,50 C20,70 35,85 50,90 C65,85 80,70 80,50 L80,25 Z"
            fill="url(#shieldGradient)"
            className="animate-pulse-glow"
          />
          <path
            d="M50,20 L30,30 L30,50 C30,65 40,75 50,80 C60,75 70,65 70,50 L70,30 Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            className="connection-line"
          />
        </svg>
      </div>
    </div>
  );
};

export default ScrollAnimations;