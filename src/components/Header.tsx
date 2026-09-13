import React from 'react';
import { Volume2, VolumeX, Menu, Compass } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface HeaderProps {
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  onOpenMenu: () => void;
  activeChapterElevation: string;
  activeChapterTime: string;
}

export const Header: React.FC<HeaderProps> = ({
  isAudioMuted,
  onToggleAudio,
  onOpenMenu,
  activeChapterElevation,
  activeChapterTime
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 px-6 md:px-12 py-6 flex items-start justify-between select-none pointer-events-none">
      {/* TOP-LEFT: BRAND IDENTITY */}
      <div className="pointer-events-auto group">
        <a
          href="#top"
          className="inline-block focus:outline-hidden"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="flex items-baseline space-x-2.5">
            <h1 className="font-display text-2xl md:text-3xl font-bold tracking-[0.25em] text-[#f4f2ea] group-hover:text-[#c84b31] transition-colors duration-300">
              RURU
            </h1>
            <span className="text-xs font-jp text-[#c84b31] tracking-widest font-normal">
              流々
            </span>
          </div>
          <p className="text-[9px] md:text-[10px] font-mono tracking-[0.3em] text-[#7d8795] uppercase mt-1">
            NIGHT WALK / KYOTO MOUNTAINS
          </p>
        </a>
      </div>

      {/* TOP-RIGHT CONTROLS: Sound Toggle & Menu */}
      <div className="pointer-events-auto flex items-center space-x-4 md:space-x-6">
        {/* Subtle Live Metadata (Desktop) */}
        <div className="hidden md:flex items-center space-x-3 text-[10px] font-mono tracking-[0.2em] text-[#6b7685] border-r border-[#1f2735] pr-6">
          <div className="flex items-center space-x-1.5">
            <Compass className="w-3 h-3 text-[#c84b31]" />
            <span>{activeChapterElevation}</span>
          </div>
          <span className="text-[#323d4e]">•</span>
          <span>{activeChapterTime}</span>
        </div>

        {/* Procedural Audio Ambient Soundscape Toggle */}
        <button
          data-cursor-interactive="true"
          onClick={onToggleAudio}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-2xs border text-[10px] font-mono tracking-[0.2em] uppercase transition-all duration-300 focus:outline-hidden ${
            !isAudioMuted
              ? 'border-[#c84b31]/70 bg-[#c84b31]/10 text-[#f2eee3] shadow-[0_0_12px_rgba(200,75,49,0.3)]'
              : 'border-[#222a36] bg-[#090d14]/70 text-[#8590a0] hover:text-[#e4e1d7] hover:border-[#3a4759]'
          }`}
          title={isAudioMuted ? 'Enable Ambient Sound' : 'Mute Ambient Sound'}
          aria-label="Toggle ambient temple soundscape"
        >
          {!isAudioMuted ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#c84b31] animate-pulse" />
              <span className="hidden sm:inline">SOUND ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">SOUND OFF</span>
            </>
          )}
        </button>

        {/* TOP-RIGHT MENU BUTTON */}
        <button
          data-cursor-interactive="true"
          onClick={onOpenMenu}
          className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-2xs bg-[#090d14]/80 backdrop-blur-md border border-[#222a36] hover:border-[#c84b31]/60 text-[#eae7de] transition-all duration-300 focus:outline-hidden group"
          aria-label="Open Chapter Index and Navigation Menu"
        >
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-[#a0aab8] group-hover:text-[#f4f2ea]">
            MENU
          </span>
          <Menu className="w-3.5 h-3.5 text-[#a0aab8] group-hover:text-[#c84b31] transition-colors" />
        </button>
      </div>
    </header>
  );
};
