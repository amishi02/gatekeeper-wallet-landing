import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const InteractiveBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Initialize particles
    const initialParticles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(initialParticles);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx > window.innerWidth ? 0 : particle.x + particle.vx < 0 ? window.innerWidth : particle.x + particle.vx,
          y: particle.y + particle.vy > window.innerHeight ? 0 : particle.y + particle.vy < 0 ? window.innerHeight : particle.y + particle.vy,
        }))
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Cursor Following Orb */}
      <div
        className="fixed w-96 h-96 rounded-full opacity-10 pointer-events-none animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: 'blur(40px)',
        }}
      />

      {/* Floating Particles */}
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute rounded-full particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            background: `hsl(var(--primary) / ${particle.opacity})`,
            animationDelay: `${index * 0.1}s`,
          }}
        />
      ))}

      {/* Connecting Lines */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.1" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        
        {particles.map((particle, index) => 
          particles.slice(index + 1).map((otherParticle, otherIndex) => {
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + 
              Math.pow(particle.y - otherParticle.y, 2)
            );
            
            if (distance < 150) {
              return (
                <line
                  key={`${index}-${otherIndex}`}
                  x1={particle.x}
                  y1={particle.y}
                  x2={otherParticle.x}
                  y2={otherParticle.y}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  opacity={Math.max(0, 1 - distance / 150)}
                  className="connection-line"
                />
              );
            }
            return null;
          })
        )}
      </svg>
    </div>
  );
};

export default InteractiveBackground;