const BASE_URL = 'https://api.scripture.api.bible/v1';
const BIBLE_ID = 'de4e12af7f28f599-01'; // KJV (King James Version) as default, or use '61fd76eafa1577c2-02' for ASV

export interface BibleVerse {
    id: string;
    orgId: string;
    bibleId: string;
    bookId: string;
    chapterId: string;
    reference: string;
    content: string;
    copyright: string;
}

// Popular verses for rotation
const VERSES = [
    'JER.29.11', // For I know the thoughts that I think toward you...
    'ROM.8.28',  // And we know that all things work together for good...
    'PHP.4.13',  // I can do all things through Christ...
    'PRO.3.5',   // Trust in the Lord with all thine heart...
    'ISA.40.31', // But they that wait upon the Lord...
    'JHN.3.16',  // For God so loved the world...
const BASE_URL = 'https://api.scripture.api.bible/v1';
const BIBLE_ID = 'de4e12af7f28f599-01'; // KJV (King James Version) as default, or use '61fd76eafa1577c2-02' for ASV

export interface BibleVerse {
    id: string;
    orgId: string;
    bibleId: string;
    bookId: string;
    chapterId: string;
    reference: string;
    content: string;
    copyright: string;
}

// Popular verses for rotation
const VERSES = [
    'JER.29.11', // For I know the thoughts that I think toward you...
    'ROM.8.28',  // And we know that all things work together for good...
    'PHP.4.13',  // I can do all things through Christ...
    'PRO.3.5',   // Trust in the Lord with all thine heart...
    'ISA.40.31', // But they that wait upon the Lord...
    'JHN.3.16',  // For God so loved the world...
    'PSM.23.1',  // The Lord is my shepherd...
    'JOS.1.9',   // Have I not commanded thee? Be strong...
];

export const getDailyVerseUrl = () => {
    // Pick a verse based on the day of the year to be consistent for 24h
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const verseId = VERSES[dayOfYear % VERSES.length];
    return `${BASE_URL}/bibles/${BIBLE_ID}/verses/${verseId}?content-type=json`;
};

export const getBibleHeaders = () => ({
    'api-key': import.meta.env.VITE_BIBLE_API_KEY || '9b6e4bbd7a982cb5153055a7b46d2058',
});
