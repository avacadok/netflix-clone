const api = `640e0b004418508d0e95497133582f6b`;
const movieRequests = {
  trendingMovie: `/trending/all/week?api_key=${api}`,
  netflixOriginals: `/discover/tv?api_key=${api}&with_networks=213`,
  topRatedMovies: `/movie/top_rated?api_key=${api}`,
  actionMovies: `/discover/movie?api_key=${api}&with_genres=28`,
  comedyMovies: `/discover/movie?api_key=${api}&with_genres=35`,
  horrorMovies: `/discover/movie?api_key=${api}&with_genres=27`,
  romanceMovies: `/discover/movie?api_key=${api}&with_genres=10749`,
  anime: `/discover/movie?api_key=${api}&with_genres=16`,
  family: `/discover/movie?api_key=${api}&with_genres=10751`,
};

export default movieRequests;