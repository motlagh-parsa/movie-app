type movie = {
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    genre_ids?: Array<number>;
};