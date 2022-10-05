import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import requests from '../../movieRequest';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.netflixOriginals);
      setMovie(request.data.results[Math.floor(Math.random() * request.data.results.length - 1)])
      return request;
    }
    fetchData();
  }, [])

  const shortenDescription = (string, num) => {
    return string.length > num ? string.substr(0, num -1 ) + '...' : string
  }
  return (
    <header className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path || movie?.poster_path}")`,
        backgroundPosition: 'center center'
      }}>
      <div className='banner-content'>
        <h1 className='banner-title'>{movie?.name || movie?.original_name || movie?.title || movie?.original_title}</h1>
        <h1 className='banner-description'>{shortenDescription(movie?.overview || '', 260)}
        </h1>

        <div className='banner-buttons'>
          <button className='banner-button play'>
            <i className="fa-solid fa-play"></i> 
            Play</button>
          <button className='banner-button mylist'>
          <i className="fa-solid fa-plus"></i>
          My List</button>
        </div>
      </div>
      {/* fade effect on the bottom of the movie */}
      <div className='banner-fade'></div>

    </header>
  )
}

export default Banner;