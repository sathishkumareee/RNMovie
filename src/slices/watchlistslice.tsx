import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Movie {
  id: string;
  Title: string;
  Year: string;  
  Runtime: string;
  Poster: string;
}

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: [] as Movie[],
  reducers: {
    addMovieToWatchlist(state, action: PayloadAction<Movie>) {
      const movieExists = state.find(movie => movie.id === action.payload.id);
      if (!movieExists) {
        state.push(action.payload);
      }
    },
  },
});

export const { addMovieToWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
