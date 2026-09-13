import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChapterData } from '../types';
import { CinematicCard } from './CinematicCard';

interface ChapterContentProps {
  chapter: ChapterData;
  activeChapterIndex: number;
  chapterIndex: number;
  reducedMotion: boolean;
  onInspectCard: (chapter: ChapterData) => void;
}

export const ChapterContent = React.memo<ChapterContentProps>(function ChapterContent({
  chapter,
  activeChapterIndex,
  chapterIndex,
  reducedMotion,
  onInspectCard
}) {
  const isActive = activeChapterIndex === chapterIndex;

  // Stagger words in quote
  const quoteWords = chapter.quote.split(' ');

  return (
    <section
      id={`chapter-${chapter.id}`}
      className="min-h-screen relative flex items-center justify-between px-6 md:px-16 lg:px-24 py-24 md:py-32 pointer-events-none"
    >
      {/* LEFT COLUMN: Large Editorial Typography */}
      <div className="w-full max-w-xl z-20 pointer-events-auto space-y-6 md:space-y-8">
        
        {/* Chapter Header Tracker */}
        <div className="flex items-center space-x-3 text-[11px] font-mono tracking-[0.3em] text-[#8694a5] uppercase">
          <span className="text-[#c84b31] font-semibold">{chapter.number}</span>
          <span className="w-6 h-[1px] bg-[#2a3545]" />
          <span>CHAPTER {chapter.number}</span>
          <span className="text-[#3e4c60]">•</span>
          <span className="text-[#647285]">{chapter.timeCode}</span>
        </div>

        {/* Oversized English Title */}
        <div className="space-y-2">
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.14em] text-[#f7f5ed] leading-[1.05]">
            {chapter.title}
          </h2>
          <p className="text-[10px] md:text-xs font-mono tracking-[0.25em] text-[#939eaf] uppercase">
            {chapter.subtitle}
          </p>
        </div>

        {/* Thin Separator Rule */}
        <div className="w-20 h-[1px] bg-gradient-to-r from-[#c84b31] via-[#c84b31]/40 to-transparent" />

        {/* Poetic Quote with Staggered Word Reveal */}
        <blockquote className="font-serif text-lg md:text-2xl text-[#d4d1c7] italic leading-relaxed tracking-wide border-l border-[#c84b31]/30 pl-4 py-1">
          {quoteWords.map((word, wIdx) => (
            <span
              key={wIdx}
              className={`inline-block mr-1.5 transition-all duration-700 ${
                isActive
                  ? 'opacity-100 translate-y-0 filter-none'
                  : 'opacity-0 translate-y-2 blur-xs'
              }`}
              style={{
                transitionDelay: reducedMotion ? '0ms' : `${wIdx * 65 + 150}ms`
              }}
            >
              {word}
            </span>
          ))}
        </blockquote>

        {/* Atmospheric Lore Paragraph */}
        <p className="text-xs md:text-sm text-[#8c97a7] leading-relaxed max-w-md font-sans font-light tracking-wide">
          {chapter.lore}
        </p>

        {/* Chapter Sound Profile Note */}
        <div className="pt-2 flex items-center space-x-2 text-[10px] font-mono text-[#667385] tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3d4a5d]" />
          <span>ATMOSPHERE: {chapter.soundNote}</span>
        </div>
      </div>

      {/* ASYMMETRICAL EDITORIAL IMAGE CARD (Desktop Right side) */}
      <div className="hidden lg:block w-80 xl:w-96 z-20 pointer-events-auto mt-12">
        <CinematicCard
          chapter={chapter}
          onInspect={onInspectCard}
          positionClass={`transform transition-all duration-1000 ${
            isActive
              ? 'opacity-100 translate-y-0'
              : 'opacity-40 translate-y-6 blur-[1px]'
          }`}
        />
      </div>

      {/* VERTICAL JAPANESE KANJI RIBBON (Far Right Screen Edge, active chapter only) */}
      {isActive && (
        <div
          className="hidden md:flex fixed right-4 lg:right-32 top-1/3 -translate-y-1/2 z-10 writing-vertical select-none pointer-events-none transition-opacity duration-700 items-center space-y-6 opacity-35"
          aria-hidden="true"
        >
          <span className="font-jp text-xs text-[#c84b31] tracking-[0.4em]">
            {chapter.kanjiNumber}
          </span>
          <span className="font-jp text-3xl lg:text-4xl text-[#eae7dc] tracking-[0.3em] font-light">
            {chapter.kanjiTitle}
          </span>
          <span className="w-[1px] h-16 bg-[#2c3647]" />
        </div>
      )}

      {/* MOBILE INLINE CARD (Shown on small screens below text) */}
      <div className="lg:hidden w-full mt-6 pointer-events-auto">
        <CinematicCard
          chapter={chapter}
          onInspect={onInspectCard}
          positionClass="w-full"
        />
      </div>
    </section>
  );
});
