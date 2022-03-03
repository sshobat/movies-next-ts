export interface Movie {
    title: string
    rank: string
    id: string
}

export interface Comment {
    id: number
    body: string
    movieId: string
    userId: string
}
