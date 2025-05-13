import MovieSearch from "@/app/components/MovieSearch";

export default function HomePage() {
    return (
        <main className="p-4">
            <h1 className="text-2xl font-bold mb-4">Movie Search</h1>
            <MovieSearch/>
        </main>
    );
}
