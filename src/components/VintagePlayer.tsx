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

  // Touch-friendly progress seek
  const handleProgressBarTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const pct = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
    onSeek(pct);
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
      className="music-player order-2 sm:order-2 pointer-events-auto shadow-[0_25px_60px_rgba(0,0,0,0.85)] w-full relative z-30"
      aria-label="Sukoon music player"
    >
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

      <div className="track-block flex-1 flex flex-col justify-center overflow-hidden px-2">
        <div className="track-top">
          <div className="track-name text-white font-bold text-sm sm:text-base truncate">{trackName || "Loading..."}</div>
        </div>
        <p className="station text-white/70 text-xs truncate">
          {channelName}
        </p>
        
        <div className="mt-2 flex flex-col gap-1 w-full">
          <div
            className="w-full h-2 sm:h-1.5 bg-white/30 rounded-full cursor-pointer overflow-hidden mt-1 touch-action-none"
            role="slider"
            aria-label="Track progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress)}
            tabIndex={0}
            onClick={handleProgressBarClick}
            onTouchStart={handleProgressBarTouch}
          >
            <div
              className="h-full bg-white transition-all duration-200 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-white/60 text-[10px] font-mono tracking-wide">
            {currentTime} / {totalTime}
          </div>
        </div>
      </div>

      <div className="player-controls-wrap flex items-center gap-2">
        <div className="player-actions flex items-center gap-3">
          <button
            className="text-white/80 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            type="button"
            aria-label="Previous track"
            onClick={onPrev}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"></path>
            </svg>
          </button>
          
          <button
            className="bg-white text-black w-10 h-10 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            type="button"
            aria-label={isPlaying ? "Pause music" : "Play music"}
            onClick={onPlayPause}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 h-5 fill-current ml-1">
                <path d="M8 5v14l11-7-11-7Z"></path>
              </svg>
            )}
          </button>
          
          <button
            className="text-white/80 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            type="button"
            aria-label="Next track"
            onClick={onNext}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"></path>
            </svg>
          </button>
        </div>

        <div className="relative flex items-center ml-1" ref={volumeRef}>
          <button
            className="text-white/60 hover:text-white transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            type="button"
            aria-label={`Volume: ${volume}%`}
            aria-expanded={showVolume}
            onClick={(e) => {
              e.stopPropagation();
              setShowVolume(!showVolume);
            }}
          >
            {volume === 0 ? (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                <path d="M11 5 6 9H2v6h4l5 4V5Z"></path>
                <path d="m22 9-6 6"></path>
                <path d="m16 9 6 6"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                <path d="M11 5 6 9H2v6h4l5 4V5Z"></path>
                <path d="M15.5 8.5a5 5 0 0 1 0 7"></path>
                <path d="M18.5 5.5a9 9 0 0 1 0 13"></path>
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
                className="w-24 h-2 accent-white bg-white/30 rounded-full appearance-none cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
