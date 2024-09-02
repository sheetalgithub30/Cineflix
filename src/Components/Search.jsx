import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const img_base_url = "https://image.tmdb.org/t/p/original/";

function Search() {
  const { trendingMoviesByWeek } = useSelector((state) => {
    return state.movieReducer;
  });

  console.log(trendingMoviesByWeek);

  const [searchTerm, setSearchTerm] = useState("");
  const [background, setBackground] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (trendingMoviesByWeek && trendingMoviesByWeek.length > 0) {
      let index = 0;

      // Function to preload image and then set it as background
      const preloadAndSetBackground = (imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          setBackground(imageUrl);
        };
      };

      // Preload and set the initial background image
      preloadAndSetBackground(img_base_url + (trendingMoviesByWeek[0].backdrop_path || trendingMoviesByWeek[0].poster_path));

      // Set interval to update background every 3 seconds
      const interval = setInterval(() => {
        index = (index + 1) % trendingMoviesByWeek.length;
        preloadAndSetBackground(img_base_url + (trendingMoviesByWeek[index].backdrop_path || trendingMoviesByWeek[index].poster_path));
      }, 4000); // 4 seconds

      // Cleanup interval on component unmount
      return () => clearInterval(interval);
    }
  }, [trendingMoviesByWeek]);

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/search/" + searchTerm);
  }

  return (
    <section 
      className='search' 
      style={{ 
        position: 'relative',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out'
      }}
    >
      {/* Overlay for increased opacity */}
      <div
        style={{
          position: 'absolute',
          top:0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, #04152d00, #04152d 79.17%)",
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
          zIndex: 1,
        }}
      ></div>

      <div className="search-component" style={{ position: 'relative', zIndex: 2 }}>
        <h1>Welcome</h1>
        <p>Millions of movies, TV shows, and people to discover. Explore now.</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder='Search for a movie or TV show...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <button type='submit'>Search</button>
        </form>
      </div>
    </section>
  );
}

export default Search;













// https://movix-app-murex.vercel.app/assets/no-poster-4xa9LmsT.png