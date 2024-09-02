import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

// redux-thunk : helps us create async action creators. Helps us to write async logic with redux

// async operations do not go in slice's reducer


// ************************ Fetching trending movies data ********************************************************

export const fetchTrendingMovies = createAsyncThunk("fetchTrending", 
    async () => {
    try{
        // const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);
        // // console.log(response.data.results);
        // return response.data.results;

        const [day , week ] = await Promise.all([
            axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),

            axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),
        ]);

        return {
            trendingMoviesByDayData : day.data.results,
            trendingMoviesByWeekData : week.data.results,
        }

    }
    catch(err){
       return err;
    }
   
})

// export const fetchTrendingMoviesByWeek = createAsyncThunk("fetchTrendingWeek", 
//     async () => {
//     const response = await axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);
//     // console.log(response.data.results);

//     return response.data.results;
// })

// ************************ Fetching popular movies data ********************************************************

export const fetchPopularMovies = createAsyncThunk("fetchTopRated", 
    async () => {
    try{
        // const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);
        // // console.log(response.data.results);
        // return response.data.results;

        const [movies , tv ] = await Promise.all([
            axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),

            axios.get("https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),
        ]);

        return {
            popularMoviesTV : movies.data.results,
            popularMoviesMovie : tv.data.results,
        }

    }
    catch(err){
       return err;
    }
   
});


export const fetchTopRatedMovies = createAsyncThunk("fetchPopular", 
    async () => {
    try{
        // const response = await axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);
        // // console.log(response.data.results);
        // return response.data.results;

        const [movies , tv ] = await Promise.all([
            axios.get("https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),

            axios.get("https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),
        ]);

        return {
            topRatedMoviesData : movies.data.results,
            topRatedTvsData : tv.data.results,
        }

    }
    catch(err){
       return err;
    }
   
});

// *********************** Search Movies ********************************************************

export const searchMovies = createAsyncThunk("fetchSearchMovies", async(searchTerm)=>{
   try{
     const result =  await axios.get('https://api.themoviedb.org/3/search/movie?query='+searchTerm+'&include_adult=false&language=en-US&api_key=' + import.meta.env.VITE_TMDB_API_KEY )
    //  console.log(result.data.results);
    return result.data.results;
     
   }
   catch(err){
      return err;
   }
})




const slice = createSlice({
    name: "moviesSlice",
    initialState: {
        trendingMoviesByDay:[],
        trendingMoviesByWeek:[],
        popularMovies:[],
        popularTvs:[],
        topRatedMovies:[],
        topRatedTvs:[],
        searchMoviesData:[],
        status :"idle",
        error : null,
    },
    reducers: {

        
      
    },

    extraReducers : (builder)=>{

        // trending movies
        builder.addCase(
            fetchTrendingMovies.pending , (state , action)=>{
                state.status = "Loading..."
            }
        )
        .addCase(
            fetchTrendingMovies.fulfilled, (state , action)=>{
                state.trendingMoviesByDay = action.payload.trendingMoviesByDayData;
                state.trendingMoviesByWeek = action.payload.trendingMoviesByWeekData;
            }
        )
        .addCase(
            fetchTrendingMovies.rejected, (state , action)=>{
                state.status = "there is an erro";
                state.error = action.payload;
            }
        )

        // popular movies
        .addCase(
            fetchPopularMovies.pending , (state , action)=>{
                state.status = "Loading..."
            }
        )
        .addCase(
            fetchPopularMovies.fulfilled , (state , action)=>{
                state.popularMovies = action.payload.popularMoviesMovie;
                state.popularTvs = action.payload.popularMoviesTV;
            }
        )
        .addCase(
            fetchPopularMovies.rejected , (state , action)=>{
                state.status = "there is an erro";
                state.error = action.payload;
            }
        )

        // tioRated movies data
        .addCase(
            fetchTopRatedMovies.pending , (state , action)=>{
                state.status = "Loading..."
            }
        )
        .addCase(
            fetchTopRatedMovies.fulfilled , (state , action)=>{
               state.topRatedMovies = action.payload.topRatedMoviesData;
               state.topRatedTvs = action.payload.topRatedTvsData;

            }
        )
        .addCase(
            fetchTopRatedMovies.rejected , (state , action)=>{
                state.status = "there is an erro";
                state.error = action.payload;
            }
        )

        // Search Movies
        .addCase(
            searchMovies.pending , (state , action)=>{
                state.status = "Loading..."
            }
        )
        .addCase(
            searchMovies.fulfilled , (state , action)=>{
                state.searchMoviesData = action.payload;
            }
        )
        .addCase(
            searchMovies.rejected , (state , action)=>{
                state.status = "there is an erro";
                state.error = action.payload;
            }
        )
      
    }

    
})

export const sliceReducer = slice.reducer;