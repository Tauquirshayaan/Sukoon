"use client";

import React from 'react';
import { TrackMeta } from '@/data/trackMap';

interface CalligraphyCardProps {
  meta: TrackMeta | null;
  fallbackTitle?: string;
  resolvedArabicName?: string;
  onOpenFocus?: () => void;
}

export default function CalligraphyCard({ meta, fallbackTitle, resolvedArabicName, onOpenFocus }: CalligraphyCardProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [meta, fallbackTitle]);

  if (!meta) {
    if (!fallbackTitle) {
      return (
        <div className="flex flex-col items-center justify-center opacity-0 h-48 transition-opacity duration-1000">
          <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
        </div>
      );
    }
    
    // Fallback display for a track not yet in TRACK_MAP. This will be common
    // until the full playlist is curated (see src/data/trackMap.ts), so it's
    // styled to match the mapped state — same decorative mark and type
    // family — rather than reading as a plain, unfinished-looking title card.
    return (
      <button
        type="button"
        onClick={onOpenFocus}
        aria-label="Show verse context"
        className={`group flex flex-col items-center justify-center bg-transparent border-none p-0 cursor-pointer transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      >
        <span className="font-hindi text-2xl text-amber-200/70 mb-8" aria-label="Bismillah ir-Rahman ir-Rahim">﷽</span>

        {resolvedArabicName ? (
          <>
            <h2
              className="font-hindi text-6xl xs:text-7xl sm:text-8xl md:text-9xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-2"
              dir="rtl"
            >
              {resolvedArabicName}
            </h2>
            <p className="font-hindi text-lg sm:text-xl text-white/70 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] mb-4 text-center px-4 max-w-2xl leading-snug">
              {fallbackTitle}
            </p>
          </>
        ) : (
          <h2 className="font-hindi text-3xl sm:text-5xl text-white/95 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-4 text-center px-4 max-w-2xl leading-snug">
            {fallbackTitle}
          </h2>
        )}

        <span className="text-white/50 text-xs sm:text-sm font-mono tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm transition-colors group-hover:text-white/80 group-hover:border-white/25">
          Playing Track
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpenFocus}
      aria-label="Show verse context"
      className={`group flex flex-col items-center justify-center bg-transparent border-none p-0 cursor-pointer transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      key={meta.videoId}
    >
      <h2
        className="font-hindi text-6xl xs:text-7xl sm:text-8xl md:text-9xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-4"
        dir="rtl"
      >
        {meta.surahNameArabic}
      </h2>
      <p
        className="font-hindi text-xl xs:text-2xl sm:text-3xl text-white/90 leading-relaxed text-center max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] mb-6"
        dir="rtl"
      >
        {meta.openingAyahArabic}
      </p>
      <span className="text-white/50 text-xs sm:text-sm font-mono tracking-widest uppercase px-4 py-1.5 rounded-full border border-white/10 bg-black/20 backdrop-blur-sm transition-colors group-hover:text-white/80 group-hover:border-white/25">
        {meta.reference}
      </span>
    </button>
  );
}
