import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MoviesList from '../src/components/MoviesList';
import styles from '../styles/Home.module.css'

import {ReactQueryCacheProvider, QueryCache, useQuery} from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

const queryCache = new QueryCache();

const toJSON = (_:Response) => _.json();
const moviesFetcher = () => fetch('http://localhost:4000/movies').then(toJSON);
const commentsFetcher = () => fetch('http://localhost:4000/comments').then(toJSON);


const Home: NextPage = () => {

const { data: movies, isLoading: isLoadingMovies, error: errorMovies } = useQuery('movies', moviesFetcher);

const { data: comments, isLoading: isLoadingComments, error: errorComments } = useQuery('comments', commentsFetcher)

//if (isLoading) return 'Loading';
//if (error) return error.message; 

  return (
    <>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <div>
        <MoviesList movies={movies} comments={comments}/>
      </div>
    </ReactQueryCacheProvider>
    <ReactQueryDevtools />
    </>
  );
};

export default Home;
