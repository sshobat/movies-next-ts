
import { Movie, Comment } from "../models/Models";
import MovieListItem from "./MovieListItem";

interface Props {
    movies: Movie[],
    comments: Comment[],
}

const MoviesList = ({ movies, comments }: Props) => {
    
    let moviesIds: string[] = [];
    let commentsMoviesIds: string[] = [];
    
    movies?.forEach((movie: Movie) => {
        moviesIds.push(movie.id);
    });

    comments?.forEach((comment: Comment) => {
        commentsMoviesIds.push(comment.movieId)
    });

    //console.log(commentsMoviesIds);
    //console.log(moviesIds);


    
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