import React from 'react';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const img_base_url = "https://image.tmdb.org/t/p/original/";

function formateDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options)
}

function Movie({ movie }) {

    console.log(movie);
    const percentage = 66;

    return (
        <Link to={`/singleItem/${movie.id}`}>
            <div className='movie'>
                <div className="movie-img">
                    <img src={img_base_url + movie.poster_path} alt={movie.title || movie.original} />
                </div>
                <div className='ratings'>
                    <CircularProgressbar
                        value={movie.vote_average ? movie.vote_average * 10 : 5 * 10}
                        text={
                            movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : (5.5).toFixed(1)
                        }
                        strokeWidth={10}
                        styles={buildStyles({
                            pathColor: `${movie.vote_average > 6.9
                                    ? "rgb(0, 128, 0)"
                                    : "rgb(255, 165, 0)"
                                }`,
                            textColor: "rgb(0, 128, 0)",
                            textSize: "35px",
                        })}
                    />
                </div>
                <div className="info">
                    <h3>{movie.title || movie.original || movie.name || movie.original_name}</h3>
                    <p>
                        {movie.release_date ? formateDate(movie.release_date) : formateDate(movie.first_air_date)}
                    </p>
                </div>
            </div>
        </Link>

    )
}

export default Movie;