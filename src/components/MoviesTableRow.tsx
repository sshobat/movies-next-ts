import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Movie } from "../models/Models";
import Link from 'next/link';

interface Props {
    movie?: Movie,
    commentsMoviesIds?: string[],
}

const MoviesTableRow = ({ movie, commentsMoviesIds }: Props) => {
    
    const commNumber = commentsMoviesIds?.filter(item => (item === movie?.id)).length;
    
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <Link href={`/movie/${movie?.id}`}>
                <a>
                    <TableCell component="th" scope="row">
                        {movie?.title}
                    </TableCell>
                </a>
            </Link>
            <TableCell align="right">
                {commNumber}
            </TableCell>

        </TableRow>
    );
};

export default MoviesTableRow;