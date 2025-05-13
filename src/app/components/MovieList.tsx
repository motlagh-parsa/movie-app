import MovieCard from './MovieCard';

type Props = {
    movies: movie[];
    selectedGenreIds?: number[];
};

export default function MovieList({movies, selectedGenreIds = []}: Props) {
    const filtered = selectedGenreIds.length > 0
        ? movies.filter((movie) =>
            selectedGenreIds.some(id => movie.genre_ids?.includes(id))
        )
        : movies;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
}