import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Row(props) {
  const { title, url, isLargeRow = false } = props;
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('')

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      setMovie(request.data.results);
      return request
    }
    fetchData();
  }, [url])

  const opts = {
    height: "400",
    width: "80%",
    playVideo: {
      autoplay: 1
    },
  };

  const onClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.title || movie?.original_title || "")
      .then(url => {
        const urlParams = new URLSearchParams(new URL(url).search)
        setTrailerUrl(urlParams.get('v')) 
      })
      .catch(err => console.log("err", err))
    }
  }

  return (
    <div className='row'>
      <h2 className='movie-title'>{title}</h2>

      <div className='row-posters'>
        {movie.map((movie, index) => {
          return (
            <img
              key={index}
              onClick={() => onClick(movie)}
              className={`row-poster ${isLargeRow && 'row-posterLarge'}`}
              src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie?.poster_path : movie?.backdrop_path || movie?.poster_path
                }`} alt={movie.name} />
          )
        })}
      </div>
      {trailerUrl && <YouTube className='movie-trailer' videoId={trailerUrl} opts={opts} />}
    </div>
  )
}

export default Row;