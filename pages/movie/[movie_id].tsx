import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { Movie, Comment } from "../../src/models/Models";
import {ReactQueryCacheProvider, QueryCache, useQuery} from 'react-query';
import OneComment from '../../src/components/OneComment';
import { useEffect, useState } from 'react';
import AddComment from '../../src/components/AddComment';
import { v4 as uuidv4 } from 'uuid';

interface Props {
    query: any,
};

const MoviePage = ({query}: Props) => {

    const [movie, setMovie] = useState<Movie>();
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetchMovie();
    }, []);

    useEffect(() => {
        fetchComments();
    }, [movie]);

    const fetchMovie = async() => {
        await fetch(`http://localhost:4000/movies?id=${query.movie_id}`)
        .then(res => res.json())
        .then(data => setMovie(data[0]))
        .catch((err) => {
            console.log(err);
        });
    }

    const fetchComments = async() => {
        fetch(`http://localhost:4000/comments?movieId=${query.movie_id}`)
        .then(res => res.json())
        .then(data => setComments(data))
        .catch((err) => {
            console.log(err);
        });
    }

    const onAdd = async (
        id: number, 
        body: string, 
        userId: string
        ) => {
        await fetch(`http://localhost:4000/comments`, {
          method: "POST",
          body: JSON.stringify({
            id: id,
            body: body,
            movieId: movie?.id,
            userId: userId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((res) => {
            if (res.status !== 201) {
              return;
            } else {
              return res.json();
            }
          })
          .then((data) => {
            setComments((comments) => [...comments, data]);
          })
          .catch((err) => {
            console.log(err);
          });
      };

    return (
        <>
            <p>Movie title: {movie?.title}</p>
            <p>Movie rank: {movie?.rank}</p>
            <AddComment 
                onAdd={onAdd}
            />
            <ul>
            Comments:
                {comments?.map((comment: Comment) => (
                    <OneComment 
                        key={uuidv4()}
                        comment={comment}
                        setComments={setComments}
                        comments={comments}
                    />
                )) 
                }
            </ul>
        </>
    );
};

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






/*
    const queryCache = new QueryCache();

    const toJSON = (_: Response) => _.json();

    const movieFetcher = () => fetch(`http://localhost:4000/movies?id=${query.movie_id}`).then(toJSON);

    const commentsFetcher = () => fetch(`http://localhost:4000/comments?movieId=${query.movie_id}`).then(toJSON);

    const { data: movieArr, isLoading: isLoadingMovie, error: errorMovie } = useQuery('movie', movieFetcher);

    const { data: commentsArr, isLoading: isLoadingComments, error: errorComments } = useQuery('comments', commentsFetcher);
    */
    /*
    console.log(commentsArr);

    let movie;

    if (movieArr) {
        movie = movieArr[0];
    }
    */
    //console.log(movie);