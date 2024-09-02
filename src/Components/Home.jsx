import React from 'react'
import "../App.css"
import Search from './Search'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { fetchTrendingMovies ,fetchPopularMovies , fetchTopRatedMovies } from '../redux/slice'
import MoviesDisplay from './MoviesDisplay'

function Home() {

    const dispatch = useDispatch();

    const {trendingMoviesByDay , trendingMoviesByWeek, popularTvs , popularMovies , topRatedMovies , topRatedTvs} =  useSelector( (state)=> {
        return state.movieReducer;
    })

    // console.log(initState);
    // console.log(trendingMoviesByDay);
    // console.log(trendingMoviesByWeek);
    // console.log(popularTvs);
    // console.log(popularMovies);
    // console.log(topRatedMovies , topRatedTvs);
    

    useEffect(()=>{
       dispatch(fetchTrendingMovies());
    },[dispatch]);

    useEffect(()=>{
      dispatch(fetchPopularMovies());
    },[dispatch]);

    useEffect(()=>{
      dispatch(fetchTopRatedMovies())
    }, [dispatch]);


  return (
    <>
      <Search/>

       {/* trending movies  */}
       <MoviesDisplay
        heading="Trending"
        choice1="Day"
        choice2="Week"
        option1={trendingMoviesByDay}
        option2={trendingMoviesByWeek}/>

       {/* popular movies  */}
       <MoviesDisplay
        heading="What's Popular"
        choice1="Movies"
        choice2="TV's"
        option1={popularTvs}
        option2={popularMovies}
        />

       {/* top rated movies  */}
       <MoviesDisplay
        heading="Top Rated"
        choice1="Movies"
        choice2="TV's"
        option1={topRatedMovies}
        option2={topRatedTvs}
        />

    </>
        
  )
}

export default Home;