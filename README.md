# Movie App

Browse popular movies, search by title, filter by genre and open a detail page for any film — built with the Next.js App Router and the TMDB API.

**Live:** [movie-app-mu-lyart.vercel.app](https://movie-app-mu-lyart.vercel.app)

## Features

- **Popular movies** on the home page.
- **Search** by title.
- **Genre filter** with a multi-select.
- **Movie detail page** at `/movie/[id]`.
- **The API key stays on the server.** The browser calls the app's own route handlers (`/api/popular`, `/api/search`, `/api/genres`), which call TMDB with the key from the server environment.

## Stack

Next.js 15 (App Router, route handlers) · React 19 · TypeScript · Tailwind CSS

## Project structure

```
src/app/
├─ api/
│  ├─ popular/route.ts   popular movies
│  ├─ search/route.ts    search by title
│  └─ genres/route.ts    the genre list
├─ components/           MovieSearch, MovieList, MovieCard, MultiSelect
├─ lib/tmdb.ts           TMDB client
├─ movie/[id]/page.tsx   movie detail page
├─ type/movie.ts         TMDB types
└─ page.tsx              home page
```

## Run it locally

Requires Node.js 18 or newer and a free [TMDB API key](https://developer.themoviedb.org/docs/getting-started).

```bash
git clone https://github.com/motlagh-parsa/movie-app.git
cd movie-app
npm install
echo "TMDB_API_KEY=your-key-here" > .env.local
npm run dev        # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

This product uses the TMDB API but is not endorsed or certified by TMDB.
