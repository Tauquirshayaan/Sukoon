"use client";

import React, { useState, useRef, useEffect } from "react";
import { EffectKey, EFFECT_LABELS, EFFECT_ICONS, EFFECT_ORDER } from "@/data/effects";

interface EffectPickerProps {
  isActive: boolean;
  manualEffect: EffectKey | null;
  autoEffect: EffectKey;
  onChange: (active: boolean, effect: EffectKey | null) => void;
}

export default function EffectPicker({ isActive, manualEffect, autoEffect, onChange }: EffectPickerProps) {
  const [open, setOpen] = useState(false);
  const active = manualEffect ?? autoEffect;
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
        className={`share-toggle-pill group shrink-0 ${isActive ? "active" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{isActive ? EFFECT_ICONS[active] : "🌫️"}</span>
        <span className="font-medium tracking-wide">Atmosphere</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Choose an atmosphere effect"
          className="absolute bottom-[140%] left-1/2 -translate-x-1/2 mb-1 py-2 px-1.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 shadow-xl z-50 flex flex-col gap-0.5 min-w-[180px]"
        >
          <button
            type="button"
            role="option"
            aria-selected={!isActive}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-left transition-colors min-h-[40px] ${
              !isActive ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => {
              onChange(false, null);
              setOpen(false);
            }}
          >
            <span aria-hidden="true">🚫</span>
            <span className="flex-1">Off</span>
          </button>

          <button
            type="button"
            role="option"
            aria-selected={isActive && manualEffect === null}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-left transition-colors min-h-[40px] ${
              isActive && manualEffect === null ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => {
              onChange(true, null);
              setOpen(false);
            }}
          >
            <span aria-hidden="true">✨</span>
            <span className="flex-1">Auto (follows the vibe)</span>
          </button>

          {EFFECT_ORDER.map((e) => (
            <button
              key={e}
              type="button"
              role="option"
              aria-selected={isActive && manualEffect === e}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-left transition-colors min-h-[40px] ${
                isActive && manualEffect === e ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => {
                onChange(true, e);
                setOpen(false);
              }}
            >
              <span aria-hidden="true">{EFFECT_ICONS[e]}</span>
              <span className="flex-1">{EFFECT_LABELS[e]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
