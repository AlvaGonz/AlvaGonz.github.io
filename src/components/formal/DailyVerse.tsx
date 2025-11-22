import { useFetch } from '../../hooks/useFetch';
import { getDailyVerseUrl, getBibleHeaders, BibleVerse } from '../../services/bible';

export function DailyVerse() {
    const { data, loading, error } = useFetch<BibleVerse>(
        getDailyVerseUrl(),
        { headers: getBibleHeaders() }
    );

    if (loading || error || !data) return null;

    const verse = data;
    // Clean up the content (API returns text with newlines)
    const cleanContent = verse.text.trim();

    return (
        <div className="mt-12 pt-8 border-t border-gray-200/10 text-center">
            <blockquote className="max-w-2xl mx-auto italic text-gray-400">
                "{cleanContent}"
            </blockquote>
            <cite className="block mt-2 text-sm font-semibold text-primary-500 not-italic">
                — {verse.reference}
            </cite>
        </div>
    );
}
