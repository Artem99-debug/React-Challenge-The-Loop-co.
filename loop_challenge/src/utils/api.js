// setup endpoint

let REACT_APP_OMDB_API_KEY = "9610aef4";

// get all movies

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

export default {
  getMovies,
};
