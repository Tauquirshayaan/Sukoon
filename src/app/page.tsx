"use client";

import React, { useState, useRef, useEffect } from 'react';
import YouTubePlayer from '@/components/YouTubePlayer';
import AtmosphereCanvas from '@/components/AtmosphereCanvas';
import Header from '@/components/Header';
import VintagePlayer from '@/components/VintagePlayer';
import Modals from '@/components/Modals';
import { TRACK_MAP } from '@/data/trackMap';

import CalligraphyCard from '@/components/CalligraphyCard';
import BackgroundVideo from '@/components/BackgroundVideo';
import MoodCanvas from '@/components/MoodCanvas';
import VibePicker from '@/components/VibePicker';
import { resolveMoodFromTitle } from '@/lib/moodMatch';
import { MoodKey } from '@/data/surahMoods';

function formatTime(s: number) {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isRainActive, setIsRainActive] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>("");
  const [progressPct, setProgressPct] = useState(0);
  const [currentTimeStr, setCurrentTimeStr] = useState("0:00");
  const [totalTimeStr, setTotalTimeStr] = useState("0:00");
  const [manualMood, setManualMood] = useState<MoodKey | null>(null);

  const playerRef = useRef<any>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const cur = playerRef.current.getCurrentTime() || 0;
        const dur = playerRef.current.getDuration() || 0;
        setCurrentTimeStr(formatTime(cur));
        setTotalTimeStr(formatTime(dur));
        const pct = dur > 0 ? (cur / dur) * 100 : 0;
        setProgressPct(pct);

        const data = playerRef.current.getVideoData();
        if (data && data.title) setVideoTitle(data.title);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    setIsReady(true);
    const data = player.getVideoData();
    if (data && data.title) setVideoTitle(data.title);
  };

  const handleStateChange = (event: any) => {
    if (event.data === 1) {
      setIsPlaying(true);
    } else if (event.data === 2) {
      setIsPlaying(false);
    } else if (event.data === 0) {
      // Track ended: Autoplay-continue
      setIsPlaying(false);
      if (playerRef.current) {
        playerRef.current.nextVideo();
      }
    }

    if (playerRef.current) {
      const data = playerRef.current.getVideoData();
      if (data && data.video_id && data.video_id !== currentVideoId) {
        setCurrentVideoId(data.video_id);
      }
      if (data && data.title) {
        setVideoTitle(data.title);
      }
    }
  };

  const handleError = (event: any) => {
    console.error("YouTube Player Error:", event.data);
    if (playerRef.current) {
      playerRef.current.nextVideo();
    }
  };

  const handleStart = () => {
    if (!playerRef.current) return;
    playerRef.current.unMute();
    playerRef.current.setVolume(50);
    playerRef.current.playVideo();
    setHasStarted(true);
  };

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const handleNext = () => {
    if (playerRef.current) playerRef.current.nextVideo();
  };

  const handlePrev = () => {
    if (playerRef.current) playerRef.current.previousVideo();
  };

  const handleShuffle = () => {
    if (!playerRef.current) return;
    const playlist = playerRef.current.getPlaylist();
    if (playlist && playlist.length > 0) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      playerRef.current.playVideoAt(randomIndex);
    }
  };

  const handleSeek = (pct: number) => {
    if (playerRef.current && playerRef.current.getDuration) {
      const dur = playerRef.current.getDuration();
      playerRef.current.seekTo(pct * dur, true);
    }
  };

  const handleVolumeChange = (level: number) => {
    if (playerRef.current) {
      if (level === 0) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(level);
      }
    }
  };

  const currentMeta = currentVideoId ? TRACK_MAP[currentVideoId] : null;

  // Mood resolution, in priority order:
  //   1. A manual pick from the VibePicker always wins outright.
  //   2. A hand-curated TRACK_MAP entry (exact video ID match) — the most
  //      trustworthy source once a track has actually been reviewed.
  //   3. Otherwise, derive it from the surah name found in the video's own
  //      title (see src/lib/moodMatch.ts) — this is what makes the mood
  //      actually vary across all ~90+ tracks that aren't in TRACK_MAP yet,
  //      instead of everything falling back to one static "default" mood.
  const autoMood: MoodKey = currentMeta?.mood ?? resolveMoodFromTitle(videoTitle).mood;
  const effectiveMood: MoodKey = manualMood ?? autoMood;

  return (
    <section className="relative w-full h-[100svh] overflow-hidden select-none bg-[#120806]">
      <BackgroundVideo mood={effectiveMood} />
      <MoodCanvas mood={effectiveMood} />
      <AtmosphereCanvas isActive={isRainActive} />
      
      {/* Landing Overlay */}
      <div 
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md transition-all duration-1000 ${hasStarted ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'}`}
      >
        <h1 className="font-hindi text-7xl sm:text-[10rem] font-extrabold tracking-wide text-white leading-none mb-10 drop-shadow-[0_0_60px_rgba(255,255,255,0.4)]">
          سُكُون
        </h1>
        <button
          onClick={handleStart}
          disabled={!isReady}
          className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full px-10 py-4 text-xl font-bold backdrop-blur-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:hover:scale-100"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          <span className="relative tracking-wider">{isReady ? "TAP TO LISTEN" : "LOADING..."}</span>
        </button>
      </div>

      <div className={`transition-opacity duration-1000 ${hasStarted ? 'opacity-100' : 'opacity-0'}`}>
        <Header />

        <main className="absolute inset-0 z-10 flex flex-col items-center justify-between pt-14 pb-2 xs:pb-3 sm:pt-20 sm:pb-6 px-3 sm:px-6 pointer-events-none">
          
          <div className="pointer-events-auto text-center mt-6 xs:mt-8 sm:mt-0 w-full flex-1 flex flex-col items-center justify-center">
            <CalligraphyCard meta={currentMeta} fallbackTitle={videoTitle} />

            <button
              type="button"
              className="tweak-pill group border-amber-500/40 text-amber-300 hover:text-amber-100 hover:border-amber-400 cursor-pointer mt-8 mx-auto"
              onClick={() => window.dispatchEvent(new CustomEvent("open-chat-modal"))}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" aria-hidden="true"></span>
              <span className="font-medium tracking-wide">💬 Live Chat</span>
            </button>
          </div>

          <div className="w-full max-w-md xs:max-w-lg sm:max-w-2xl flex flex-col items-center gap-2 sm:gap-3 mt-auto mb-1 sm:my-auto">
            <div className="order-0 pointer-events-auto flex items-center justify-center gap-1.5 xs:gap-2 flex-nowrap max-w-full overflow-x-auto no-scrollbar py-1 px-1">
              <button
                type="button"
                className={`rain-toggle-pill group shrink-0 ${isRainActive ? "active" : ""}`}
                onClick={() => setIsRainActive(!isRainActive)}
              >
                <span className="text-sm transition-transform group-hover:scale-125" aria-hidden="true">
                  {isRainActive ? "⚡" : "🌧️"}
                </span>
                <span className="font-medium tracking-wide">Atmosphere</span>
              </button>

              <button
                type="button"
                className="share-toggle-pill group shrink-0"
                onClick={handleShuffle}
              >
                <span className="font-medium tracking-wide">Shuffle</span>
              </button>

              <VibePicker manualMood={manualMood} autoMood={autoMood} onChange={setManualMood} />

              <button
                type="button"
                className="share-toggle-pill group shrink-0"
                onClick={() => {
                  const message = encodeURIComponent("Find peace with Sukoon - ambient Quran radio ✨\n\nListen now 👉🏻 https://sukoon.example.com");
                  window.open(`https://api.whatsapp.com/send?text=${message}`, "_blank");
                }}
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#25D366] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span className="font-medium tracking-wide">Share</span>
              </button>
            </div>

            <VintagePlayer
              isPlaying={isPlaying}
              progress={progressPct}
              currentTime={currentTimeStr}
              totalTime={totalTimeStr}
              trackName={currentMeta?.surahNameArabic || videoTitle || "Loading Surah..."}
              channelName={"Sukoon Radio"}
              coverUrl={`https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg`}
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrev={handlePrev}
              onSeek={handleSeek}
              onVolumeChange={handleVolumeChange}
            />

            <footer className="order-3 sm:order-3 pointer-events-auto text-[8.5px] sm:text-xs text-white/50 tracking-widest font-mono mt-0 sm:mt-1">
              contact: salam@sukoon.example.com
            </footer>
          </div>
        </main>
      </div>

      <Modals />

      <YouTubePlayer 
        onReady={handlePlayerReady} 
        onStateChange={handleStateChange}
        onError={handleError}
      />
    </section>
  );
}
