import {NextResponse} from "next/server";

export async function GET(req: Request) {
    try {
        const {searchParams} = new URL(req.url);
        const query = searchParams.get("query");

        if (!query || !query.trim()) {
            return NextResponse.json({results: []}, {status: 200});
        }

        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );

        if (!res.ok) {
            console.error(`TMDB API error: ${res.status} ${res.statusText}`);
            return NextResponse.json(
                {error: "Failed to fetch movies from TMDB"},
                {status: res.status}
            );
        }

        const data = await res.json();
        return NextResponse.json({results: data.results || []}, {status: 200});
    } catch (error) {
        console.error("Unexpected error in /api/search:", error);
        return NextResponse.json(
            {error: "An unexpected error occurred"},
            {status: 500}
        );
    }
}
