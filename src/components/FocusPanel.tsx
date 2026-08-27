"use client";

import React from "react";
import { FamousVerse } from "@/data/famousVerses";

interface FocusPanelProps {
  isOpen: boolean;
  onClose: () => void;
  surahNumber: number | null;
  surahNameArabic: string | null;
  surahNameEnglish: string | null;
  reference: string | null;
  famousVerse: FamousVerse | null;
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
  famousVerse,
}: FocusPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="focus-sheet-backdrop" role="dialog" aria-modal="true" aria-label="Verse context" onClick={onClose}>
      <div className="focus-sheet-card" onClick={(e) => e.stopPropagation()}>
        <div className="focus-sheet-handle" aria-hidden="true"></div>
        <button type="button" aria-label="Close" className="focus-sheet-close" onClick={onClose}>
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

        {famousVerse && (
          <div className="focus-sheet-verse">
            <div className="focus-sheet-verse-label">A verse from this surah</div>
            {famousVerse.arabicLines.map((line, i) => (
              <p key={i} className="font-hindi focus-sheet-arabic" dir="rtl">
                {line}
              </p>
            ))}
            {famousVerse.glossLines.map((line, i) => (
              <p key={i} className="focus-sheet-gloss">
                {line}
              </p>
            ))}
            <div className="focus-sheet-credit">
              {famousVerse.reference} — {famousVerse.translationSource}
            </div>
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
