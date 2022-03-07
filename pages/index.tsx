import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {ReactQueryCacheProvider, QueryCache, useQuery} from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

import { useState } from 'react';
import MoviesTable from '../src/components/MoviesTable';

const queryCache = new QueryCache();

const Home: NextPage = () => {

  const [page, setPage] = useState(1);
  
  const toJSON = (_: Response) => _.json();

  const moviesFetcher = () => fetch(`http://localhost:4000/movies?_page=${page}`).then(toJSON);

  const commentsFetcher = () => fetch('http://localhost:4000/comments').then(toJSON);


  const { data: movies, isLoading: isLoadingMovies, error: errorMovies } = useQuery('movies', moviesFetcher);

  const { data: comments, isLoading: isLoadingComments, error: errorComments } = useQuery('comments', commentsFetcher)

  //if (isLoading) return 'Loading';
  //if (error) return error.message;

  return (
    <>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <MoviesTable 
          movies={movies} 
          comments={comments}
        />
      </ReactQueryCacheProvider>
      <ReactQueryDevtools />
    </>
  );
};

export default Home;