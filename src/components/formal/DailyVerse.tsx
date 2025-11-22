import { useFetch } from '../../hooks/useFetch';
import { getDailyVerseUrl, getBibleHeaders, BibleVerse } from '../../services/bible';

export function DailyVerse() {
    const { data, loading, error } = useFetch<{ data: BibleVerse }>(
        getDailyVerseUrl(),
        { headers: getBibleHeaders() }
    );

    if (loading || error || !data?.data) return null;

    const verse = data.data;
    // Clean up the content (API returns HTML sometimes)
    const cleanContent = verse.content.replace(/<[^>]*>/g, '').trim();

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
