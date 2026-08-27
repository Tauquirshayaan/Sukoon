# Sukoon — Product Requirements Document (v2)

**Status:** Draft for build
**Owner:** Shayaan
**Companion doc:** [From Saloon to Sukoon (concept)](https://claude.ai/code/artifact/047d3f54-2478-4d12-bf66-60dd64183e15)

## Summary

Sukoon is a single-screen ambient web app: press play, hear a reciter, watch a slow looping mood video shift, see the surah's name and opening ayah in Arabic calligraphy. Tap **Next** to move to the next track, tap **Shuffle** to jump somewhere new. No account, no feed, no translation panel.

Inspired by saloon.wtf's mechanic (one big image + one song + zero friction, audio borrowed from Spotify/YouTube rather than hosted), rebuilt for Qur'an recitation with the sensitivities that content requires.

## What changed from the first concept

- **Cut:** No on-screen translation. Arabic calligraphy only — this is a listening experience, not a reading one.
- **Changed:** Backgrounds are looping ambient video (dawn clouds, dunes, water, night sky), not geometric pattern.
- **Changed:** Audio comes from a curated YouTube playlist of one melodic-voiced reciter, not a custom audio pipeline/hosting.
- **Side effect:** Because YouTube playlists are per-surah, not per-ayah, Shuffle/Next always land on a full surah — never an isolated verse out of context.

## Goals

- Under 2 taps from landing to audio playing
- Calm and unhurried, never gamified
- One-handed, mobile-first
- Zero custom audio hosting

## Non-goals (for now)

- Translation or tafsir display
- Ayah-by-ayah synced captions
- User accounts, favorites, streaks
- Multiple reciters at launch

## The experience

1. **Landing** — full-bleed screen, a muted ambient background video already drifting, one centered Play control.
2. **Play** — tap once: audio unmutes and starts, the calligraphy card fades in, background crossfades to that track's mood.
3. **Next** — advances to the next track in the playlist; calligraphy + background crossfade together, audio doesn't hard-cut.
4. **Shuffle** — jumps to a random track elsewhere in the playlist, same crossfade behavior.
5. **Idle/continuous play** — when a track ends, the player auto-advances to the next one (a radio, not a jukebox you have to keep tapping).

## Content requirements

**Calligraphy card** — each track gets one static "cover": the surah's Arabic name, its opening ayah (or a short well-known excerpt) in a large Arabic display face, plus a small surah:ayah reference. It's the album art for that track — it doesn't move line-by-line with the audio. Source all Arabic text from a verified mushaf source (Tanzil.net or the AlQuran Cloud API `https://api.alquran.cloud/v1/`) — never hand-typed.

**Background video library** — 4–6 short (10–20s), seamlessly looping clips, muted, no visible people/figures, no baked-in text. Suggested set: dawn clouds breaking, desert dunes at dusk, still water/gentle rain, night sky with slow star drift, sunlight through leaves, candle/lantern flame. Confirm a clear commercial/royalty-free license (or shoot original) for each clip.

**Mood mapping** — a small hand-curated table (not algorithmic): each surah in the playlist gets one assigned mood/clip. Build this by hand, by someone who has actually read the surahs.

## Audio source: YouTube playlist

Play a single reciter's official YouTube playlist through the standard embeddable IFrame player. No audio hosting, no licensing negotiation over individual files, and the reciter is credited by construction since it's their channel playing.

**Shortlisted reciters** (pick one voice for launch):

| Reciter | Style notes |
|---|---|
| Mishary Rashid Al-Alafasy | Most-streamed reciter online; gentle, distinctive phrasing; broad South Asian recognition |
| Yasser Al-Dosari | Warm, melodic, emotive; strong social following |
| Maher Al-Muaiqly | Most melodic of current Haram imams |
| Muhammad Siddiq Al-Minshawi | Archival Mujawwad recordings, especially loved for dawn recitations |
| Abdul Basit Abdul Samad | The defining 20th-century voice; archival recordings only |

For archival reciters, confirm the channel is an official/verified estate upload or one that has explicitly granted permission.

**Granularity, honestly:** a YouTube playlist gives one track per surah, not per ayah. Next/Shuffle move between whole surahs. True ayah-level jumping would require a separate timestamped audio source later (see Phase 3).

## System architecture

- **Frontend:** single Next.js (or static) page. No backend for MVP — playlist + mood map ship as static JSON.
- **Audio engine:** YouTube IFrame Player API with `listType: 'playlist'` pointed at the reciter's playlist ID. Player stays in the DOM but visually hidden behind the custom UI (not `display:none`), `aria-hidden`.
- **Autoplay:** load muted (`mute: 1`); the visible Play tap calls `unMute()` + `playVideo()` together to satisfy the browser gesture requirement.
- **Controls:** `player.nextVideo()` for Next. For Shuffle, read `player.getPlaylist()` length and call `player.playVideoAt(randomIndex)`.
- **Track → content map:** hand-maintained JSON keyed by YouTube **video ID** (not playlist position) → `{ surahNumber, surahNameArabic, openingAyahArabic, mood }`. Listen to `onStateChange`, read the current video ID, look up calligraphy + mood.
- **Background video:** self-hosted, compressed, muted `<video loop autoplay muted playsinline>`, crossfaded via CSS opacity on mood change.

```js
player = new YT.Player('audio-host', {
  playerVars: {
    listType: 'playlist',
    list: RECITER_PLAYLIST_ID,
    autoplay: 1,
    mute: 1,
    controls: 0,
    modestbranding: 1,
    rel: 0,
    playsinline: 1
  },
  events: { onStateChange: handleTrackChange }
});

function handleTrackChange(e) {
  const videoId = player.getVideoData().video_id;
  const meta = TRACK_MAP[videoId];
  if (meta) renderCalligraphy(meta);
}
```

## Non-functional requirements

| Area | Requirement |
|---|---|
| Performance | Background video < ~2MB per loop, lazy-loaded; first paint < 2s on mid-range mobile |
| Mobile-first | Designed for one-handed portrait use; desktop is a scaled-up version |
| Accessibility | Real, labeled Play/Next/Shuffle buttons with visible focus states; respect `prefers-reduced-motion` (freeze drift/crossfades) |
| Resilience | If a playlist video is removed/blocked, skip silently to the next track |

## Licensing & tone — read before building

**Open, unresolved:**
1. If the reciter's channel is monetized, the embed can show a pre-roll ad — decide whether that's acceptable or a launch blocker.
2. Standard embedding is technically allowed by YouTube's terms, but get explicit permission from the reciter/channel before shipping a branded product around their recitation — especially for archival recordings tied to an estate.

**Non-negotiable:** never rehost/download the audio (embed only); credit the reciter visibly at all times; calm tone, not playful; no ads or monetization on the product itself beyond an optional donation link.

## Success metrics

- Median session length (minutes listened per visit)
- 7-day return rate
- Tracks per session (Next/Shuffle usage vs. letting it run)
- Autoplay-continue rate (% of sessions still playing when a track ends and the next begins)

## Build roadmap

| Phase | Scope | Est. |
|---|---|---|
| 0 — Foundations | Pick reciter + get permission; build 15–25 track map (video ID → surah → mood) by hand; source/license 4–6 background loops; finalize calligraphy type treatment | 1 week |
| 1 — MVP | Single-screen radio: Play, Next, Shuffle, continuous autoplay, calligraphy + mood crossfade. No accounts/settings | 1–2 weeks |
| 2 — V1 | Surah list to jump directly to one; PWA installability; basic privacy-respecting analytics against the metrics above | 2–3 weeks |
| 3 — Later | Second reciter as a voice picker; if true ayah-level jumping is wanted, swap in a timestamped audio source (mp3quran.net / everyayah.com) for that reciter; optional off-by-default translation toggle | Only if V1 earns it |

## Open questions

- Which single reciter for launch — and has permission actually been granted, in writing?
- Is a pre-roll ad on the embed acceptable, or a launch blocker?
- Who signs off on the mood-mapping table and calligraphy excerpts before ship?
- Final domain: `sukoon.fm`, `sukoon.study`, or something else?

## Reference verse text (verified, Uthmani mushaf via AlQuran Cloud API)

- **Ar-Rahman 55:1–3:** بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱلرَّحْمَٰنُ عَلَّمَ ٱلْقُرْءَانَ خَلَقَ ٱلْإِنسَٰنَ
- **Al-Mulk 67:1:** بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ

## Sources

- [RecitID — notable Qur'an reciters and vocal styles](https://recitid.ai/blog/top-20-quran-reciters)
- [Google — YouTube IFrame Player API reference](https://developers.google.com/youtube/iframe_api_reference)
- [Google — YouTube embedded player parameters](https://developers.google.com/youtube/player_parameters)
- Verse text verified via the AlQuran Cloud API (Uthmani mushaf)
