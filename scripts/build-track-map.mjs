#!/usr/bin/env node
/**
 * Pulls every video (ID + title) out of the reciter playlist via the
 * official YouTube Data API v3 — read-only metadata, no audio/video is
 * downloaded — and prints a starter src/data/trackMap.ts entry per video.
 *
 * Why this exists: TRACK_MAP currently has 2 placeholder entries, but the
 * real playlist (see src/lib/constants.ts) has 93 tracks. This script does
 * the mechanical part (video IDs + titles); a human still has to fill in
 * surahNameArabic / openingAyahArabic / mood per the PRD, because a Quran
 * playlist's title text alone can't be safely auto-mapped to verified
 * mushaf text.
 *
 * Setup (~2 minutes, free tier is generous — one call for a 93-video
 * playlist is a rounding error against the daily quota):
 *   1. https://console.cloud.google.com/apis/library/youtube.googleapis.com
 *      -> enable "YouTube Data API v3" on any Google Cloud project
 *   2. Create an API key under "Credentials"
 *   3. YT_API_KEY=xxxxx node scripts/build-track-map.mjs > out.txt
 *
 * Most playlist titles for a single-reciter Quran playlist already name the
 * surah (e.g. "Surah Al-Baqarah - Idrees Abkar"), which is usually enough
 * to hand-fill surahNumber/surahNameArabic/reference quickly — but always
 * verify the Arabic text itself against Tanzil.net or the AlQuran Cloud API
 * (https://api.alquran.cloud/v1/), never retype it from a video title.
 */

const API_KEY = process.env.YT_API_KEY;
const PLAYLIST_ID = process.env.YT_PLAYLIST_ID || 'PL23vgdbgp7Gf8E-gNd6cdK3Ua2wI_aV03';

if (!API_KEY) {
  console.error('Missing YT_API_KEY. Set it to a YouTube Data API v3 key and re-run.');
  console.error('See the header comment in this file for the 2-minute setup.');
  process.exit(1);
}

const MOODS = ['dawn', 'dunes', 'water', 'default'];

async function fetchAllItems() {
  const items = [];
  let pageToken = '';

  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('playlistId', PLAYLIST_ID);
    url.searchParams.set('key', API_KEY);
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const res = await fetch(url);
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`YouTube API error ${res.status}: ${body}`);
    }
    const data = await res.json();
    items.push(...data.items);
    pageToken = data.nextPageToken || '';
  } while (pageToken);

  return items;
}

function escapeForTs(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

async function main() {
  const items = await fetchAllItems();
  console.error(`Fetched ${items.length} videos from playlist ${PLAYLIST_ID}.\n`);

  const entries = items.map((item, i) => {
    const videoId = item.snippet.resourceId.videoId;
    const title = item.snippet.title;
    const mood = MOODS[i % (MOODS.length - 1)]; // rotate dawn/dunes/water, skip "default"
    return `  '${videoId}': {
    videoId: '${videoId}',
    surahNumber: 0, // TODO — read from title: "${escapeForTs(title)}"
    surahNameArabic: '', // TODO — verify against Tanzil.net / AlQuran Cloud API
    openingAyahArabic: '', // TODO
    reference: '', // TODO e.g. "2:1-5"
    mood: '${mood}', // TODO — reassign deliberately once you've picked a real mood map (see PRD §3)
  },`;
  });

  console.log('// Auto-generated scaffold — fill in every TODO before use.');
  console.log('// Source titles are printed as comments to speed up the surah lookup.');
  console.log('export const TRACK_MAP_SCAFFOLD: Record<string, TrackMeta> = {');
  console.log(entries.join('\n'));
  console.log('};');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
