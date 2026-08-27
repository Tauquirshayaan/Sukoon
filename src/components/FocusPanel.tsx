"use client";

import React, { useEffect, useRef } from "react";
import { FamousVerse } from "@/data/famousVerses";

interface FocusPanelProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number | null;
  surahNameArabic: string | null;
  surahNameEnglish: string | null;
  reference: string | null;
  famousVerses: FamousVerse[];
}

/**
 * The "Focus (context)" panel: tapping the verse card (see CalligraphyCard)
 * opens this rather than leaving the calligraphy floating with no way to
 * know what's actually playing. It stays out of the way until asked for —
 * a slide-up sheet, dismissed on backdrop tap or the close button — so the
 * ambient, no-chrome screen the rest of the app is built around isn't
 * compromised by it.
 */
export default function FocusPanel({
  isOpen,
  onClose,
  surahNumber,
  surahNameArabic,
  surahNameEnglish,
  reference,
  famousVerses,
}: FocusPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-focus the close button when panel opens for keyboard accessibility
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="focus-sheet-backdrop" role="dialog" aria-modal="true" aria-label="Verse context" onClick={onClose}>
      <div className="focus-sheet-card" onClick={(e) => e.stopPropagation()}>
        <div className="focus-sheet-handle" aria-hidden="true"></div>
        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close"
          className="focus-sheet-close"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="focus-sheet-ref">
          {surahNameEnglish ? (
            <>
              {surahNameArabic && (
                <span className="font-hindi" dir="rtl">
                  {surahNameArabic}
                </span>
              )}
              <span className="focus-sheet-divider" aria-hidden="true">
                ·
              </span>
              <span>{surahNameEnglish}</span>
              {reference && (
                <>
                  <span className="focus-sheet-divider" aria-hidden="true">
                    ·
                  </span>
                  <span>{reference}</span>
                </>
              )}
            </>
          ) : (
            <span>Finding where this sits…</span>
          )}
        </div>

        {famousVerses.length > 0 && (
          <div className="focus-sheet-verse">
            <div className="focus-sheet-verse-label">
              {famousVerses.length > 1 ? "Popular verses from this surah" : "A popular verse from this surah"}
            </div>
            {famousVerses.map((verse, vi) => (
              <div key={verse.reference} className={vi > 0 ? "focus-sheet-verse-item" : undefined}>
                {verse.arabicLines.map((line, i) => (
                  <p key={i} className="font-hindi focus-sheet-arabic" dir="rtl">
                    {line}
                  </p>
                ))}
                {verse.glossLines.map((line, i) => (
                  <p key={i} className="focus-sheet-gloss">
                    {line}
                  </p>
                ))}
                <div className="focus-sheet-credit">
                  {verse.reference} — {verse.translationSource}
                </div>
              </div>
            ))}
          </div>
        )}

        {surahNumber && (
          <a
            href={`https://quran.com/${surahNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-sheet-link"
          >
            Read the full surah on Quran.com →
          </a>
        )}
      </div>
    </div>
  );
}
