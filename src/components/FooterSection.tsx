import React from 'react';
import { RotateCcw, List, Info, ChevronUp } from 'lucide-react';
import { audioEngine } from './AudioEngine';

interface FooterSectionProps {
  onRestart: () => void;
  onOpenChapters: () => void;
  onOpenAbout: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onRestart,
  onOpenChapters,
  onOpenAbout
}) => {
  return (
    <footer className="relative min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-20 bg-gradient-to-b from-transparent via-[#05070a]/90 to-[#030406] z-20 select-none">
      {/* Scroll indicator prompt to go top */}
      <div className="flex justify-center pt-8">
        <button
          onClick={onRestart}
          data-cursor-interactive="true"
          className="flex flex-col items-center space-y-2 text-[#647182] hover:text-[#c84b31] transition-colors focus:outline-hidden group"
          aria-label="Return to top"
        >
          <ChevronUp className="w-4 h-4 animate-bounce group-hover:-translate-y-1 transition-transform" />
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase">
            RETURN TO SUMMIT
          </span>
        </button>
      </div>

      {/* Centerpiece Poetic Ending */}
      <div className="max-w-2xl mx-auto text-center space-y-6 my-auto py-16">
        <div className="space-y-1">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-[0.25em] text-[#f2eee3]">
            RURU
          </h2>
          <p className="text-xs font-mono tracking-[0.35em] text-[#c84b31] uppercase">
            AFTERLIGHT
          </p>
        </div>

        <div className="w-16 h-[1px] bg-[#2a3547] mx-auto" />

        <blockquote className="font-serif text-xl md:text-3xl text-[#d0ccc2] italic leading-relaxed tracking-wide">
          “Some places disappear
          <br />
          when you leave them.
          <br />
          Others follow you home.”
        </blockquote>

        <p className="text-xs font-mono text-[#576475] tracking-widest pt-2">
          KYOTO TEMPLE SANCTUARY • MIDNIGHT CHRONICLE
        </p>
      </div>

      {/* Minimalist Editorial Action Bar */}
      <div className="border-t border-[#18212e] pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono tracking-[0.25em] text-[#717d8e] uppercase">
        <div className="flex items-center space-x-6 md:space-x-8">
          <button
            onClick={() => {
              audioEngine.playTempleBell(220);
              onRestart();
            }}
            data-cursor-interactive="true"
            className="flex items-center space-x-2 text-[#9da9b9] hover:text-[#c84b31] transition-colors focus:outline-hidden"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>EXPLORE AGAIN</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playTempleBell(260);
              onOpenChapters();
            }}
            data-cursor-interactive="true"
            className="flex items-center space-x-2 text-[#9da9b9] hover:text-[#c84b31] transition-colors focus:outline-hidden"
          >
            <List className="w-3.5 h-3.5" />
            <span>CHAPTERS</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playTempleBell(330);
              onOpenAbout();
            }}
            data-cursor-interactive="true"
            className="flex items-center space-x-2 text-[#9da9b9] hover:text-[#c84b31] transition-colors focus:outline-hidden"
          >
            <Info className="w-3.5 h-3.5" />
            <span>ABOUT</span>
          </button>
        </div>

        <div className="text-[10px] text-[#4d5766] tracking-[0.2em]">
          DESIGNED FOR SCROLL-DRIVEN CONTEMPLATION
        </div>
      </div>
    </footer>
  );
};
