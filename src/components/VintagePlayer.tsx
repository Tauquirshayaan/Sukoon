"use client";

import React, { useState, useRef, useEffect } from "react";

interface VintagePlayerProps {
  isPlaying: boolean;
  progress: number; // 0 to 100
  currentTime: string;
  totalTime: string;
  trackName: string;
  coverUrl: string;
  channelName: string;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (pct: number) => void;
  onVolumeChange: (level: number) => void;
}

export default function VintagePlayer({
  isPlaying,
  progress,
  currentTime,
  totalTime,
  trackName,
  coverUrl,
  channelName,
  onPlayPause,
  onNext,
  onPrev,
  onSeek,
  onVolumeChange,
}: VintagePlayerProps) {
  const [volume, setVolume] = useState(50);
  const [showVolume, setShowVolume] = useState(false);
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    onSeek(pct);
  };

  const handleProgressBarTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const pct = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    onSeek(pct);
  };

  const handleProgressBarKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 0.05;
    const currentPct = progress / 100;
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowDown":
        e.preventDefault();
        onSeek(Math.max(0, currentPct - step));
        break;
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        onSeek(Math.min(1, currentPct + step));
        break;
      case "Home":
        e.preventDefault();
        onSeek(0);
        break;
      case "End":
        e.preventDefault();
        onSeek(1);
        break;
      default:
        break;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setVolume(val);
    onVolumeChange(val);
  };

  // Close volume popup on outside click
  useEffect(() => {
    if (!showVolume) return;
    const handleClick = (e: MouseEvent) => {
      if (volumeRef.current && !volumeRef.current.contains(e.target as Node)) {
        setShowVolume(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showVolume]);

  // Close volume on Escape
  useEffect(() => {
    if (!showVolume) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowVolume(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [showVolume]);

  return (
    <section
      className="music-player pointer-events-auto w-full relative z-30"
      aria-label="Sukoon music player"
    >
      {/* Cover art — slightly smaller on mobile */}
      <button
        className="music-cover-frame shrink-0"
        type="button"
        aria-label="Play from cover art"
        onClick={onPlayPause}
      >
        <div
          className={`music-cover ${isPlaying ? "spinning" : ""}`}
          style={{ backgroundImage: `url('${coverUrl}')` }}
        ></div>
        <span className="music-cover-hole" aria-hidden="true"></span>
      </button>

      {/* Track info + progress — takes all remaining width */}
      <div className="track-block flex-1 min-w-0 flex flex-col justify-center overflow-hidden px-1 sm:px-2">
        <div className="truncate text-white font-bold text-xs sm:text-sm leading-tight">
          {trackName || "Loading…"}
        </div>
        <div className="truncate text-white/60 text-[10px] sm:text-xs mt-0.5">
          {channelName}
        </div>

        {/* Progress bar + time — single row on all sizes */}
        <div className="flex items-center gap-1.5 mt-2 w-full">
          <div
            className="flex-1 h-1.5 bg-white/25 rounded-full cursor-pointer overflow-hidden relative"
            role="slider"
            aria-label="Track progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            onClick={handleProgressBarClick}
            onTouchStart={handleProgressBarTouch}
            onKeyDown={handleProgressBarKeyDown}
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          {/* Time always inline, never wraps */}
          <span className="text-white/50 text-[9px] sm:text-[10px] font-mono shrink-0 tabular-nums">
            {currentTime}/{totalTime}
          </span>
        </div>
      </div>

      {/* Controls — compact on mobile */}
      <div className="flex items-center gap-0.5 sm:gap-1 shrink-0 ml-1">
        {/* Prev */}
        <button
          className="text-white/70 hover:text-white transition-colors w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          type="button"
          aria-label="Previous track"
          onClick={onPrev}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current">
            <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
          </svg>
        </button>

        {/* Play / Pause */}
        <button
          className="bg-white text-black w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform shrink-0"
          type="button"
          aria-label={isPlaying ? "Pause music" : "Play music"}
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 fill-current">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5">
              <path d="M8 5v14l11-7-11-7Z" />
            </svg>
          )}
        </button>

        {/* Next */}
        <button
          className="text-white/70 hover:text-white transition-colors w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
          type="button"
          aria-label="Next track"
          onClick={onNext}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>

        {/* Volume */}
        <div className="relative flex items-center" ref={volumeRef}>
          <button
            className="text-white/50 hover:text-white transition-colors w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center"
            type="button"
            aria-label={`Volume: ${volume}%`}
            aria-expanded={showVolume}
            onClick={(e) => {
              e.stopPropagation();
              setShowVolume(!showVolume);
            }}
          >
            {volume === 0 ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="m22 9-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="m16 9 6 6" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3.5 h-3.5 fill-current">
                <path d="M11 5 6 9H2v6h4l5 4V5Z" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7" stroke="currentColor" strokeWidth="2" fill="none" />
                <path d="M18.5 5.5a9 9 0 0 1 0 13" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            )}
          </button>
          {showVolume && (
            <div
              className="absolute bottom-[130%] right-0 mb-1 px-3 py-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 shadow-xl z-50 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Volume level"
                className="w-20 sm:w-24 h-2 accent-white bg-white/30 rounded-full appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
