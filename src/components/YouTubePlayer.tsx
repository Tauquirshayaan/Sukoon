"use client";

import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { RECITER_PLAYLIST_ID } from '@/lib/constants';
import { YTPlayer } from '@/types/youtube';

interface YouTubePlayerProps {
  onReady: (player: YTPlayer) => void;
  onStateChange: YouTubeProps['onStateChange'];
  onError: YouTubeProps['onError'];
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
    // event.target's declared type comes from the untyped `youtube-player`
    // package (see src/types/youtube.ts) — this is the one boundary cast
    // to our own typed interface.
    onReady(event.target as unknown as YTPlayer);
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
