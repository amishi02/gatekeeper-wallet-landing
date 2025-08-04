import React, { useEffect, useState } from 'react';

const GuideWalletAnimation = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Centered Wallet with Big Coins Animation */}
      <div 
        className="absolute top-1/2 left-1/2 w-80 h-80 -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{
          transform: `translate(-50%, -50%) translateY(${scrollY * 0.1}px) scale(${1 + scrollY * 0.0005})`,
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="walletGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
              <stop offset="50%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="coinGradientBig" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.95" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.85" />
            </linearGradient>
            <radialGradient id="walletGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Wallet Glow Background */}
          <circle
            cx="100"
            cy="100"
            r="60"
            fill="url(#walletGlow)"
            className="animate-pulse-glow"
          />
          
          {/* Wallet Body */}
          <rect
            x="60"
            y="80"
            width="80"
            height="60"
            rx="12"
            fill="url(#walletGradientMain)"
            filter="url(#glow)"
            className="animate-pulse-glow"
          />
          
          {/* Wallet Flap */}
          <rect
            x="60"
            y="70"
            width="80"
            height="20"
            rx="12"
            fill="url(#walletGradientMain)"
            opacity="0.9"
            filter="url(#glow)"
          />
          
          {/* Wallet Lock/Clasp */}
          <rect
            x="95"
            y="75"
            width="10"
            height="8"
            rx="2"
            fill="hsl(var(--primary))"
            opacity="0.8"
          />
          
          {/* Big Coin 1 */}
          {(() => {
            const progress = Math.min(scrollY / 500, 1);
            const coinX = 100 + progress * 60;
            const coinY = 90 - progress * 40;
            const rotation = progress * 360;
            return (
              <g 
                transform={`translate(${coinX}, ${coinY}) rotate(${rotation})`}
                style={{ opacity: Math.min(progress * 2, 1) }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="12"
                  fill="url(#coinGradientBig)"
                  filter="url(#glow)"
                  className="animate-pulse-glow"
                />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fontSize="8"
                  fill="hsl(var(--primary-foreground))"
                  fontWeight="bold"
                >
                  $
                </text>
              </g>
            );
          })()}
          
          {/* Big Coin 2 */}
          {(() => {
            const progress = Math.max(0, Math.min((scrollY - 200) / 500, 1));
            const coinX = 100 - progress * 70;
            const coinY = 85 - progress * 50;
            const rotation = progress * -270;
            return (
              <g 
                transform={`translate(${coinX}, ${coinY}) rotate(${rotation})`}
                style={{ opacity: Math.min(progress * 2, 1) }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="14"
                  fill="url(#coinGradientBig)"
                  filter="url(#glow)"
                  className="animate-pulse-glow"
                />
                <text
                  x="0"
                  y="3"
                  textAnchor="middle"
                  fontSize="10"
                  fill="hsl(var(--primary-foreground))"
                  fontWeight="bold"
                >
                  ₿
                </text>
              </g>
            );
          })()}
          
          {/* Big Coin 3 */}
          {(() => {
            const progress = Math.max(0, Math.min((scrollY - 400) / 500, 1));
            const coinX = 100 + progress * 40;
            const coinY = 95 - progress * 60;
            const rotation = progress * 180;
            return (
              <g 
                transform={`translate(${coinX}, ${coinY}) rotate(${rotation})`}
                style={{ opacity: Math.min(progress * 2, 1) }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="13"
                  fill="url(#coinGradientBig)"
                  filter="url(#glow)"
                  className="animate-pulse-glow"
                />
                <text
                  x="0"
                  y="2"
                  textAnchor="middle"
                  fontSize="9"
                  fill="hsl(var(--primary-foreground))"
                  fontWeight="bold"
                >
                  Ξ
                </text>
              </g>
            );
          })()}
          
          {/* Sparkle Effects */}
          {Array.from({ length: 8 }).map((_, index) => {
            const delay = index * 0.2;
            const sparkleProgress = Math.max(0, (scrollY - delay * 100) / 300);
            const angle = (index * 45) + sparkleProgress * 90;
            const distance = 40 + sparkleProgress * 20;
            const sparkleX = 100 + Math.cos(angle * Math.PI / 180) * distance;
            const sparkleY = 100 + Math.sin(angle * Math.PI / 180) * distance;
            
            return (
              <circle
                key={index}
                cx={sparkleX}
                cy={sparkleY}
                r="2"
                fill="hsl(var(--primary))"
                style={{
                  opacity: Math.max(0, Math.min(sparkleProgress * 3, 1) - sparkleProgress * 0.5),
                  animationDelay: `${delay}s`,
                }}
                className="animate-pulse-glow"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default GuideWalletAnimation;