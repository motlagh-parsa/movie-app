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
            <div className='grid grid-cols-12 mx-auto flex'>
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-4 py-2 col-start-4 col-end-10 border border-gray-300 rounded-xl shadow-sm"
                />
                <div className="w-50 col-start-11">
                    <MultiSelect
                        options={genres}
                        selectedValues={selectedGenreIds}
                        onChangeAction={setSelectedGenreIds}
                        placeholder="Filter by genre"
                    />
                </div>
            </div>
            <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
                <div className="gap-6">
                    <div className="md:col-span-3">
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
            </div>
        </div>
    );
}