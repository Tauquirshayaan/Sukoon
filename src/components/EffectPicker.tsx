"use client";

import React, { useState } from "react";
import { EffectKey, EFFECT_LABELS, EFFECT_ICONS, EFFECT_ORDER } from "@/data/effects";

interface EffectPickerProps {
  manualEffect: EffectKey | null;
  autoEffect: EffectKey;
  onChange: (effect: EffectKey | null) => void;
}

// Mirrors VibePicker.tsx's Auto/manual popover pattern exactly, so the two
// controls read as one family: Vibe picks the background mood, this picks
// the foreground weather/light effect layered on top of it.
export default function EffectPicker({ manualEffect, autoEffect, onChange }: EffectPickerProps) {
  const [open, setOpen] = useState(false);
  const active = manualEffect ?? autoEffect;

  return (
    <div className="relative">
      <button
        type="button"
        className={`share-toggle-pill group shrink-0 ${manualEffect ? "active" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true">{EFFECT_ICONS[active]}</span>
        <span className="font-medium tracking-wide">Effect</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Choose an atmosphere effect"
          className="absolute bottom-[140%] left-1/2 -translate-x-1/2 mb-1 py-2 px-1.5 rounded-2xl bg-black/85 backdrop-blur-md border border-white/10 shadow-xl z-50 flex flex-col gap-0.5 min-w-[170px]"
        >
          <button
            type="button"
            role="option"
            aria-selected={manualEffect === null}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
              manualEffect === null ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
            onClick={() => {
              onChange(null);
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
              aria-selected={manualEffect === e}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-left transition-colors ${
                manualEffect === e ? "bg-white/15 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
              onClick={() => {
                onChange(e);
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
