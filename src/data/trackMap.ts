export interface TrackMeta {
  videoId: string;
  surahNumber: number;
  surahNameArabic: string;
  openingAyahArabic: string;
  reference: string;
  mood: string;
}

// TODO: Replace with the actual hand-curated map once provided by the user.
export const TRACK_MAP: Record<string, TrackMeta> = {
  'mock_vid_1': {
    videoId: 'mock_vid_1',
    surahNumber: 55,
    surahNameArabic: 'الرحمن',
    openingAyahArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ ٱلرَّحْمَٰنُ عَلَّمَ ٱلْقُرْءَانَ خَلَقَ ٱلْإِنسَٰنَ',
    reference: '55:1-3',
    mood: 'dawn'
  },
  'mock_vid_2': {
    videoId: 'mock_vid_2',
    surahNumber: 67,
    surahNameArabic: 'الملك',
    openingAyahArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ',
    reference: '67:1',
    mood: 'dunes'
  },
  'dQw4w9WgXcQ': {
    videoId: 'dQw4w9WgXcQ',
    surahNumber: 1,
    surahNameArabic: 'الفاتحة',
    openingAyahArabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
    reference: '1:1',
    mood: 'water'
  }
};
