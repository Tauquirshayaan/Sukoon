// Minimal surface of the YouTube IFrame Player API actually used in this
// app. `youtube-player` (react-youtube's underlying dependency) ships only
// Flow types, not TypeScript, so `YouTubePlayer` re-exported from
// 'react-youtube' resolves to `any` — this local interface gives real
// type-checking instead.
export interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  nextVideo(): void;
  previousVideo(): void;
  playVideoAt(index: number): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  mute(): void;
  unMute(): void;
  setVolume(volume: number): void;
  getDuration(): number;
  getCurrentTime(): number;
  getPlaylist(): string[] | undefined;
  getVideoData(): { video_id?: string; title?: string };
}
