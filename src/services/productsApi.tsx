import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { ProductsInterface } from './models/productsInterface'

export const moviesApi=createApi({
    reducerPath:"moviesApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://localhost:8000/"
    }),
    //query    - get endpoints
    //mutation - post endpoints
    endpoints:(builder)=>({
        getMovies:builder.query<ProductsInterface[],void>({
            query:()=> ({
                url:"movies",
                method:'GET'
            })
        }),
        getMoviesById:builder.query<ProductsInterface[],void>({
            query:(id)=> ({
                url:`movies/${id}`,
                method:'GET'
            })
        }),
        updateMovieRating: builder.mutation<void, { id: string; rating: string }>({
            query: ({ id, rating }) => ({
              url: `movies/${id}`,
              method: 'PATCH',
              body: { Rating: rating },
            }),
          }),
    })
})

export const{useGetMoviesQuery,useGetMoviesByIdQuery,useUpdateMovieRatingMutation}=moviesApi

//default export
// export const {endpoints,reducer,reducerPath,middleware}=productsApi