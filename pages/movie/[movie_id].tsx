import {NextRouter, useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface Props {
    query: any,

};

const MoviePage = ({query}: Props) => {
    
    console.log(query);
    //router
    const router: NextRouter = useRouter();
    
    
    return (
        <p>Movie id: {query.movie_id}</p>
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