import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Movie, Comment } from "../../src/models/Models";
import {ReactQueryCacheProvider, QueryCache, useQuery} from 'react-query';
import OneComment from '../../src/components/OneComment';

interface Props {
    query: any,
};



const MoviePage = ({query}: Props) => {

    const queryCache = new QueryCache();

    const toJSON = (_: Response) => _.json();

    const movieFetcher = () => fetch(`http://localhost:4000/movies?id=${query.movie_id}`).then(toJSON);

    const commentsFetcher = () => fetch(`http://localhost:4000/comments?movieId=${query.movie_id}`).then(toJSON);

    const { data: movieArr, isLoading: isLoadingMovie, error: errorMovie } = useQuery('movie', movieFetcher);

    const { data: commentsArr, isLoading: isLoadingComments, error: errorComments } = useQuery('comments', commentsFetcher);

    console.log(commentsArr);

    let movie;

    if (movieArr) {
        movie = movieArr[0];
    }

    //console.log(movie);

    return (
        <ReactQueryCacheProvider queryCache={queryCache}>
            <p>Movie title: {movie?.title}</p>
            <p>Movie rank: {movie?.rank}</p>
            
                <ul>
                Comments:
                    {commentsArr?.map((comment: Comment) => (
                        <OneComment 
                            key={comment.id}
                            comment={comment}
                        />
                    )) 
                    }
                </ul>
            
        </ReactQueryCacheProvider>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, query }: GetServerSidePropsContext) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=600, stale-while-revalidate=600'
    );

    return {
        props: {
            query,
        }
    };
};

export default MoviePage;