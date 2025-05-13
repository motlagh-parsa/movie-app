const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchPopularMovies() {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch popular movies");

    const data = await res.json();
    return data.results;
}

export async function searchMovies(query: string) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query
        )}&api_key=${process.env.TMDB_API_KEY}`
    );

    if (!res.ok) throw new Error("Failed to search movies");

    const data = await res.json();
    return data.results;
}

export async function fetchMovieById(id: string) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return res.json();
}

export async function fetchGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch genres");
    return res.json(); // returns { genres: [...] }
}

export async function fetchMoviesByGenre(genreId: number) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
    if (!res.ok) throw new Error("Failed to fetch movies by genre");
    const data = await res.json();
    return data.results;
}
