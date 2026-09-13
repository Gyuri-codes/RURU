import React, { useState } from 'react';
import { Maximize2, Compass, Eye, Check } from 'lucide-react';
import { ChapterData } from '../types';
import { CinematicPlate } from './CinematicPlate';
import { audioEngine } from './AudioEngine';

interface CinematicCardProps {
  chapter: ChapterData;
  positionClass?: string;
  onInspect?: (chapter: ChapterData) => void;
}

export const CinematicCard: React.FC<CinematicCardProps> = ({
  chapter,
  positionClass = '',
  onInspect
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const { frame } = chapter;

  const handleCardClick = () => {
    audioEngine.playTempleBell(280);
    if (onInspect) {
      onInspect(chapter);
    }
  };

  const handleSwatchTouch = (e: React.MouseEvent | React.TouchEvent, color: string) => {
    e.stopPropagation();
    if (activeColor === color) {
      setActiveColor(null);
      audioEngine.playTempleBell(220);
    } else {
      setActiveColor(color);
      audioEngine.playTempleBell(320 + frame.palette.indexOf(color) * 40);
    }
  };

  return (
    <div
      data-cursor-interactive="true"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative cursor-pointer select-none transition-all duration-700 ${positionClass}`}
    >
      {/* Editorial Outer Frame */}
      <div
        className="relative overflow-hidden bg-[#090c12]/80 backdrop-blur-md border border-[#262e3b]/60 hover:border-[#c84b31]/70 transition-all duration-500 shadow-2xl"
        style={{
          borderColor: activeColor ? `${activeColor}88` : undefined
        }}
      >
        
        {/* Top Technical Metadata Bar */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-[#1b222d] bg-[#05070c]/90 text-[10px] tracking-[0.2em] text-[#8e98a6] uppercase font-mono">
          <div className="flex items-center space-x-2">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full transition-colors duration-300"
              style={{ backgroundColor: activeColor || '#c84b31' }}
            />
            <span className="text-[#e2ded6] font-semibold">{frame.frameNumber}</span>
            <span className="text-[#4e5866]">/</span>
            <span>{frame.time}</span>
          </div>
          <div className="flex items-center space-x-2 text-[9px] text-[#717b88]">
            <Compass className="w-2.5 h-2.5" />
            <span>{chapter.elevation}</span>
          </div>
        </div>

        {/* Cinematic Visual Plate Container */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#06080d]">
          <CinematicPlate
            frameId={frame.frameNumber}
            category={frame.category}
            className="transition-transform duration-1000 ease-out group-hover:scale-105"
          />

          {/* Dynamic Color Matrix Tint Layer */}
          {activeColor && (
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-500"
              style={{
                backgroundColor: activeColor,
                mixBlendMode: 'color',
                opacity: 0.55
              }}
            />
          )}

          {activeColor && (
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                boxShadow: `inset 0 0 35px ${activeColor}55`
              }}
            />
          )}

          {/* Vignette Overlay inside card */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#06080d]/20 to-[#06080d]/60 pointer-events-none" />

          {/* Centered Play / Inspect Icon inside image itself */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className={`w-11 h-11 rounded-full border border-[#f0ede6]/40 bg-[#06080e]/75 flex items-center justify-center backdrop-blur-sm transition-all duration-500 ${
                isHovered ? 'scale-110 border-[#c84b31] bg-[#c84b31]/30 text-[#f5f2eb]' : 'text-[#aba79c]'
              }`}
            >
              <Eye className="w-4 h-4" />
            </div>
          </div>

          {/* Bottom Overlay Label */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[9px] font-mono tracking-widest text-[#a8b1be] bg-[#040609]/70 px-2 py-1 backdrop-blur-xs border border-[#1b232e]">
            <span style={{ color: activeColor || '#c84b31' }}>{frame.category}</span>
            <span className="truncate max-w-[140px] text-right text-[#7d8694]">{frame.specs}</span>
          </div>
        </div>

        {/* Editorial Caption Area */}
        <div className="p-3.5 space-y-1.5 bg-[#070a0f]">
          <div className="flex items-baseline justify-between">
            <h4 className="font-display text-xs text-[#e8e6df] tracking-[0.14em] font-semibold">
              {frame.title}
            </h4>
            <span className="text-[10px] font-jp text-[#6b7684]">
              {chapter.kanjiTitle}
            </span>
          </div>

          <p className="text-[11px] text-[#919ba8] leading-relaxed line-clamp-2 font-sans font-light">
            {frame.description}
          </p>

          {/* Interactive Color Matrix Indicators */}
          <div className="pt-2 flex items-center justify-between border-t border-[#151c26]">
            <div className="flex items-center space-x-1.5 py-0.5">
              {frame.palette.map((color, idx) => {
                const isSelected = activeColor === color;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => handleSwatchTouch(e, color)}
                    onTouchEnd={(e) => handleSwatchTouch(e, color)}
                    className={`relative p-0.5 rounded-2xs transition-all duration-200 cursor-pointer focus:outline-hidden ${
                      isSelected
                        ? 'scale-125 ring-1 ring-white z-10'
                        : 'hover:scale-110 opacity-80 hover:opacity-100'
                    }`}
                    title={`Touch to apply tone ${color}`}
                    aria-label={`Color tone ${color}`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-2xs border border-black/60 block shadow-xs"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                );
              })}
              {activeColor && (
                <span
                  className="text-[8px] font-mono uppercase tracking-tighter ml-1"
                  style={{ color: activeColor }}
                >
                  TONE ON
                </span>
              )}
            </div>

            <div className="flex items-center space-x-1 text-[9px] text-[#5b6472] uppercase font-mono tracking-wider">
              <span>EXPLORE</span>
              <Maximize2 className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
