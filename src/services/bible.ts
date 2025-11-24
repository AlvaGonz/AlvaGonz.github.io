const BASE_URL = 'https://bible-api.com';

export interface BibleVerse {
  reference: string;
  text: string;
  translation_name: string;
  verses: Array<{
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }>;
}

// Popular verses for rotation
const VERSES = [
  'Jeremiah+29:11',
  'Romans+8:28',
  'Philippians+4:13',
  'Proverbs+3:5',
  'Isaiah+40:31',
  'John+3:16',
  'Psalm+23:1',
  'Joshua+1:9',
];

export const getDailyVerseUrl = () => {
  // Pick a verse based on the day of the year to be consistent for 24h
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const verseReference = VERSES[dayOfYear % VERSES.length];
  return `${BASE_URL}/${verseReference}?translation=kjv`;
};

export const getBibleHeaders = () => ({
  // No API key needed for bible-api.com
});
