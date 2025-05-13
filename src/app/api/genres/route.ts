import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`);

        if (!res.ok) {
            return NextResponse.json({error: 'Failed to fetch genres from TMDB'}, {status: res.status});
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching genres:', error);
        return NextResponse.json({error: 'An unexpected error occurred'}, {status: 500});
    }
}
