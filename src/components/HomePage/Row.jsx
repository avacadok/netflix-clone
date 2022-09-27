import React, { useEffect, useState } from 'react';
import axios from '../../axios';

function Row(props) {
  const { title, url, isLargeRow = false } = props;
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(url);
      setMovie(request.data.results);
      return request
    }
    fetchData();
  }, [url])

  console.log("islargerow", isLargeRow)

  return (
    <div className='row'>
      <h2 className='movie-title'>{title}</h2>

      <div className='row-posters'>
      {movie.map(movie => {
        return (
          <img 
          className={`row-poster ${isLargeRow && 'row-posterLarge'}`}
          src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie?.poster_path : movie?.backdrop_path || movie?.poster_path
            }`} alt={movie.name} />
        )
      })}
      </div>
    </div>
  )
}

export default Row;