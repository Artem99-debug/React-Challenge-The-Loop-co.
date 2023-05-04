// setup endpoint

let REACT_APP_OMDB_API_KEY = "9610aef4";

// get all movies by title

async function getMovies(query) {
  var dados = {};
  await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=${REACT_APP_OMDB_API_KEY}`,
    { method: "GET" }
  )
    .then((response) => (dados = response.json()))
    .catch((error) => (dados.errors = error));
  return dados;
}

// get movie by year

async function getMoviesByYear(title, year) {
  var dados = {};
  await fetch(
    `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=${REACT_APP_OMDB_API_KEY}`,
    { method: "GET" }
  )
    .then((response) => (dados = response.json()))
    .catch((error) => (dados.errors = error));
  return dados;
}

// get movie by id
async function getMovie(idImdb) {
  var dados = {};
  await fetch(
    `https://www.omdbapi.com/?apikey=${REACT_APP_OMDB_API_KEY}&i=${idImdb}`,
    { method: "GET" }
  )
    .then((response) => (dados = response.json()))
    .catch((error) => (dados.errors = error));
  return dados;
}

export default {
  getMovies,
  getMovie,
  getMoviesByYear,
};
