/**
 * A first-pass mood classification for all 114 surahs, keyed to the 4 moods
 * that already exist in BackgroundVideo.tsx / MoodCanvas.tsx (dawn, dunes,
 * water, default). This exists so the mood system works WITHOUT requiring
 * every video ID to be hand-entered into TRACK_MAP first (see moodMatch.ts)
 * — TRACK_MAP is still the source of truth when a track IS curated there;
 * this is what fills the gap for the other ~90 tracks until it is.
 *
 * How each surah was assigned a mood (in order of priority):
 *   1. The surah's own name, where it literally names a mood-relevant thing
 *      (e.g. Al-Fajr = "The Dawn", Al-Ahqaf = "The Sandhills/Dunes").
 *   2. Well-known, prominent imagery in the surah (e.g. Nuh = the Flood ->
 *      water; Yusuf = a journey/caravan narrative -> dunes).
 *   3. Otherwise: "default" (a calmer, neutral mood — the majority of
 *      surahs, especially the longer Medinan legal/community-guidance ones,
 *      genuinely don't have one dominant elemental image, and forcing one
 *      would be worse than a neutral, contemplative background).
 *
 * IMPORTANT — this is a starting point, not a scholarly classification.
 * Per the PRD's content-review step: have someone knowledgeable in the
 * tradition read through this list before treating it as final. It's a
 * flat, easy-to-edit array specifically so that review is easy to act on.
 */

export type MoodKey = "dawn" | "dunes" | "water" | "default";

export interface SurahMoodEntry {
  number: number;
  name: string; // standard transliteration, e.g. "Al-Baqarah"
  arabicName: string;
  mood: MoodKey;
}

export const SURAH_MOODS: SurahMoodEntry[] = [
  { number: 1, name: "Al-Fatihah", arabicName: "الفاتحة", mood: "dawn" },
  { number: 2, name: "Al-Baqarah", arabicName: "البقرة", mood: "default" },
  // Matched on "Imran" alone (its distinctive part) rather than the full
  // "Aali Imran" / "Al-Imran" / "Ale-Imran" name — transliteration of the
  // "Aal-e-" article varies enough across channels that matching the one
  // unambiguous word is more reliable than trying to cover every spelling.
  { number: 3, name: "Imran", arabicName: "آل عمران", mood: "default" },
  { number: 4, name: "An-Nisa", arabicName: "النساء", mood: "default" },
  { number: 5, name: "Al-Ma'idah", arabicName: "المائدة", mood: "default" },
  { number: 6, name: "Al-An'am", arabicName: "الأنعام", mood: "water" },
  { number: 7, name: "Al-A'raf", arabicName: "الأعراف", mood: "dunes" },
  { number: 8, name: "Al-Anfal", arabicName: "الأنفال", mood: "default" },
  { number: 9, name: "At-Tawbah", arabicName: "التوبة", mood: "default" },
  { number: 10, name: "Yunus", arabicName: "يونس", mood: "water" },
  { number: 11, name: "Hud", arabicName: "هود", mood: "dunes" },
  { number: 12, name: "Yusuf", arabicName: "يوسف", mood: "dunes" },
  { number: 13, name: "Ar-Ra'd", arabicName: "الرعد", mood: "water" },
  { number: 14, name: "Ibrahim", arabicName: "ابراهيم", mood: "dunes" },
  { number: 15, name: "Al-Hijr", arabicName: "الحجر", mood: "dunes" },
  { number: 16, name: "An-Nahl", arabicName: "النحل", mood: "water" },
  { number: 17, name: "Al-Isra", arabicName: "الإسراء", mood: "default" },
  { number: 18, name: "Al-Kahf", arabicName: "الكهف", mood: "water" },
  { number: 19, name: "Maryam", arabicName: "مريم", mood: "water" },
  { number: 20, name: "Ta-Ha", arabicName: "طه", mood: "dunes" },
  { number: 21, name: "Al-Anbiya", arabicName: "الأنبياء", mood: "water" },
  { number: 22, name: "Al-Hajj", arabicName: "الحج", mood: "default" },
  { number: 23, name: "Al-Mu'minun", arabicName: "المؤمنون", mood: "water" },
  { number: 24, name: "An-Nur", arabicName: "النور", mood: "dawn" },
  { number: 25, name: "Al-Furqan", arabicName: "الفرقان", mood: "default" },
  { number: 26, name: "Ash-Shu'ara", arabicName: "الشعراء", mood: "water" },
  { number: 27, name: "An-Naml", arabicName: "النمل", mood: "dunes" },
  { number: 28, name: "Al-Qasas", arabicName: "القصص", mood: "dunes" },
  { number: 29, name: "Al-Ankabut", arabicName: "العنكبوت", mood: "dunes" },
  { number: 30, name: "Ar-Rum", arabicName: "الروم", mood: "default" },
  { number: 31, name: "Luqman", arabicName: "لقمان", mood: "default" },
  { number: 32, name: "As-Sajdah", arabicName: "السجدة", mood: "water" },
  { number: 33, name: "Al-Ahzab", arabicName: "الأحزاب", mood: "default" },
  { number: 34, name: "Saba", arabicName: "سبأ", mood: "default" },
  { number: 35, name: "Fatir", arabicName: "فاطر", mood: "water" },
  { number: 36, name: "Ya-Sin", arabicName: "يس", mood: "default" },
  { number: 37, name: "As-Saffat", arabicName: "الصافات", mood: "default" },
  { number: 38, name: "Sad", arabicName: "ص", mood: "default" },
  { number: 39, name: "Az-Zumar", arabicName: "الزمر", mood: "default" },
  { number: 40, name: "Ghafir", arabicName: "غافر", mood: "default" },
  { number: 41, name: "Fussilat", arabicName: "فصلت", mood: "water" },
  { number: 42, name: "Ash-Shura", arabicName: "الشورى", mood: "default" },
  { number: 43, name: "Az-Zukhruf", arabicName: "الزخرف", mood: "default" },
  { number: 44, name: "Ad-Dukhan", arabicName: "الدخان", mood: "water" },
  { number: 45, name: "Al-Jathiyah", arabicName: "الجاثية", mood: "default" },
  { number: 46, name: "Al-Ahqaf", arabicName: "الأحقاف", mood: "dunes" },
  { number: 47, name: "Muhammad", arabicName: "محمد", mood: "default" },
  { number: 48, name: "Al-Fath", arabicName: "الفتح", mood: "default" },
  { number: 49, name: "Al-Hujurat", arabicName: "الحجرات", mood: "default" },
  { number: 50, name: "Qaf", arabicName: "ق", mood: "water" },
  { number: 51, name: "Adh-Dhariyat", arabicName: "الذاريات", mood: "water" },
  { number: 52, name: "At-Tur", arabicName: "الطور", mood: "default" },
  { number: 53, name: "An-Najm", arabicName: "النجم", mood: "water" },
  { number: 54, name: "Al-Qamar", arabicName: "القمر", mood: "water" },
  { number: 55, name: "Ar-Rahman", arabicName: "الرحمن", mood: "dawn" },
  { number: 56, name: "Al-Waqi'ah", arabicName: "الواقعة", mood: "water" },
  { number: 57, name: "Al-Hadid", arabicName: "الحديد", mood: "default" },
  { number: 58, name: "Al-Mujadila", arabicName: "المجادلة", mood: "default" },
  { number: 59, name: "Al-Hashr", arabicName: "الحشر", mood: "default" },
  { number: 60, name: "Al-Mumtahanah", arabicName: "الممتحنة", mood: "default" },
  { number: 61, name: "As-Saff", arabicName: "الصف", mood: "default" },
  { number: 62, name: "Al-Jumu'ah", arabicName: "الجمعة", mood: "default" },
  { number: 63, name: "Al-Munafiqun", arabicName: "المنافقون", mood: "default" },
  { number: 64, name: "At-Taghabun", arabicName: "التغابن", mood: "default" },
  { number: 65, name: "At-Talaq", arabicName: "الطلاق", mood: "default" },
  { number: 66, name: "At-Tahrim", arabicName: "التحريم", mood: "default" },
  { number: 67, name: "Al-Mulk", arabicName: "الملك", mood: "water" },
  { number: 68, name: "Al-Qalam", arabicName: "القلم", mood: "default" },
  { number: 69, name: "Al-Haqqah", arabicName: "الحاقة", mood: "default" },
  { number: 70, name: "Al-Ma'arij", arabicName: "المعارج", mood: "default" },
  { number: 71, name: "Nuh", arabicName: "نوح", mood: "water" },
  { number: 72, name: "Al-Jinn", arabicName: "الجن", mood: "default" },
  { number: 73, name: "Al-Muzzammil", arabicName: "المزمل", mood: "default" },
  { number: 74, name: "Al-Muddaththir", arabicName: "المدثر", mood: "default" },
  { number: 75, name: "Al-Qiyamah", arabicName: "القيامة", mood: "default" },
  { number: 76, name: "Al-Insan", arabicName: "الانسان", mood: "water" },
  { number: 77, name: "Al-Mursalat", arabicName: "المرسلات", mood: "water" },
  { number: 78, name: "An-Naba", arabicName: "النبأ", mood: "water" },
  { number: 79, name: "An-Nazi'at", arabicName: "النازعات", mood: "default" },
  { number: 80, name: "Abasa", arabicName: "عبس", mood: "default" },
  { number: 81, name: "At-Takwir", arabicName: "التكوير", mood: "default" },
  { number: 82, name: "Al-Infitar", arabicName: "الإنفطار", mood: "default" },
  { number: 83, name: "Al-Mutaffifin", arabicName: "المطففين", mood: "default" },
  { number: 84, name: "Al-Inshiqaq", arabicName: "الإنشقاق", mood: "default" },
  { number: 85, name: "Al-Buruj", arabicName: "البروج", mood: "water" },
  { number: 86, name: "At-Tariq", arabicName: "الطارق", mood: "water" },
  { number: 87, name: "Al-A'la", arabicName: "الأعلى", mood: "dawn" },
  { number: 88, name: "Al-Ghashiyah", arabicName: "الغاشية", mood: "default" },
  { number: 89, name: "Al-Fajr", arabicName: "الفجر", mood: "dawn" },
  { number: 90, name: "Al-Balad", arabicName: "البلد", mood: "default" },
  { number: 91, name: "Ash-Shams", arabicName: "الشمس", mood: "dawn" },
  { number: 92, name: "Al-Layl", arabicName: "الليل", mood: "default" },
  { number: 93, name: "Ad-Duha", arabicName: "الضحى", mood: "dawn" },
  { number: 94, name: "Ash-Sharh", arabicName: "الشرح", mood: "dawn" },
  { number: 95, name: "At-Tin", arabicName: "التين", mood: "default" },
  { number: 96, name: "Al-Alaq", arabicName: "العلق", mood: "default" },
  { number: 97, name: "Al-Qadr", arabicName: "القدر", mood: "dawn" },
  { number: 98, name: "Al-Bayyinah", arabicName: "البينة", mood: "default" },
  { number: 99, name: "Az-Zalzalah", arabicName: "الزلزلة", mood: "default" },
  { number: 100, name: "Al-Adiyat", arabicName: "العاديات", mood: "dunes" },
  { number: 101, name: "Al-Qari'ah", arabicName: "القارعة", mood: "default" },
  { number: 102, name: "At-Takathur", arabicName: "التكاثر", mood: "default" },
  { number: 103, name: "Al-Asr", arabicName: "العصر", mood: "default" },
  { number: 104, name: "Al-Humazah", arabicName: "الهمزة", mood: "default" },
  { number: 105, name: "Al-Fil", arabicName: "الفيل", mood: "dunes" },
  { number: 106, name: "Quraysh", arabicName: "قريش", mood: "dunes" },
  { number: 107, name: "Al-Ma'un", arabicName: "الماعون", mood: "default" },
  { number: 108, name: "Al-Kawthar", arabicName: "الكوثر", mood: "dawn" },
  { number: 109, name: "Al-Kafirun", arabicName: "الكافرون", mood: "default" },
  { number: 110, name: "An-Nasr", arabicName: "النصر", mood: "dawn" },
  { number: 111, name: "Al-Masad", arabicName: "المسد", mood: "default" },
  { number: 112, name: "Al-Ikhlas", arabicName: "الإخلاص", mood: "dawn" },
  { number: 113, name: "Al-Falaq", arabicName: "الفلق", mood: "dawn" },
  { number: 114, name: "An-Nas", arabicName: "الناس", mood: "default" },
];

export const MOOD_LABELS: Record<MoodKey, string> = {
  dawn: "Dawn",
  dunes: "Dunes",
  water: "Water",
  default: "Night",
};

export const MOOD_ORDER: MoodKey[] = ["dawn", "dunes", "water", "default"];
