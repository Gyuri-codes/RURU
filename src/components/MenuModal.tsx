import React from 'react';
import { X, Volume2, VolumeX, Eye, Sparkles, Compass, ArrowRight } from 'lucide-react';
import { ChapterData } from '../types';
import { audioEngine } from './AudioEngine';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: ChapterData[];
  activeChapterIndex: number;
  onSelectChapter: (index: number) => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  chapters,
  activeChapterIndex,
  onSelectChapter,
  isAudioMuted,
  onToggleAudio,
  reducedMotion,
  onToggleReducedMotion
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-12 bg-[#040608]/92 backdrop-blur-2xl select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#070a0f] border border-[#212b3b] shadow-2xl p-6 md:p-12 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#1b2330] pb-6">
          <div>
            <div className="flex items-baseline space-x-3">
              <h2 className="font-display text-3xl font-bold tracking-[0.2em] text-[#f2efe6]">
                RURU
              </h2>
              <span className="font-jp text-sm text-[#c84b31]">流々</span>
            </div>
            <p className="text-[10px] font-mono tracking-[0.3em] text-[#788394] uppercase mt-1">
              INDEX & ARCHITECTURAL ARCHIVE
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7f8a9a] hover:text-[#fff] hover:bg-[#161e2b] rounded-xs transition-colors focus:outline-hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapter Directory */}
        <div className="py-8 space-y-3">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#c84b31] uppercase block mb-4">
            CHAPTER ITINERARY
          </span>

          <div className="divide-y divide-[#151c27]">
            {chapters.map((ch, idx) => {
              const isActive = idx === activeChapterIndex;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    audioEngine.playTempleBell(220 + idx * 40);
                    onSelectChapter(idx);
                    onClose();
                  }}
                  className={`w-full py-4 flex items-center justify-between text-left group transition-all duration-300 focus:outline-hidden ${
                    isActive ? 'text-[#f5f2e9]' : 'text-[#8491a2] hover:text-[#dfdbd1]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-mono text-[#5b6878] group-hover:text-[#c84b31]">
                      {ch.number}
                    </span>
                    <div>
                      <div className="font-display text-base tracking-[0.16em]">
                        {ch.title}
                      </div>
                      <div className="text-[10px] font-mono text-[#616d7e] mt-0.5">
                        {ch.timeCode} • {ch.elevation}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span className="font-jp text-sm text-[#5f6b7c] group-hover:text-[#c84b31]">
                      {ch.kanjiTitle}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#3e4a5b] group-hover:text-[#c84b31] group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Controls & Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6 border-t border-[#18212e]">
          {/* Sound toggle button */}
          <button
            onClick={onToggleAudio}
            className="flex items-center justify-between p-3.5 border border-[#1e2736] bg-[#05070a] hover:border-[#c84b31]/60 transition-colors text-left"
          >
            <div>
              <div className="text-xs font-display tracking-wider text-[#e6e2d8]">
                AMBIENT SOUNDSCAPE
              </div>
              <div className="text-[10px] font-mono text-[#6c7889] mt-0.5">
                {!isAudioMuted ? 'Active (Temple Bell, Wind, Rain)' : 'Muted'}
              </div>
            </div>
            {!isAudioMuted ? (
              <Volume2 className="w-4 h-4 text-[#c84b31]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#667383]" />
            )}
          </button>

          {/* Reduced Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            className="flex items-center justify-between p-3.5 border border-[#1e2736] bg-[#05070a] hover:border-[#c84b31]/60 transition-colors text-left"
          >
            <div>
              <div className="text-xs font-display tracking-wider text-[#e6e2d8]">
                REDUCED MOTION
              </div>
              <div className="text-[10px] font-mono text-[#6c7889] mt-0.5">
                {reducedMotion ? 'Enabled (Smooth Minimal Drift)' : 'Standard (Full 3D Parallax)'}
              </div>
            </div>
            <Sparkles
              className={`w-4 h-4 ${
                reducedMotion ? 'text-[#c84b31]' : 'text-[#667383]'
              }`}
            />
          </button>
        </div>

        {/* About RURU Lore Colophon */}
        <div className="pt-6 border-t border-[#18212e] text-[11px] text-[#738092] leading-relaxed font-sans font-light space-y-2">
          <p>
            <strong className="text-[#bbb6ab] font-medium">RURU (流々)</strong> — A five-chapter nocturnal meditation through an ancient cedar-surrounded Japanese mountain sanctuary. Inspired by Meng To’s interactive 3D WebGL paradigm, rendered entirely in real-time procedural Three.js.
          </p>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#546070] pt-2">
            <span>KYOTO MOUNTAINS EXPEDITION</span>
            <span>THREE.JS / WEB AUDIO / TYPESCRIPT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
