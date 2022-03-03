import Link from "next/link";
import { Movie } from "../models/Models";

interface Props {
    movie?: Movie,
    commentsMoviesIds?: string[],
}

const MovieListItem = ({ movie, commentsMoviesIds }: Props) => {
    
    const commNumber = commentsMoviesIds?.filter(item => (item === movie?.id)).length;

    return (
        <Link href={`/movie/${movie?.id}`}>
            <a>
                <li >
                    <p>Movie Title: {movie?.title}</p>
                    <p>Comments: {commNumber}</p>
                </li>
            </a>
        </Link>
    );
}

export default MovieListItem;