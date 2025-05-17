import Image from 'next/image';
import {fetchMovieById} from "@/app/lib/tmdb";

export default async function MovieDetailPage({ params }: any) {
    const movie = await fetchMovieById(params.id);

    return (
        <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
                {movie.poster_path && (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={350}
                        height={525}
                        className="rounded-xl shadow-lg"
                        priority
                    />
                )}
                <div className="flex-1 space-y-4">
                    <h1 className="text-4xl font-bold">{movie.title}</h1>
                    <p className="text-gray-300 text-base leading-relaxed">{movie.overview}</p>

                    <div className="text-sm text-gray-400 pt-4">
                        <p><span className="font-semibold text-white">Release Date:</span> {movie.release_date}</p>
                        <p><span className="font-semibold text-white">Rating:</span> {movie.vote_average} / 10</p>
                        {movie.runtime &&
                            <p><span className="font-semibold text-white">Runtime:</span> {movie.runtime} min</p>}
                        <p><span className="font-semibold text-white">Genre(s): </span>
                            {movie.genres.map((genre: any, index: number) => {
                                return (
                                    <span key={genre.id}>
                                      {genre.name}{index < movie.genres.length - 1 ? ', ' : ''}
                                    </span>
                                );
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
