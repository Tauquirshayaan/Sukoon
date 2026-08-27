/**
 * A small, curated set of well-known short verses, one per surah, for the
 * Focus panel (see FocusPanel.tsx): tapping the verse card reveals where
 * the current track sits (surah + reference) and, when the surah has an
 * entry here, a widely-recognized short verse from it — in Arabic, plus a
 * short English gloss.
 *
 * This is a DELIBERATE, SCOPED exception to the site's "no translation"
 * rule (see the PRD) — not a general-purpose translation layer. It only
 * ever shows up (a) behind a tap, never ambient/always-on, and (b) only
 * for this small hand-picked list of iconic verses people already
 * recognize, not a running translation of whatever happens to be playing.
 *
 * Sourcing: Arabic text is the Uthmani mushaf text as published on
 * quran.com; the English gloss is adapted from quran.com's own displayed
 * translation (The Clear Quran, Dr. Mustafa Khattab), with its ˹˺
 * clarifying-word brackets removed for a shorter, plainer caption — the
 * meaning is unchanged, only the typographic apparatus is simplified.
 * As with src/data/surahMoods.ts, this is a starting point: have someone
 * knowledgeable in the tradition check the Arabic transcription and the
 * gloss wording before treating this list as final.
 */
export interface FamousVerse {
  surahNumber: number;
  reference: string; // e.g. "Al-Baqarah 2:255"
  arabicLines: string[];
  glossLines: string[];
  translationSource: string;
}

export const FAMOUS_VERSES: Record<number, FamousVerse> = {
  1: {
    surahNumber: 1,
    reference: "Al-Fatihah 1:6",
    arabicLines: ["ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ"],
    glossLines: ["Guide us along the straight path."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  2: {
    surahNumber: 2,
    reference: "Al-Baqarah 2:255 — Ayat al-Kursi",
    arabicLines: [
      "ٱللَّهُ لَآ إِلَـٰهَ إِلَّا هُوَ ٱلْحَىُّ ٱلْقَيُّومُ ۚ لَا تَأْخُذُهُۥ سِنَةٌۭ وَلَا نَوْمٌۭ ۚ لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَمَا فِى ٱلْأَرْضِ ۗ مَن ذَا ٱلَّذِى يَشْفَعُ عِندَهُۥٓ إِلَّا بِإِذْنِهِۦ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَىْءٍۢ مِّنْ عِلْمِهِۦٓ إِلَّا بِمَا شَآءَ ۚ وَسِعَ كُرْسِيُّهُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضَ ۖ وَلَا يَـُٔودُهُۥ حِفْظُهُمَا ۚ وَهُوَ ٱلْعَلِىُّ ٱلْعَظِيمُ",
    ],
    glossLines: [
      "Allah! There is no god worthy of worship except Him, the Ever-Living, All-Sustaining. Neither drowsiness nor sleep overtakes Him. To Him belongs whatever is in the heavens and whatever is on the earth. Who could possibly intercede with Him without His permission? He fully knows what is ahead of them and what is behind them, but no one can grasp any of His knowledge except what He wills to reveal. His Seat encompasses the heavens and the earth, and the preservation of both does not tire Him. For He is the Most High, the Greatest.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  6: {
    surahNumber: 6,
    reference: "Al-An'am 6:162",
    arabicLines: ["قُلْ إِنَّ صَلَاتِى وَنُسُكِى وَمَحْيَاىَ وَمَمَاتِى لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ"],
    glossLines: ["Say, 'Surely my prayer, my sacrifice, my life, and my death are all for Allah — Lord of all worlds.'"],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  12: {
    surahNumber: 12,
    reference: "Yusuf 12:87",
    arabicLines: [
      "يَٰبَنِىَّ ٱذْهَبُوا۟ فَتَحَسَّسُوا۟ مِن يُوسُفَ وَأَخِيهِ وَلَا تَا۟يْـَٔسُوا۟ مِن رَّوْحِ ٱللَّهِ ۖ إِنَّهُۥ لَا يَا۟يْـَٔسُ مِن رَّوْحِ ٱللَّهِ إِلَّا ٱلْقَوْمُ ٱلْكَٰفِرُونَ",
    ],
    glossLines: [
      "O my sons! Go and search diligently for Joseph and his brother. And do not lose hope in the mercy of Allah, for no one loses hope in Allah's mercy except those with no faith.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  13: {
    surahNumber: 13,
    reference: "Ar-Ra'd 13:28",
    arabicLines: ["ٱلَّذِينَ ءَامَنُوا۟ وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ ٱللَّهِ ۗ أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ"],
    glossLines: [
      "Those who believe and whose hearts find comfort in the remembrance of Allah — surely in the remembrance of Allah do hearts find comfort.",
    ],
    translationSource: "quran.com",
  },
  20: {
    surahNumber: 20,
    reference: "Ta-Ha 20:25",
    arabicLines: ["قَالَ رَبِّ ٱشْرَحْ لِى صَدْرِى"],
    glossLines: ["Moses prayed, 'My Lord, uplift my heart for me.'"],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  39: {
    surahNumber: 39,
    reference: "Az-Zumar 39:53",
    arabicLines: [
      "قُلْ يَٰعِبَادِىَ ٱلَّذِينَ أَسْرَفُوا۟ عَلَىٰٓ أَنفُسِهِمْ لَا تَقْنَطُوا۟ مِن رَّحْمَةِ ٱللَّهِ ۚ إِنَّ ٱللَّهَ يَغْفِرُ ٱلذُّنُوبَ جَمِيعًا ۚ إِنَّهُۥ هُوَ ٱلْغَفُورُ ٱلرَّحِيمُ",
    ],
    glossLines: [
      "Say, 'O My servants who have exceeded the limits against their souls! Do not lose hope in Allah's mercy, for Allah certainly forgives all sins. He is indeed the All-Forgiving, Most Merciful.'",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  65: {
    surahNumber: 65,
    reference: "At-Talaq 65:3",
    arabicLines: [
      "وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى ٱللَّهِ فَهُوَ حَسْبُهُۥٓ ۚ إِنَّ ٱللَّهَ بَٰلِغُ أَمْرِهِۦ ۚ قَدْ جَعَلَ ٱللَّهُ لِكُلِّ شَىْءٍۢ قَدْرًا",
    ],
    glossLines: [
      "…and He provides for them from sources they could never imagine. And whoever puts their trust in Allah, then He alone is sufficient for them. Certainly Allah achieves His will. Allah has already set a destiny for everything.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  94: {
    surahNumber: 94,
    reference: "Ash-Sharh 94:5-6",
    arabicLines: ["فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا", "إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا"],
    glossLines: ["So, surely with hardship comes ease.", "Surely with that hardship comes more ease."],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  103: {
    surahNumber: 103,
    reference: "Al-'Asr 103:1-3",
    arabicLines: [
      "وَٱلْعَصْرِ",
      "إِنَّ ٱلْإِنسَٰنَ لَفِى خُسْرٍ",
      "إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ",
    ],
    glossLines: [
      "By the passage of time!",
      "Surely humanity is in grave loss,",
      "except those who have faith, do good, and urge each other to the truth, and urge each other to perseverance.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
  112: {
    surahNumber: 112,
    reference: "Al-Ikhlas 112:1-4",
    arabicLines: ["قُلْ هُوَ ٱللَّهُ أَحَدٌ", "ٱللَّهُ ٱلصَّمَدُ", "لَمْ يَلِدْ وَلَمْ يُولَدْ", "وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ"],
    glossLines: [
      "Say, 'He is Allah — One and Indivisible;'",
      "Allah — the Sustainer needed by all.",
      "He has never had offspring, nor was He born.",
      "And there is none comparable to Him.",
    ],
    translationSource: "The Clear Quran, Dr. Mustafa Khattab",
  },
};

export function getFamousVerseForSurah(surahNumber: number | null | undefined): FamousVerse | null {
  if (!surahNumber) return null;
  return FAMOUS_VERSES[surahNumber] ?? null;
}
