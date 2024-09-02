import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const img_base_url = "https://image.tmdb.org/t/p/original/";

function SingleMovie() {
  const { id } = useParams();
  const [singleMovie, setSingleMovie] = useState({});

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  }

  useEffect(() => {
    const fetchSingleMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&include_video=true&language=en-US`
        );
        setSingleMovie(response.data);
        console.log(response.data);

        // Set background image of wrapper
        document.querySelector('.single-movie-wrapper').style.backgroundImage = `url(${img_base_url + response.data.backdrop_path || response.data.poster_path})`;

      } catch (err) {
        console.error("Failed to fetch movie details", err);
      }
    };

    fetchSingleMovie();
  }, [id]);

  return (
    <div className='single-movie-wrapper'>
      <div className='single-movie-container'>
        <div className='single-movie-left'>
          {singleMovie.poster_path && (
            <img src={img_base_url + singleMovie.poster_path} alt={singleMovie.title || singleMovie.original_title} />
          )}
        </div>
        <div className='single-movie-right'>
          <h1>{singleMovie.title || singleMovie.original_title}</h1>
          <p>{singleMovie.overview}</p>
          <div className='single-movie-details'>
            <p><strong style={{ color: "#fff" }}>Release Date:</strong> {singleMovie.release_date ? formatDate(singleMovie.release_date) : 'N/A'}</p>
            <div className='single-movie-ratings'>
              <CircularProgressbar
                value={singleMovie.vote_average ? singleMovie.vote_average * 10 : 5 * 10}
                text={
                  singleMovie.vote_average
                    ? singleMovie.vote_average.toFixed(1)
                    : (5.5).toFixed(1)
                }
                strokeWidth={10}
                styles={buildStyles({
                  pathColor: `${singleMovie.vote_average > 6.9
                    ? "rgb(0, 128, 0)"
                    : "rgb(255, 165, 0)"
                    }`,
                  textColor: "rgb(0, 128, 0)",
                  textSize: "35px",
                })}
              />
            </div>
          </div>
          <div className='single-movie-genres'>
            <p><strong style={{ color: "#fff" }}>Type:</strong></p>
            {singleMovie.genres && singleMovie.genres.length > 0 ? (
              <ul>
                {singleMovie.genres.map((item, idx) => (
                  <li key={idx}>{item.name}</li>
                ))}
              </ul>
            ) : (
              <p>N/A</p>
            )}
          </div>
          <div className='single-movie-languages'>
            <p><strong style={{ color: "#fff" }}>Available In:</strong></p>
            {singleMovie.spoken_languages && singleMovie.spoken_languages.length > 0 ? (
              <ul>
                {singleMovie.spoken_languages.map((language, index) => (
                  <li key={index}>{language.english_name}</li>
                ))}
              </ul>
            ) : (
              <p>N/A</p>
            )}
          </div>
        </div>
      </div>

    </div>

  );
}

export default SingleMovie;