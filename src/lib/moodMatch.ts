import { SURAH_MOODS, MoodKey, SurahMoodEntry } from "@/data/surahMoods";

// Arabic definite-article / transliteration prefixes (already hyphen-free —
// the token this is applied to has had punctuation stripped already).
const PREFIXES = ["ash", "adh", "adz", "al", "an", "as", "at", "az"].sort(
  (a, b) => b.length - a.length // longest first, so "Ash-Shura" doesn't get
  // incorrectly stripped down to "hshura" by matching "as" before "ash".
);

/** Lowercases and strips one leading definite-article prefix from a single
 *  word/token, so "Al", "Baqarah" (already split apart by tokenize()) and a
 *  one-word "AlBaqarah" all normalize to "baqarah". */
function stripPrefix(word: string): string {
  for (const p of PREFIXES) {
    if (word.startsWith(p) && word.length > p.length + 2) {
      return word.slice(p.length);
    }
  }
  return word;
}

/**
 * Splits a title into individual lowercase word tokens (on anything that
 * isn't a letter/digit) and strips a leading definite-article prefix off
 * each. This — rather than substring search across the whole concatenated
 * title — is what avoids false positives like "tin" (At-Tin) matching
 * inside "reciting", or "يس" (Ya-Sin) matching inside "إدريس" (the
 * reciter's own name, Idrees): those are substrings of a word, never a
 * whole word/token on their own.
 */
function tokenize(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .split(/[^a-z0-9؀-ۿ]+/)
    .filter(Boolean)
    .map(stripPrefix);
}

// Strip Arabic diacritics (tashkeel) so a title with or without vowel marks
// still tokenizes/matches the same way, e.g. "الرَّحْمَٰن" vs "الرحمن".
function stripArabicDiacritics(s: string): string {
  return s.replace(/[ً-ْٰۖ-ۭ]/g, "");
}

const NORMALIZED_SURAHS = SURAH_MOODS.map((s) => ({
  entry: s,
  nameTokens: tokenize(s.name),
  arabicTokens: tokenize(stripArabicDiacritics(s.arabicName)),
}));

/**
 * Given a raw video/track title (from the YouTube player, or any freeform
 * string), try to identify which surah it is and return that surah's mood.
 * Falls back to "default" — never throws, never leaves the UI without a
 * mood. This is what lets the background respond to *every* track in a
 * 93-video playlist, not just the ones hand-entered into TRACK_MAP.
 */
export function resolveMoodFromTitle(title: string | null | undefined): {
  mood: MoodKey;
  surah: SurahMoodEntry | null;
} {
  if (!title) return { mood: "default", surah: null };

  const titleTokens = tokenize(stripArabicDiacritics(title));
  if (titleTokens.length > 0) {
    // Whole-token match (Arabic or transliterated name), either as a single
    // token ("Baqarah", "الرحمن") or as a short consecutive run for two-word
    // names ("Aali Imran", "Ash Shuara" once split on the hyphen).
    const byToken = NORMALIZED_SURAHS.find((s) => {
      const candidates = [s.nameTokens, s.arabicTokens];
      return candidates.some((tokens) => {
        if (tokens.length === 0) return false;
        if (tokens.length === 1) return titleTokens.includes(tokens[0]);
        // Multi-token surah name: require the exact sequence to appear
        // consecutively somewhere in the title's tokens.
        for (let i = 0; i <= titleTokens.length - tokens.length; i++) {
          if (tokens.every((t, j) => titleTokens[i + j] === t)) return true;
        }
        return false;
      });
    });
    if (byToken) return { mood: byToken.entry.mood, surah: byToken.entry };
  }

  // Fall back to a surah number, but ONLY in an unambiguous position —
  // zero-padded ("002", "055", the common convention for numbered Quran
  // uploads) or directly labeled ("Surah 55", "سورة 55", "#55"). A bare
  // "\d{1,3}" anywhere in the title is deliberately NOT matched: titles
  // like "Al-Baqarah Part 1" or "... (2024)" would silently misfire onto
  // the wrong surah, and a wrong guess here is worse than none.
  const labeled = title.match(/(?:surah|sura|سورة)\s*#?\s*(\d{1,3})\b/i) || title.match(/#(\d{1,3})\b/);
  const zeroPadded = title.match(/\b0(\d{1,2})\b/);
  const num = labeled ? parseInt(labeled[1], 10) : zeroPadded ? parseInt(zeroPadded[1], 10) : null;
  if (num !== null) {
    const bySurahNumber = SURAH_MOODS.find((s) => s.number === num);
    if (bySurahNumber) return { mood: bySurahNumber.mood, surah: bySurahNumber };
  }

  return { mood: "default", surah: null };
}
