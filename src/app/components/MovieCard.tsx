import Link from 'next/link';
import Image from 'next/image';

export default function MovieCard({movie}: { movie: movie }) {
    return (
        <Link href={`/movie/${movie.id}`}>
            <div className="transform transition duration-300 ease-in-out hover:scale-105 hover:z-10 cursor-pointer">
                <div className="overflow-hidden rounded-lg shadow-md">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        width={300}
                        height={450}
                        className="rounded-lg object-cover"
                    />
                </div>
                <h3 className="mt-2 text-white text-sm md:text-base font-semibold text-center">
                    {movie.title}
                </h3>
            </div>
        </Link>
    );
}
