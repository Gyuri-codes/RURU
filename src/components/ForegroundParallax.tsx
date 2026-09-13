import React from 'react';

interface ForegroundParallaxProps {
  chapterIndex: number;
  scrollProgress: number;
}

export const ForegroundParallax: React.FC<ForegroundParallaxProps> = ({
  chapterIndex,
  scrollProgress
}) => {
  // Slight parallax offset based on scroll progress
  const shiftY = (scrollProgress * 60) % 40;
  const shiftX = Math.sin(scrollProgress * Math.PI * 4) * 12;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* Top-Right Hanging Pine / Maple Silhouette */}
      <div
        className="absolute -top-10 -right-8 w-64 md:w-96 h-64 md:h-96 opacity-40 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${shiftX}px, ${-shiftY * 0.5}px, 0)`
        }}
      >
        <svg viewBox="0 0 400 400" className="w-full h-full" fill="#040608">
          <path d="M400,0 Q320,60 260,30 Q220,90 180,60 Q140,120 80,100 Q120,150 50,170 Q140,180 180,240 Q250,200 320,260 Q340,180 400,160 Z" />
          <path d="M400,40 Q300,100 240,150 Q280,190 200,230 Q280,240 330,300 Q360,240 400,220 Z" opacity="0.8" />
        </svg>
      </div>

      {/* Bottom-Left Bamboo / Grass Silhouette */}
      <div
        className="absolute -bottom-8 -left-6 w-56 md:w-80 h-56 md:h-80 opacity-35 transition-transform duration-700 ease-out"
        style={{
          transform: `translate3d(${-shiftX * 0.7}px, ${shiftY * 0.4}px, 0)`
        }}
      >
        <svg viewBox="0 0 350 350" className="w-full h-full" fill="#030508">
          {/* Bamboo stalks & leaves */}
          <path d="M30,350 L42,120 L48,120 L36,350 Z" />
          <path d="M42,180 Q10,160 0,140 Q40,160 44,185 Z" />
          <path d="M45,140 Q80,110 110,120 Q60,130 46,145 Z" />

          <path d="M90,350 L104,80 L110,80 L96,350 Z" />
          <path d="M104,130 Q145,105 170,115 Q125,125 106,135 Z" />
          <path d="M100,200 Q50,180 30,160 Q75,185 102,205 Z" />

          <path d="M150,350 L160,160 L166,160 L156,350 Z" />
          <path d="M160,210 Q210,190 240,205 Q185,215 162,215 Z" />
        </svg>
      </div>

      {/* Subtle Mist Band across mid-lower screen */}
      <div
        className="absolute bottom-12 left-0 right-0 h-40 bg-gradient-to-t from-[#06080c]/70 via-[#0a121c]/30 to-transparent opacity-60 pointer-events-none"
      />
    </div>
  );
};
