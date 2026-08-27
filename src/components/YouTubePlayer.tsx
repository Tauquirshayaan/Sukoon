"use client";

import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { RECITER_PLAYLIST_ID } from '@/lib/constants';

interface YouTubePlayerProps {
  onReady: (player: any) => void;
  onStateChange: (event: any) => void;
  onError: (event: any) => void;
}

export default function YouTubePlayer({ onReady, onStateChange, onError }: YouTubePlayerProps) {
  const opts: YouTubeProps['opts'] = {
    height: '100', // Small, it will be visually hidden
    width: '100',
    playerVars: {
      listType: 'playlist',
      list: RECITER_PLAYLIST_ID,
      autoplay: 1, // Will autoplay muted per PRD
      mute: 1,
      controls: 0,
      modestbranding: 1,
      rel: 0,
      playsinline: 1,
    },
  };

  const handleReady: YouTubeProps['onReady'] = (event) => {
    // Return the player instance to the parent
    onReady(event.target);
  };

  return (
    <div className="youtube-container" aria-hidden="true">
      <YouTube
        opts={opts}
        onReady={handleReady}
        onStateChange={onStateChange}
        onError={onError}
      />
    </div>
  );
}
