import React, { useEffect, useState } from 'react';
import { X, Aperture, Volume2, Check, RotateCcw } from 'lucide-react';
import { ChapterData } from '../types';
import { CinematicPlate } from './CinematicPlate';
import { audioEngine } from './AudioEngine';

interface CardModalProps {
  chapter: ChapterData | null;
  onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({ chapter, onClose }) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Reset active color when inspecting a different chapter
  useEffect(() => {
    setActiveColor(null);
    setCopiedHex(null);
  }, [chapter?.id]);

  if (!chapter) return null;

  const { frame } = chapter;

  const handleSelectColor = (hex: string) => {
    if (activeColor === hex) {
      setActiveColor(null);
      audioEngine.playTempleBell(220);
    } else {
      setActiveColor(hex);
      setCopiedHex(hex);
      audioEngine.playTempleBell(300 + frame.palette.indexOf(hex) * 45);
      setTimeout(() => setCopiedHex(null), 1800);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-[#040608]/90 backdrop-blur-xl animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#080b11] border border-[#242e3e] shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#1b2330] bg-[#05070c]">
          <div className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#8e98a7]">
            <span
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{ backgroundColor: activeColor || '#c84b31' }}
            />
            <span className="text-[#eeeae2] font-semibold">{frame.frameNumber}</span>
            <span className="text-[#3a4454]">/</span>
            <span>{frame.title}</span>
            <span className="text-[#3a4454]">•</span>
            <span className="font-jp text-[#c84b31]">{chapter.kanjiTitle}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#8b95a5] hover:text-[#fff] hover:bg-[#1a2332] rounded-xs transition-colors focus:outline-hidden"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Main Visual Plate */}
          <div className="md:col-span-7 bg-[#040609] p-4 md:p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#1a2332]">
            <div
              className="relative aspect-[16/10] w-full border border-[#212b3b] overflow-hidden shadow-inner transition-all duration-500"
              style={{
                borderColor: activeColor ? `${activeColor}88` : '#212b3b'
              }}
            >
              <CinematicPlate frameId={frame.frameNumber} category={frame.category} />

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

              {/* Dynamic Color Matrix Atmosphere Bloom */}
              {activeColor && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, ${activeColor}33 0%, transparent 80%)`,
                    boxShadow: `inset 0 0 45px ${activeColor}55`
                  }}
                />
              )}

              <div className="absolute inset-0 bg-radial from-transparent to-[#040609]/40 pointer-events-none" />
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-[#717c8c] tracking-widest">
              <div className="flex items-center space-x-1">
                <Aperture className="w-3 h-3 text-[#c84b31]" />
                <span>SPECS: {frame.specs}</span>
              </div>
              <button
                onClick={() => audioEngine.playTempleBell(activeColor ? 350 : 280)}
                className="flex items-center space-x-1.5 text-[#a4aebd] hover:text-[#c84b31] transition-colors"
              >
                <Volume2 className="w-3 h-3" />
                <span>CHIME RESONANCE</span>
              </button>
            </div>
          </div>

          {/* Editorial Specs & Notes */}
          <div className="md:col-span-5 p-6 space-y-5 flex flex-col justify-between bg-[#070a0f]">
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#c84b31] uppercase">
                  {frame.category}
                </span>
                <h3 className="font-display text-xl text-[#f2efe6] tracking-wider mt-1">
                  {frame.title}
                </h3>
                <p className="text-xs text-[#8f9aa9] font-serif italic mt-0.5">
                  “{chapter.quote}”
                </p>
              </div>

              <p className="text-xs text-[#9ba6b6] leading-relaxed font-sans font-light">
                {frame.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-[#18212e]">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#647182]">TIME RECORDED</span>
                  <span className="text-[#e2ded5]">{frame.time} JST</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#647182]">ALTITUDE</span>
                  <span className="text-[#e2ded5]">{chapter.elevation}</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#647182]">SOUNDSCAPE</span>
                  <span className="text-[#a1adb9] truncate max-w-[150px]">{chapter.soundNote}</span>
                </div>
              </div>
            </div>

            {/* Interactive Color Matrix Swatches */}
            <div className="pt-4 border-t border-[#18212e]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-mono tracking-widest text-[#8594a8] uppercase flex items-center space-x-2">
                  <span>COLOR MATRIX</span>
                  {activeColor ? (
                    <span
                      className="font-semibold text-[9px] transition-colors"
                      style={{ color: activeColor }}
                    >
                      • {activeColor} ACTIVE
                    </span>
                  ) : (
                    <span className="text-[8px] text-[#556375]">(TOUCH TO TINT)</span>
                  )}
                </span>

                {activeColor && (
                  <button
                    type="button"
                    onClick={() => handleSelectColor(activeColor)}
                    className="flex items-center space-x-1 text-[8px] font-mono text-[#8a99ac] hover:text-[#f3efe6] transition-colors uppercase"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>RESET</span>
                  </button>
                )}
              </div>

              {/* Touch & Click Responsive Swatches */}
              <div className="flex items-center space-x-2">
                {frame.palette.map((hex, idx) => {
                  const isSelected = activeColor === hex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      data-cursor-interactive="true"
                      onClick={() => handleSelectColor(hex)}
                      className={`flex-1 flex flex-col items-center space-y-1.5 p-1.5 rounded transition-all duration-300 focus:outline-hidden cursor-pointer ${
                        isSelected
                          ? 'bg-[#151e2b] ring-1 ring-[#c84b31] scale-105'
                          : 'hover:bg-[#101622] hover:scale-102 opacity-90'
                      }`}
                      title={`Touch to apply tone: ${hex}`}
                    >
                      <div
                        className="w-full h-5 rounded-2xs border border-[#2b3545] shadow-xs relative flex items-center justify-center transition-transform"
                        style={{
                          backgroundColor: hex,
                          borderColor: isSelected ? '#ffffff' : '#2b3545'
                        }}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-white drop-shadow-md" />
                        )}
                      </div>
                      <span
                        className={`text-[8px] font-mono tracking-tighter transition-colors ${
                          isSelected ? 'text-[#ffffff] font-bold' : 'text-[#6a7788]'
                        }`}
                      >
                        {hex}
                      </span>
                    </button>
                  );
                })}
              </div>

              {copiedHex && (
                <div className="text-[9px] font-mono text-[#c84b31] tracking-wider text-center mt-2 animate-pulse">
                  TONE {copiedHex} APPLIED TO VISUAL PLATE
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
