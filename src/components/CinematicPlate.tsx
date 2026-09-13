import React from 'react';

interface CinematicPlateProps {
  frameId: string;
  category: string;
  className?: string;
}

export const CinematicPlate: React.FC<CinematicPlateProps> = ({
  frameId,
  category,
  className = ''
}) => {
  // Render high-fidelity SVG artwork plates reflecting each chapter's exact visual theme
  switch (frameId) {
    case 'FRAME 01':
      // The Approach: Dark mountain trail, stone lanterns, cedar silhouettes, rain reflections
      return (
        <svg
          viewBox="0 0 600 400"
          className={`w-full h-full object-cover select-none ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g1-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#040609" />
              <stop offset="60%" stopColor="#0a121c" />
              <stop offset="100%" stopColor="#141a24" />
            </linearGradient>
            <radialGradient id="g1-lantern" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb259" stopOpacity="0.9" />
              <stop offset="40%" stopColor="#e87a2a" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#080c14" stopOpacity="0" />
            </radialGradient>
            <filter id="f-blur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          {/* Night Sky */}
          <rect width="600" height="400" fill="url(#g1-sky)" />
          {/* Distant Mountain Silhouettes */}
          <path d="M0,280 Q140,210 320,240 T600,210 L600,400 L0,400 Z" fill="#070c14" opacity="0.9" />
          <path d="M-50,310 Q180,260 410,280 T650,250 L650,400 L-50,400 Z" fill="#0b1118" />

          {/* Stone Path & Mossy Steps */}
          <polygon points="180,400 420,400 330,280 270,280" fill="#131b24" />
          <line x1="220" y1="360" x2="380" y2="360" stroke="#1d2836" strokeWidth="6" />
          <line x1="240" y1="330" x2="360" y2="330" stroke="#1d2836" strokeWidth="5" />
          <line x1="255" y1="305" x2="345" y2="305" stroke="#1d2836" strokeWidth="4" />

          {/* Glowing Stone Lantern (Ishidōrō) */}
          <circle cx="210" cy="305" r="45" fill="url(#g1-lantern)" filter="url(#f-blur)" />
          <rect x="202" y="295" width="16" height="20" fill="#202a36" />
          <rect x="204" y="300" width="12" height="10" fill="#ffd48a" />
          <polygon points="195,295 225,295 210,282" fill="#18222d" />
          <rect x="206" y="315" width="8" height="24" fill="#151d27" />

          {/* Wet Ground Reflections */}
          <ellipse cx="210" cy="342" rx="35" ry="6" fill="#e8853a" opacity="0.3" filter="url(#f-blur)" />

          {/* Cedar / Cypress Tree Silhouettes */}
          <path d="M70,400 L95,120 L110,400 Z" fill="#040608" />
          <path d="M40,240 Q100,200 160,235 Q110,180 180,160 Q100,120 150,90 Q90,50 100,30 Q80,70 40,110 Z" fill="#06090d" />
          <path d="M520,400 L490,140 L480,400 Z" fill="#040608" />
          <path d="M440,220 Q500,180 560,210 Q510,150 580,130 Q490,90 520,40 Z" fill="#06090d" />

          {/* Falling Rain Streaks */}
          <line x1="120" y1="40" x2="110" y2="80" stroke="#8fa0b5" strokeWidth="1" opacity="0.4" />
          <line x1="280" y1="120" x2="270" y2="170" stroke="#8fa0b5" strokeWidth="1.2" opacity="0.5" />
          <line x1="430" y1="60" x2="420" y2="100" stroke="#8fa0b5" strokeWidth="1" opacity="0.4" />
          <line x1="360" y1="210" x2="350" y2="250" stroke="#8fa0b5" strokeWidth="1" opacity="0.3" />
        </svg>
      );

    case 'FRAME 02':
      // The Gate: Grand vermilion Torii, heavy mist, warm lanterns
      return (
        <svg
          viewBox="0 0 600 400"
          className={`w-full h-full object-cover select-none ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g2-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06080e" />
              <stop offset="70%" stopColor="#0f1724" />
              <stop offset="100%" stopColor="#1a222e" />
            </linearGradient>
            <radialGradient id="g2-lantern" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffb969" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#d96b27" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#080c14" stopOpacity="0" />
            </radialGradient>
            <filter id="f2-mist">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>
          <rect width="600" height="400" fill="url(#g2-sky)" />

          {/* Distant Vermilion Moon Halo */}
          <circle cx="480" cy="110" r="38" fill="#c83f24" opacity="0.85" />
          <circle cx="480" cy="110" r="60" fill="#a42813" opacity="0.2" filter="url(#f2-mist)" />

          {/* Drifting Mist Layers */}
          <ellipse cx="300" cy="280" rx="360" ry="50" fill="#2a394a" opacity="0.4" filter="url(#f2-mist)" />
          <ellipse cx="220" cy="330" rx="280" ry="40" fill="#1b2633" opacity="0.6" filter="url(#f2-mist)" />

          {/* Grand Torii Gate Structure */}
          {/* Main Kasagi curved beam */}
          <path d="M120,135 Q300,122 480,135 L475,150 Q300,138 125,150 Z" fill="#b0341e" />
          <path d="M110,132 Q300,118 490,132 L490,138 Q300,124 110,138 Z" fill="#151211" />
          {/* Tie Beam (Nuki) */}
          <rect x="150" y="175" width="300" height="12" fill="#a6301b" />
          {/* Pillars */}
          <polygon points="190,145 204,145 212,380 196,380" fill="#992a17" />
          <polygon points="410,145 396,145 388,380 404,380" fill="#992a17" />
          {/* Pillar Black Base Sleeves */}
          <rect x="194" y="340" width="20" height="40" fill="#161517" />
          <rect x="386" y="340" width="20" height="40" fill="#161517" />
          {/* Central Plaque */}
          <rect x="286" y="145" width="28" height="36" fill="#181515" />
          <rect x="290" y="149" width="20" height="28" fill="#caa048" />

          {/* Twin Warm Glow Lanterns */}
          <circle cx="130" cy="310" r="40" fill="url(#g2-lantern)" filter="url(#f2-mist)" />
          <circle cx="470" cy="310" r="40" fill="url(#g2-lantern)" filter="url(#f2-mist)" />
          <rect x="124" y="302" width="12" height="16" fill="#ffde96" />
          <rect x="464" y="302" width="12" height="16" fill="#ffde96" />

          {/* Floating Vermilion Maple Leaves (Momiji) */}
          <path d="M260,220 Q268,214 274,222 Q270,228 260,220 Z" fill="#cf3b20" opacity="0.9" />
          <path d="M340,195 Q348,188 355,196 Q350,204 340,195 Z" fill="#e8612c" opacity="0.8" />
          <path d="M180,260 Q188,252 195,262 Q188,270 180,260 Z" fill="#cf3b20" opacity="0.85" />
        </svg>
      );

    case 'FRAME 03':
      // The Garden: Karesansui raked sand lines, mossy boulders, moonlit water reflection
      return (
        <svg
          viewBox="0 0 600 400"
          className={`w-full h-full object-cover select-none ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g3-bg" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#05080c" />
              <stop offset="60%" stopColor="#0c131d" />
              <stop offset="100%" stopColor="#151e29" />
            </linearGradient>
            <radialGradient id="g3-moonlight" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#89a8c7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#05080c" stopOpacity="0" />
            </radialGradient>
            <filter id="f3-blur">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>
          <rect width="600" height="400" fill="url(#g3-bg)" />

          {/* Moonlight pool */}
          <ellipse cx="440" cy="180" rx="120" ry="70" fill="url(#g3-moonlight)" filter="url(#f3-blur)" />

          {/* Raked Gravel Sand Curves (Karesansui Waves) */}
          <path d="M-20,380 Q200,320 420,350 T620,320" stroke="#253242" strokeWidth="2.5" fill="none" />
          <path d="M-20,350 Q200,290 420,320 T620,290" stroke="#253242" strokeWidth="2.5" fill="none" />
          <path d="M-20,320 Q200,260 420,290 T620,260" stroke="#253242" strokeWidth="2.5" fill="none" />
          <path d="M-20,290 Q200,230 420,260 T620,230" stroke="#253242" strokeWidth="2.5" fill="none" />

          {/* Concentric ripples around the main garden stone */}
          <ellipse cx="380" cy="270" rx="80" ry="26" stroke="#2e3e52" strokeWidth="2" fill="none" />
          <ellipse cx="380" cy="270" rx="60" ry="19" stroke="#2e3e52" strokeWidth="2" fill="none" />
          <ellipse cx="380" cy="270" rx="42" ry="13" stroke="#2e3e52" strokeWidth="2" fill="none" />

          {/* Sculptural Garden Rocks with Moss */}
          <path d="M340,280 Q370,220 405,240 Q435,260 420,285 Q380,295 340,280 Z" fill="#121820" />
          <path d="M355,255 Q380,230 405,245 Q385,260 355,255 Z" fill="#182d23" />

          {/* Tsukubai Water Basin on Left */}
          <ellipse cx="140" cy="310" rx="45" ry="24" fill="#19222c" />
          <ellipse cx="140" cy="308" rx="38" ry="18" fill="#132a3e" />
          {/* Water reflection of the moon */}
          <circle cx="146" cy="307" r="8" fill="#d95438" opacity="0.75" />
          <circle cx="146" cy="307" r="14" fill="#a43521" opacity="0.3" filter="url(#f3-blur)" />

          {/* Bamboo Water Spout (Kakehi) */}
          <line x1="60" y1="280" x2="135" y2="295" stroke="#2c3a2a" strokeWidth="6" strokeLinecap="round" />
          <line x1="135" y1="295" x2="137" y2="307" stroke="#89b2d8" strokeWidth="1.5" opacity="0.7" />

          {/* Weeping Maple Silhouette Foliage */}
          <path d="M0,0 Q180,60 280,160 Q210,130 140,180 Q80,120 0,160 Z" fill="#080b0f" opacity="0.95" />
          <circle cx="210" cy="120" r="3" fill="#c84b31" />
          <circle cx="245" cy="140" r="3" fill="#e87a2a" />
          <circle cx="180" cy="155" r="2.5" fill="#c84b31" />
        </svg>
      );

    case 'FRAME 04':
      // The Sanctuary: Dark cedar pillars, shoji paper screen, glowing bronze lantern, incense smoke
      return (
        <svg
          viewBox="0 0 600 400"
          className={`w-full h-full object-cover select-none ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g4-chamber" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#080605" />
              <stop offset="50%" stopColor="#140f0c" />
              <stop offset="100%" stopColor="#1a1410" />
            </linearGradient>
            <radialGradient id="g4-amber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffc566" stopOpacity="0.95" />
              <stop offset="35%" stopColor="#e88528" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#87350f" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#080605" stopOpacity="0" />
            </radialGradient>
            <filter id="f4-smoke">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          <rect width="600" height="400" fill="url(#g4-chamber)" />

          {/* Glowing Shoji Grid Wall in background */}
          <rect x="220" y="80" width="280" height="240" fill="#ffdca3" opacity="0.18" />
          {/* Shoji Lattice Lines */}
          <line x1="220" y1="120" x2="500" y2="120" stroke="#251a14" strokeWidth="2" />
          <line x1="220" y1="160" x2="500" y2="160" stroke="#251a14" strokeWidth="2" />
          <line x1="220" y1="200" x2="500" y2="200" stroke="#251a14" strokeWidth="2" />
          <line x1="220" y1="240" x2="500" y2="240" stroke="#251a14" strokeWidth="2" />
          <line x1="220" y1="280" x2="500" y2="280" stroke="#251a14" strokeWidth="2" />
          <line x1="280" y1="80" x2="280" y2="320" stroke="#251a14" strokeWidth="2" />
          <line x1="350" y1="80" x2="350" y2="320" stroke="#251a14" strokeWidth="2" />
          <line x1="420" y1="80" x2="420" y2="320" stroke="#251a14" strokeWidth="2" />

          {/* Giant Ancient Cedar Pillars */}
          <rect x="40" y="0" width="70" height="400" fill="#0d0907" />
          <line x1="110" y1="0" x2="110" y2="400" stroke="#2a1e17" strokeWidth="3" />
          <rect x="490" y="0" width="80" height="400" fill="#0d0907" />
          <line x1="490" y1="0" x2="490" y2="400" stroke="#2a1e17" strokeWidth="3" />

          {/* Polished Lacquer Floor with Amber Reflection */}
          <polygon points="0,320 600,320 600,400 0,400" fill="#090706" />
          <ellipse cx="290" cy="355" rx="140" ry="25" fill="#f09632" opacity="0.25" filter="url(#f4-smoke)" />

          {/* Hanging Ornate Bronze Chōchin Lantern */}
          <line x1="290" y1="0" x2="290" y2="150" stroke="#221813" strokeWidth="4" />
          <circle cx="290" cy="205" r="95" fill="url(#g4-amber)" filter="url(#f4-smoke)" />
          {/* Lantern Body */}
          <polygon points="265,155 315,155 325,230 255,230" fill="#1f1510" />
          <rect x="272" y="170" width="36" height="48" fill="#ffe09c" />
          <polygon points="250,155 330,155 290,140" fill="#2d1e16" />
          <rect x="282" y="230" width="16" height="15" fill="#caa048" />

          {/* Incense Burner (Kōro) & Soft Tendrils of Smoke */}
          <path d="M165,330 Q175,300 195,300 Q215,300 225,330 Z" fill="#181310" />
          <path d="M195,295 Q190,260 205,240 Q215,220 200,195 Q215,170 210,140" stroke="#c0b5a8" strokeWidth="1.5" fill="none" opacity="0.35" filter="url(#f4-smoke)" />
        </svg>
      );

    case 'FRAME 05':
    default:
      // Afterlight: Mountain ridge panorama, low vermilion moon, blue charcoal ridges, dawn horizon
      return (
        <svg
          viewBox="0 0 600 400"
          className={`w-full h-full object-cover select-none ${className}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="g5-sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#04060b" />
              <stop offset="45%" stopColor="#0c1422" />
              <stop offset="75%" stopColor="#1e2230" />
              <stop offset="100%" stopColor="#2c1f24" />
            </linearGradient>
            <radialGradient id="g5-moon" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e84a28" />
              <stop offset="85%" stopColor="#b52c16" />
              <stop offset="100%" stopColor="#7a1708" />
            </radialGradient>
            <filter id="f5-glow">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </defs>
          <rect width="600" height="400" fill="url(#g5-sky)" />

          {/* Low Horizon Glowing Vermilion Moon */}
          <circle cx="340" cy="220" r="54" fill="#a42813" opacity="0.3" filter="url(#f5-glow)" />
          <circle cx="340" cy="220" r="42" fill="url(#g5-moon)" />

          {/* Layered Mountain Ridges in Blue Charcoal & Slate */}
          {/* Ridge 4 (furthest) */}
          <path d="M0,250 Q160,200 320,230 T600,190 L600,400 L0,400 Z" fill="#121a28" />
          {/* Ridge 3 */}
          <path d="M-40,280 Q190,235 400,265 T640,220 L640,400 L-40,400 Z" fill="#0d1420" />
          {/* Ridge 2 (Valley Mist Layer) */}
          <ellipse cx="300" cy="290" rx="380" ry="25" fill="#202b3a" opacity="0.45" filter="url(#f5-glow)" />
          {/* Ridge 1 (nearest foreground) */}
          <path d="M0,320 Q220,270 450,300 T600,280 L600,400 L0,400 Z" fill="#070b10" />

          {/* Wooden Overlook Engawa Silhouette */}
          <polygon points="0,350 240,350 180,400 0,400" fill="#040608" />
          <line x1="0" y1="335" x2="210" y2="335" stroke="#992a17" strokeWidth="4" />
          <line x1="50" y1="335" x2="50" y2="400" stroke="#120e0c" strokeWidth="5" />
          <line x1="140" y1="335" x2="140" y2="400" stroke="#120e0c" strokeWidth="5" />

          {/* Twin Stone Lantern silhouette on the deck */}
          <rect x="180" y="318" width="14" height="20" fill="#ffde96" opacity="0.9" />
          <circle cx="187" cy="328" r="28" fill="#e87a2a" opacity="0.4" filter="url(#f5-glow)" />
          <polygon points="172,318 202,318 187,306" fill="#151a22" />

          {/* Flying Bird / Night Heron Silhouette */}
          <path d="M380,140 Q390,132 400,138 Q410,132 420,140 Q410,136 400,142 Q390,136 380,140 Z" fill="#0a0f16" />
        </svg>
      );
  }
};
