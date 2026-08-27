import { Filter } from 'bad-words';

// Initialize the filter with standard bad words
const filter = new Filter();

// Custom list of banned words and phrases (Islamophobic, hate-speech, and
// severe abuse). Single words are added to the `bad-words` filter below,
// which tokenizes input and matches whole words. Multi-word phrases can't
// go through that path — `bad-words` checks one token at a time, so a
// phrase like 'hate muslims' never equals either token 'hate' or 'muslims'
// and would silently pass through unfiltered. Those are matched separately
// as substrings against the full message in cleanMessage()/isMessageClean()
// below.
const singleWordBannedWords = [
  'terrorist',
  'terrorists',
  'bomber',
  'bomb',
  'jihadi',
  'jihadist',
  'muzzie',
  'mohammedan',
  'extremist',
  'extremists',
  'raghead',
  'towelhead',
  'osama',
  'isis',
  'taliban',
  'kuffar', // banning aggressive sectarian terms as well
  'kaafir',
];

const bannedPhrases = [
  'fake religion',
  'sand nigger', // included as per user request to ban all abusive/hate language
  'al qaeda',
  'hate muslims',
  'anti-islam',
  'islam is bad',
];

// Add the single-word entries to the filter.
filter.addWords(...singleWordBannedWords);

function maskPhrases(message: string): string {
  let result = message;
  for (const phrase of bannedPhrases) {
    const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(escaped, 'gi');
    result = result.replace(pattern, (match) => '*'.repeat(match.length));
  }
  return result;
}

function containsBannedPhrase(message: string): boolean {
  const lower = message.toLowerCase();
  return bannedPhrases.some((phrase) => lower.includes(phrase));
}

/**
 * Checks if a string contains any banned words.
 * Returns true if the message is clean, false if it contains profanity.
 */
export function isMessageClean(message: string): boolean {
  // isProfane returns true if it contains bad words
  return !filter.isProfane(message) && !containsBannedPhrase(message);
}

/**
 * Cleans the message (replaces bad words with ***)
 * Useful if we want to mask instead of reject.
 */
export function cleanMessage(message: string): string {
  return maskPhrases(filter.clean(message));
}
