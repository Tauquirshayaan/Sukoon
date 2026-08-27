"use client";

import React, { useState, useRef, useEffect } from "react";
import { MoodKey, MOOD_LABELS, MOOD_ORDER } from "@/data/surahMoods";

interface VibePickerProps {
  manualMood: MoodKey | null;
  autoMood: MoodKey;
  onChange: (mood: MoodKey | null) => void;
}

const MOOD_ICON: Record<MoodKey, string> = {
  dawn: "🌅",
  dunes: "🏜️",
  water: "🌊",
  default: "🌙",
};

export default function VibePicker({ manualMood, autoMood, onChange }: VibePickerProps) {
  const [open, setOpen] = useState(false);
  const active = manualMood ?? autoMood;
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className={`share-toggle-pill group shrink-0 ${manualMood ? "active" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{MOOD_ICON[active]}</span>
        <span className="font-medium tracking-wide">Vibe</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Choose a background vibe"
          className="absolute bottom-[140%] left-1/2 -translate-x-1/2 mb-1 py-2 px-1.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 shadow-xl z-50 flex flex-col gap-0.5 min-w-[150px]"
        >
          <button
            type="button"
            role="option"
            aria-selected={manualMood === null}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-left transition-colors min-h-[40px] ${
              manualMood === null ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
          >
            <span aria-hidden="true">✨</span>
            <span className="flex-1">Auto (follows the surah)</span>
          </button>

          {MOOD_ORDER.map((m) => (
            <button
              key={m}
              type="button"
              role="option"
              aria-selected={manualMood === m}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-left transition-colors min-h-[40px] ${
                manualMood === m ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => {
                onChange(m);
                setOpen(false);
              }}
            >
              <span aria-hidden="true">{MOOD_ICON[m]}</span>
              <span className="flex-1">{MOOD_LABELS[m]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
