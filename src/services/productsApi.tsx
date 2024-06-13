import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { ProductsInterface } from './models/productsInterface'

export const moviesApi=createApi({
    reducerPath:"moviesApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"http://192.168.0.100:8000/"
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
        })
    })
})

export const{useGetMoviesQuery,useGetMoviesByIdQuery}=moviesApi

//default export
// export const {endpoints,reducer,reducerPath,middleware}=productsApi