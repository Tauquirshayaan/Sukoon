import { MoodKey } from "./surahMoods";

export interface TrackMeta {
  videoId: string;
  surahNumber: number;
  surahNameArabic: string;
  openingAyahArabic: string;
  reference: string;
  mood: MoodKey;
}

// STATUS: placeholder data only — none of these video IDs belong to the real
// RECITER_PLAYLIST_ID (src/lib/constants.ts, the 93-track Idrees Abkar
// playlist). That means in production, currentMeta is almost always null:
// CalligraphyCard falls back to the raw YouTube title, and the mood is
// always "default" — which is most of why the site currently feels flat.
//
// Run `node scripts/build-track-map.mjs` (needs a free YouTube Data API v3
// key — see that file's header comment) to pull every real video ID + title
// from the playlist and scaffold real entries below. The script can't infer
// surahNameArabic/openingAyahArabic/mood on its own — a Quran playlist's
// video titles almost always name the surah, so fill those three fields in
// by hand per PRD §3 ("this content work is done once, by someone who's
// read the surahs — not automated").
//
// The previous placeholder here mapped a real, unrelated YouTube video ID
// to Al-Fatiha — harmless as a mock, but a genuinely bad thing to ship by
// accident (a random video mislabeled as Qur'an recitation). Deliberately
// non-ID-shaped keys below (real IDs are always 11 chars) so a leftover
// entry can never silently match a real video.
export const TRACK_MAP: Record<string, TrackMeta> = {
  'REPLACE_WITH_REAL_ID_1': {
    videoId: 'REPLACE_WITH_REAL_ID_1',
    surahNumber: 55,
    surahNameArabic: 'الرحمن',
    openingAyahArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱلرَّحْمَٰنُ عَلَّمَ ٱلْقُرْءَانَ خَلَقَ ٱلْإِنسَٰنَ',
    reference: '55:1-3',
    mood: 'dawn'
  },
  'REPLACE_WITH_REAL_ID_2': {
    videoId: 'REPLACE_WITH_REAL_ID_2',
    surahNumber: 67,
    surahNameArabic: 'الملك',
    openingAyahArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ',
    reference: '67:1',
    mood: 'dunes'
  },
};
