"use client";

import React from 'react';
import { MoodKey, MOOD_ORDER } from '@/data/surahMoods';

interface BackgroundVideoProps {
  mood: MoodKey;
}

export default function BackgroundVideo({ mood }: BackgroundVideoProps) {
  const activeMood = mood || 'default';

  return (
    <div className="background-container">
      {MOOD_ORDER.map((m) => {
        const isActive = m === activeMood;
        return (
          <div
            key={m}
            className={`background-layer mesh-bg-${m} ${isActive ? 'active' : ''}`}
          >
            <video
              src={`/videos/${m}.mp4`}
              loop
              autoPlay
              muted
              playsInline
              className="background-video"
              onError={(e) => {
                // If video is missing, hide the element so the background color shows
                (e.target as HTMLVideoElement).style.display = 'none';
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
