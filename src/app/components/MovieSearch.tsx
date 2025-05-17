'use client';

import {useState, useEffect} from 'react';
import MovieList from './MovieList';
import MultiSelect from './MultiSelect';

export default function MovieSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState<{ id: number, name: string }[]>([]);
    const [selectedGenreIds, setSelectedGenreIds] = useState<number[]>([]);

    useEffect(() => {
        fetch('/api/genres')
            .then((res) => res.json())
            .then((data) => setGenres(data.genres || []))
            .catch(() => setGenres([]));
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const url = query.trim()
                ? `/api/search?query=${encodeURIComponent(query)}`
                : `/api/popular`;

            setLoading(true);

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setResults(data.results || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    return (
        <div className="mx-auto px-4 py-6 space-y-6">
            <div
                className="flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0 w-full max-w-5xl mx-auto">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full md:w-2/3 px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
                />
                <div className="w-full md:w-1/3">
                    <MultiSelect
                        options={genres}
                        selectedValues={selectedGenreIds}
                        onChangeAction={setSelectedGenreIds}
                        placeholder="Filter by genre"
                    />
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <MovieList
                        movies={results}
                        selectedGenreIds={selectedGenreIds}
                    />
                )}
            </div>
        </div>
    );
}