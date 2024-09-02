import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { searchMovies } from '../redux/slice';

const img_base_url = "https://image.tmdb.org/t/p/original/";

function SearchResults() {
    const { searchTerm } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchMovies(searchTerm));
    }, [dispatch, searchTerm]);

    const { searchMoviesData } = useSelector((state) => state.movieReducer);

    function formatDate(dateString) {
        const options = { year: "numeric", month: "long", day: "numeric" };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
    }

    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 6,
        slidesToScroll: 5,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024, // Tablet screen
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 768, // Mobile screen
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480, // Extra small mobile screens
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="search-results-container">
            <h2>{`Search results for ${searchTerm}`}</h2>
            <Slider {...sliderSettings}>
                {searchMoviesData && searchMoviesData.map((movie, idx) => (
                    <Link to={`/singleItem/${movie.id}`} key={idx}>
                        <div className='search-result-item'>
                            <div className="search-result-img">
                                <img src={img_base_url + movie.poster_path} alt={movie.title || movie.original} />
                            </div>
                            <div className='search-result-ratings'>
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
                            <div className="search-result-info">
                                <h3>{movie.title || movie.original || movie.name || movie.original_name}</h3>
                                <p>
                                    {movie.release_date ? formatDate(movie.release_date) : formatDate(movie.first_air_date)}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </Slider>
        </div>
    );
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "gray",
                borderRadius: "50%",
                top: "40%",
                right: "10px",
                zIndex: 9999,
            }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                display: "block",
                background: "gray",
                borderRadius: "50%",
                top: "40%",
                left: "10px",
                zIndex: 9999,
            }}
            onClick={onClick}
        />
    );
}

export default SearchResults;