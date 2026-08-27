# Sukoon - Ambient Quran Radio ✨

Sukoon is a carefully curated, zero-friction ambient radio web application designed to help users find peace and tranquility. It blends beautiful recitations of the Quran (via an invisible YouTube player) with soothing atmospheric sounds like rain and gentle waves.

## Features

- **Ambient & Zero Friction**: Full-bleed glassmorphic UI that gets out of the way. Starts with a serene landing screen that fades into the player.
- **Continuous Autoplay**: Seamlessly plays through curated recitations.
- **Atmosphere System**: Built-in HTML5 canvas effects (like Rain & Lightning) that overlay naturally with the recitations.
- **Glassmorphic UI**: Custom CSS mesh gradients and blur effects matching a premium aesthetic.
- **Live Chat**: Anonymous, real-time community chat panel (backed by an API route with profanity filtering).
- **Beautiful Typography**: Calligraphy cards featuring the `Amiri` font for Arabic text, fading in gracefully on track changes.
- **Full Controls**: Play/Pause, Next/Prev, Volume Control, Shuffle, and Share.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 & custom animated CSS mesh gradients
- **Player**: `react-youtube` (headless player integration)
- **Deployment**: Vercel ready

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) (or whichever port Next.js assigns) in your browser.

## Project Structure

- `/src/app`: Next.js App Router files (`page.tsx`, `layout.tsx`, `globals.css`)
- `/src/components`: UI components (`VintagePlayer.tsx`, `Header.tsx`, `AtmosphereCanvas.tsx`, `Modals.tsx`, `CalligraphyCard.tsx`, `YouTubePlayer.tsx`)
- `/src/data`: Data maps (e.g. `trackMap.ts` mapping YouTube IDs to Surah metadata)
- `sukoonprd.md`: Original Product Requirements Document (PRD)

## The mood/vibe system

Three things were fixed here that were previously silently broken — worth understanding before you touch this again:

1. **`.background-container` / `.background-layer` / `.background-video` had no CSS at all.** They're plain, unstyled divs in `BackgroundVideo.tsx`, so every mood layer collapsed to zero height regardless of whether a video loaded — this was the main reason the "mood" system was invisible. Fixed in `globals.css` (proper `position: absolute; inset: 0`, opacity crossfade on `.active`, a slow Ken Burns zoom for a bit of life even on the gradient fallback).
2. **The Amiri calligraphy font wasn't actually loading.** `next/font/google`'s `variable: '--font-arabic'` option only exposes a scoped CSS variable — it does not register a global font named "Amiri" the way `globals.css` and `tailwind.config.ts` assumed. Both now reference `var(--font-arabic)`.
3. **A procedural `MoodCanvas` layer was added** (`src/components/MoodCanvas.tsx`) so the site has real drifting motion — light motes, per-mood color and direction — even before any real video asset exists. It sits between the mood color layer and the legibility scrim, and costs nothing to keep even after real video loops are added.

### Adding real looping video

The app uses animated CSS mesh gradients + the `MoodCanvas` particle layer as the fallback. To layer in real footage, drop 10–20s, seamlessly looping, muted clips into `/public/videos/`:
- `/public/videos/dawn.mp4` — soft clouds/light breaking, warm gold tones
- `/public/videos/dunes.mp4` — slow desert dunes at dusk
- `/public/videos/water.mp4` — still water or gentle rain
- `/public/videos/default.mp4` — night sky / general ambient fallback

No people or figures in any clip (see the PRD's note on imagery). Free, commercially-usable sources to check first: Pexels Videos, Coverr, and Mixkit all have "clouds timelapse," "desert dunes," and "water ripples" categories with no-attribution-required licenses — confirm the specific clip's license before shipping either way.

### Populating real track data

`src/data/trackMap.ts` currently has 2 placeholder entries — none of them match a real video ID from the actual 93-track reciter playlist (`RECITER_PLAYLIST_ID` in `src/lib/constants.ts`), so in production `currentMeta` is almost always `null`. Run:

```bash
YT_API_KEY=your_key node scripts/build-track-map.mjs > scaffold.ts
```

(needs a free YouTube Data API v3 key — see the script's header comment for the 2-minute setup) to pull every real video ID + title, then fill in the Arabic text and mood for each by hand against a verified source (Tanzil.net or `api.alquran.cloud`) per the PRD.

## License
Private Property of Sukoon Developer.
