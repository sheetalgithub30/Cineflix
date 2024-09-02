import React, { useState } from 'react';
import Movie from './Movie';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MoviesDisplay({ heading, option1, option2, choice1, choice2 }) {
    const [visible, setVisible] = useState(true);

    // console.log(option1);
    

    const settings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 6, // Default number of slides to show
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
        <>
            <section className='movieDisplay'>
                <div className='movies-title'>
                    <header className='movie-header'>{heading}</header>
                    <p>
                        <span onClick={() => setVisible(true)}>{choice1}</span>
                        <span onClick={() => setVisible(false)}>{choice2}</span>
                    </p>
                </div>

                <Slider {...settings}>
                    {
                        visible
                            ? option1.map((movie, idx) => (
                                <Movie key={idx} movie={movie} />
                            ))
                            : option2.map((movie, idx) => (
                                <Movie key={idx} movie={movie} />
                            ))
                    }
                </Slider>
            </section>
        </>
    )
}

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{
                ...style,
                right: '5px',
                top: '35%',
                transform: 'translateY(-50%)',
                display: 'block',
                background: 'gray', // This is for visibility; use CSS for final styling
                borderRadius: '50%',
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
                left: '10px',
                top: '35%',
                transform: 'translateY(-50%)',
                display: 'block',
                background: 'gray', // This is for visibility; use CSS for final styling
                borderRadius: '50%',
                zIndex: 9999,
            }}
            onClick={onClick}
        />
    );
}

export default MoviesDisplay;