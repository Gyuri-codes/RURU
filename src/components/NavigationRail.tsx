import React from 'react';
import { ChapterData } from '../types';
import { audioEngine } from './AudioEngine';

interface NavigationRailProps {
  chapters: ChapterData[];
  activeChapterIndex: number;
  scrollProgress: number;
  onSelectChapter: (index: number) => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({
  chapters,
  activeChapterIndex,
  scrollProgress,
  onSelectChapter
}) => {
  const handleChapterClick = (index: number) => {
    audioEngine.playTempleBell(220 + index * 40);
    onSelectChapter(index);
  };

  return (
    <>
      {/* DESKTOP: Vertical Chapter Rail (Right side) */}
      <nav
        aria-label="Chapter Navigation"
        className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 z-30 flex-col items-end space-y-6 select-none"
      >
        {/* Continuous scroll progress track */}
        <div className="absolute right-[3px] top-0 bottom-0 w-[1px] bg-[#1a2330]">
          <div
            className="w-[2px] -ml-[0.5px] bg-[#c84b31] transition-all duration-300 shadow-[0_0_8px_rgba(200,75,49,0.7)]"
            style={{
              height: `${Math.min(100, Math.max(0, scrollProgress * 100))}%`
            }}
          />
        </div>

        {chapters.map((chapter, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={chapter.id}
              data-cursor-interactive="true"
              onClick={() => handleChapterClick(idx)}
              className="group flex items-center space-x-3.5 text-right focus:outline-hidden transition-all duration-500"
            >
              {/* Text label (reveals on hover or when active) */}
              <div
                className={`transition-all duration-500 transform ${
                  isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-40 group-hover:opacity-80 translate-x-2 group-hover:translate-x-0'
                }`}
              >
                <div className="flex items-center justify-end space-x-2">
                  <span className="text-[10px] font-mono tracking-widest text-[#8895a7]">
                    {chapter.number}
                  </span>
                  <span
                    className={`font-display text-xs tracking-[0.18em] uppercase ${
                      isActive ? 'text-[#f5f3ec] font-semibold' : 'text-[#85909f]'
                    }`}
                  >
                    {chapter.title}
                  </span>
                </div>
                <div className="text-[9px] font-jp text-[#626d7c] tracking-widest text-right mt-0.5">
                  {chapter.kanjiTitle}
                </div>
              </div>

              {/* Node indicator */}
              <div className="relative z-10 flex items-center justify-center w-3 h-3">
                <div
                  className={`transition-all duration-500 rounded-full ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-[#c84b31] ring-4 ring-[#c84b31]/20 shadow-[0_0_10px_#c84b31]'
                      : 'w-1.5 h-1.5 bg-[#3a4759] group-hover:bg-[#8592a3]'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* MOBILE / TABLET: Compact Horizontal Rail (Bottom bar) */}
      <nav
        aria-label="Mobile Chapter Navigation"
        className="lg:hidden fixed bottom-4 left-4 right-4 z-30 flex items-center justify-between px-4 py-2.5 bg-[#080b10]/85 backdrop-blur-md border border-[#1e2736]/70 rounded-xs shadow-2xl"
      >
        <div className="text-[10px] font-mono tracking-widest text-[#8895a7]">
          {chapters[activeChapterIndex]?.number} / 05
        </div>

        <div className="flex items-center space-x-4">
          {chapters.map((ch, idx) => {
            const isActive = idx === activeChapterIndex;
            return (
              <button
                key={ch.id}
                onClick={() => handleChapterClick(idx)}
                className="p-1 focus:outline-hidden"
                aria-label={`Go to chapter ${ch.number}: ${ch.title}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-5 h-1.5 bg-[#c84b31]'
                      : 'w-1.5 h-1.5 bg-[#354050]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="font-display text-[11px] tracking-wider text-[#e6e4dc] truncate max-w-[120px]">
          {chapters[activeChapterIndex]?.title}
        </div>
      </nav>
    </>
  );
};
