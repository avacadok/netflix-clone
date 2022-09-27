import React from 'react';
import "../../styles/homePage.css"
import Banner from './Banner';
import Navbar from './Navbar';
import requests from '../../movieRequest';
import Row from './Row';

function HomePage() {
  const movieRows = [
    {
      title: "Netfilx Originals",
      url: `${requests.netflixOriginals}`,
      isLargeRow: true
    },
    {
      title: "Trending Now",
      url: `${requests.trendingMovie}`
    },
    {
      title: "Top Rated",
      url: `${requests.topRatedMovies}`
    },
    {
      title: "Action",
      url: `${requests.actionMovies}`
    },
    {
      title: "Comedy",
      url: `${requests.comedyMovies}`
    },
    {
      title: "Family",
      url: `${requests.family}`
    },
    {
      title: "Horror",
      url: `${requests.horrorMovies}`
    },
    {
      title: "Anime",
      url: `${requests.anime}`
    },
    {
      title: "Romance",
      url: `${requests.romanceMovies}`
    },

  ]
  return (
    <div className='homePage'>
      <Navbar />
      <Banner />

      {movieRows.map((movie, index) => {
        return (
          <Row 
          key={index}
          {...movie}
          />
        )
      })
      }
    </div>
  )
}

export default HomePage;