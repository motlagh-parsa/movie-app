import {NextResponse} from 'next/server';
import {fetchPopularMovies} from "@/app/lib/tmdb";

export async function GET() {
    try {
        const movies = await fetchPopularMovies();
        return NextResponse.json({results: movies});
    } catch (error) {
        console.error('Failed to fetch popular movies:', error);
        return NextResponse.json({error: 'Failed to fetch popular movies'}, {status: 500});
    }
}
