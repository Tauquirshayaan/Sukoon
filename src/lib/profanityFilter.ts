import { Filter } from 'bad-words';

// Initialize the filter with standard bad words
const filter = new Filter();

// Custom list of banned words (Islamophobic, hate-speech, and severe abuse)
// Note: This list is kept concise for demonstration, but it effectively blocks tropes.
const customBannedWords = [
  'terrorist',
  'terrorists',
  'bomber',
  'bomb',
  'jihadi',
  'jihadist',
  'fake religion',
  'muzzie',
  'mohammedan',
  'extremist',
  'extremists',
  'raghead',
  'towelhead',
  'sand nigger', // included as per user request to ban all abusive/hate language
  'osama',
  'isis',
  'taliban',
  'al qaeda',
  'hate muslims',
  'anti-islam',
  'islam is bad',
  'kuffar', // banning aggressive sectarian terms as well
  'kaafir',
];

// Add the custom words to the filter
filter.addWords(...customBannedWords);

/**
 * Checks if a string contains any banned words.
 * Returns true if the message is clean, false if it contains profanity.
 */
export function isMessageClean(message: string): boolean {
  // isProfane returns true if it contains bad words
  return !filter.isProfane(message);
}

/**
 * Cleans the message (replaces bad words with ***)
 * Useful if we want to mask instead of reject.
 */
export function cleanMessage(message: string): string {
  return filter.clean(message);
}
