import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ThreeCanvas } from './components/ThreeCanvas';
import { Header } from './components/Header';
import { NavigationRail } from './components/NavigationRail';
import { ChapterContent } from './components/ChapterContent';
import { ForegroundParallax } from './components/ForegroundParallax';
import { CustomCursor } from './components/CustomCursor';
import { CardModal } from './components/CardModal';
import { MenuModal } from './components/MenuModal';
import { LoadingScreen } from './components/LoadingScreen';
import { FooterSection } from './components/FooterSection';
import { audioEngine } from './components/AudioEngine';
import { CHAPTERS } from './data/chapters';
import { ChapterData } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inspectedChapter, setInspectedChapter] = useState<ChapterData | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check user preference for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle continuous scroll tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          const progress = docHeight > 0 ? Math.min(1, Math.max(0, currentScroll / docHeight)) : 0;
          setScrollProgress(progress);

          // Update active chapter index based on scroll position (5 chapters across the track)
          const chapterIdx = Math.min(4, Math.floor(progress * 5.1));
          setActiveChapterIndex(chapterIdx);

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth jump to chapter
  const handleSelectChapter = useCallback((index: number) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (index / 4.8) * docHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  }, []);

  // Audio Toggle
  const handleToggleAudio = async () => {
    const active = await audioEngine.toggleMute();
    setIsAudioMuted(!active);
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') {
        handleToggleAudio();
      } else if (e.key === 'ArrowDown' || e.key === 'j') {
        window.scrollBy({ top: 180, behavior: 'smooth' });
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        window.scrollBy({ top: -180, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isAudioMutedRef = useRef(isAudioMuted);
  useEffect(() => {
    isAudioMutedRef.current = isAudioMuted;
  }, [isAudioMuted]);

  const handleChapterChange = useCallback((idx: number) => {
    setActiveChapterIndex(idx);
    if (!isAudioMutedRef.current) {
      audioEngine.playTempleBell(220 + idx * 35);
    }
  }, []);

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#060709] text-[#e5e4de]">
      {/* 1. INITIAL LOADING EXPERIENCE */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. CUSTOM CURSOR (desktop/fine-pointer only) */}
      <CustomCursor />

      {/* 3. FIXED THREE.JS WEBGL CANVAS (remains fixed behind HTML) */}
      <ThreeCanvas
        scrollProgress={scrollProgress}
        reducedMotion={reducedMotion}
        onChapterChange={handleChapterChange}
      />

      {/* 4. ATMOSPHERIC OVERLAYS */}
      {/* Film grain layer */}
      <div className="fixed inset-0 pointer-events-none z-10 film-grain" />
      {/* Optical vignette */}
      <div className="fixed inset-0 pointer-events-none z-10 cinematic-vignette" />
      {/* Foreground parallax silhouettes */}
      <ForegroundParallax
        chapterIndex={activeChapterIndex}
        scrollProgress={scrollProgress}
      />

      {/* 5. TOP EDITORIAL HEADER */}
      <Header
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenMenu={() => setIsMenuOpen(true)}
        activeChapterElevation={activeChapter.elevation}
        activeChapterTime={activeChapter.timeCode}
      />

      {/* 6. CHAPTER NAVIGATION RAIL (Side on desktop, compact on mobile) */}
      <NavigationRail
        chapters={CHAPTERS}
        activeChapterIndex={activeChapterIndex}
        scrollProgress={scrollProgress}
        onSelectChapter={handleSelectChapter}
      />

      {/* 7. CONTINUOUS EDITORIAL SCROLL TRACK (HTML Content layered over WebGL) */}
      <main className="relative z-20">
        {/* Intro Spacing & Initial Scroll Indicator */}
        <div className="h-20" />

        {CHAPTERS.map((chapter, idx) => (
          <ChapterContent
            key={chapter.id}
            chapter={chapter}
            chapterIndex={idx}
            activeChapterIndex={activeChapterIndex}
            reducedMotion={reducedMotion}
            onInspectCard={(ch) => setInspectedChapter(ch)}
          />
        ))}

        {/* Ending / Footer Sequence */}
        <FooterSection
          onRestart={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onOpenChapters={() => setIsMenuOpen(true)}
          onOpenAbout={() => setIsMenuOpen(true)}
        />
      </main>

      {/* 8. MODALS & DRAWERS */}
      {/* Frame Inspection Lightbox */}
      <CardModal
        chapter={inspectedChapter}
        onClose={() => setInspectedChapter(null)}
      />

      {/* Main Navigation Index & Lore Colophon */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        chapters={CHAPTERS}
        activeChapterIndex={activeChapterIndex}
        onSelectChapter={handleSelectChapter}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
      />
    </div>
  );
}
