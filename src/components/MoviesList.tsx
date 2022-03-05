
import { Movie, Comment } from "../models/Models";
import MovieListItem from "./MovieListItem";

interface Props {
    movies: Movie[],
    comments: Comment[],
}

const MoviesList = ({ movies, comments }: Props) => {
    
    let commentsMoviesIds: string[] = [];
    
    comments?.forEach((comment: Comment) => {
        commentsMoviesIds.push(comment.movieId)
    });

    return (
        <ul>
            {movies?.map((movie) => (
                <MovieListItem
                    key={movie.id}             
                    movie={movie}
                    commentsMoviesIds={commentsMoviesIds}
                />             
            ))}
        </ul>
    );
};

export default MoviesList;