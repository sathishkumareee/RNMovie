import {configureStore} from '@reduxjs/toolkit'
import { moviesApi } from '../services/productsApi'
import watchlistslice from '../slices/watchlistslice'

export const store=configureStore({
    reducer:{
        [moviesApi.reducerPath]:moviesApi.reducer,
        watchlist:watchlistslice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(moviesApi.middleware)
})


export type IRootState = ReturnType<typeof store.getState>