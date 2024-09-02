import React from 'react'
import { useSelector } from 'react-redux';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';


const img_base_url = "https://image.tmdb.org/t/p/original/";

function formateDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options)
}




function Tvshows() {
  const { popularTvs } = useSelector((state) => state.movieReducer);

  // Log to verify data availability
  console.log('Popular TV Shows:', popularTvs);

  // Conditional rendering based on data availability
  if (!popularTvs || popularTvs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className='tv-container'>
      <h1>Explore Tv Shows</h1>
      <div className="tvshow-container">
      {popularTvs.map((tv) => (
        <div key={tv.id} className="tvshow-card">
          <Link to={`/singleItem/${tv.id}`}>
          <div className="tvshow-poster">
            <img
              src={img_base_url + tv.poster_path}
              alt={tv.title || tv.name || tv.original_name}
            />
          </div>
          </Link>
          
          <div className="tvshow-rating">
            <CircularProgressbar
              value={tv.vote_average ? tv.vote_average * 10 : 50}
              text={tv.vote_average ? tv.vote_average.toFixed(1) : '5.0'}
              strokeWidth={10}
              styles={buildStyles({
                pathColor: `${tv.vote_average > 6.9 ? "rgb(0, 128, 0)" : "rgb(255, 165, 0)"}`,
                textColor: "rgb(0, 128, 0)",
                textSize: "35px",
              })}
            />
          </div>
          <div className="tvshow-info">
            <h3>{tv.title || tv.name || tv.original_name}</h3>
            <p>{tv.first_air_date ? formateDate(tv.first_air_date) : tv.release_date}</p>
          </div>
        </div>
      ))}
    </div>

    </div>
    
  );
}


export default Tvshows