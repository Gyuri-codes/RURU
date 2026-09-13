import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18 + 12);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#060709] flex flex-col items-center justify-center select-none transition-opacity duration-700 ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center space-y-6 max-w-sm px-6">
        {/* Brand */}
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <h1 className="font-display text-3xl font-bold tracking-[0.3em] text-[#f7f5ed]">
              RURU
            </h1>
            <span className="font-jp text-sm text-[#c84b31]">流々</span>
          </div>
          <p className="text-[10px] font-mono tracking-[0.35em] text-[#717b8a] uppercase">
            NIGHT WALK / 00
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 mx-auto h-[1px] bg-[#1a222e] relative overflow-hidden">
          <div
            className="h-full bg-[#c84b31] transition-all duration-200 ease-out"
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>

        {/* Status Text */}
        <div className="text-[9px] font-mono tracking-[0.25em] text-[#556070] uppercase">
          LOADING ATMOSPHERE... {Math.min(100, progress)}%
        </div>
      </div>
    </div>
  );
};
