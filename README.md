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

## Adding Custom Background Videos

By default, the app uses beautiful animated CSS mesh gradients as a fallback. To enable the looping video backgrounds (as specified in the PRD), drop your video files into the `/public/videos/` directory:
- `/public/videos/dawn.mp4`
- `/public/videos/dunes.mp4`
- `/public/videos/water.mp4`
- `/public/videos/default.mp4`

## License
Private Property of Sukoon Developer.
