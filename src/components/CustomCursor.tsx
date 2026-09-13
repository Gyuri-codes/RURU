import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable completely on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let isHovered = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(${isHovered ? 0.6 : 1})`;
      }

      const target = e.target as HTMLElement | null;
      const hovered = Boolean(
        target?.closest('[data-cursor-interactive="true"]') ||
        target?.closest('button') ||
        target?.closest('a')
      );

      if (hovered !== isHovered) {
        isHovered = hovered;
        if (ringRef.current) {
          ringRef.current.style.width = isHovered ? '48px' : '26px';
          ringRef.current.style.height = isHovered ? '48px' : '26px';
          ringRef.current.style.borderColor = isHovered ? 'rgba(200, 75, 49, 0.85)' : 'rgba(215, 210, 198, 0.35)';
          ringRef.current.style.backgroundColor = isHovered ? 'rgba(200, 75, 49, 0.1)' : 'transparent';
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Smooth trailing loop updating only DOM transforms with hardware acceleration
    const updateLoop = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden select-none">
      {/* Center dot pointer */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#c84b31] pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-[26px] h-[26px] rounded-full border border-[#c84b31]/60 pointer-events-none transition-[width,height,border-color,background-color] duration-200 ease-out will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </div>
  );
};
