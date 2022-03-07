import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Movie, Comment } from "../models/Models";
import MoviesTableRow from './MoviesTableRow';

interface Props {
    movies: Movie[],
    comments: Comment[],
}

const MoviesTable = ({ movies, comments }: Props) => {
    
    let commentsMoviesIds: string[] = [];
    
    comments?.forEach((comment: Comment) => {
        commentsMoviesIds.push(comment.movieId)
    });

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Movie</TableCell>
                        <TableCell align="right">Comments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {movies?.map((movie) => (
                       <MoviesTableRow
                        key={movie.id}
                        movie={movie}
                        commentsMoviesIds={commentsMoviesIds} 
                       />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MoviesTable;