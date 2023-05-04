import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import ApiRequests from "../../utils/api";

import "./HomePage.css";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("title");
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState(
    JSON.parse(localStorage.getItem("favoriteMovies")) || []
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [seenMovies, setSeenMovies] = useState(
    JSON.parse(localStorage.getItem("seenMovies")) || []
  );

  const saveFavoriteMovie = (movie, isFavorite) => {
    let newFavoriteMovies = [...favoriteMovies];
    console.log(movie, isFavorite)
    if (isFavorite) {
      // Remove the movie from the favorites list
      newFavoriteMovies = newFavoriteMovies.filter(
        (m) => m.imdbID !== movie.imdbID
      );
    } else {
      // Add the movie to the favorites list
      newFavoriteMovies.push(movie);
    }

    localStorage.setItem("favoriteMovies", JSON.stringify(newFavoriteMovies));
    setFavoriteMovies(newFavoriteMovies);
  };

  const saveSeenMovie = (movie, seen) => {
    let newSeenMovies = [...seenMovies];

    if (seen) {
      // Remove the movie from the favorites list
      newSeenMovies = newSeenMovies.filter(
        (m) => m.imdbID !== movie.imdbID
      );
    } else {
      // Add the movie to the favorites list
      newSeenMovies.push(movie);
    }

    localStorage.setItem("seenMovies", JSON.stringify(newSeenMovies));
    setSeenMovies(newSeenMovies);
  };

  const updatePagination = async (page) => {
    setCurrentPage(page);
    let data = "";
    try {
      data = await ApiRequests.getMovies(query, page);
      if (data.Response === "True") {
        // console.log(data)
        setMovies(data.Search);
        setErrorMessage("");
      } else {
        setMovies([]);
        setErrorMessage(data.Error);
      }
    } catch (error) {
      setMovies([]);
      setErrorMessage("Something went wrong. Please try again later.");
    }

  };

  const searchMovies = async (e) => {
    let data = "";
    e.preventDefault();
    try {
      console.log(search)
      switch (search) {
        case "title":
          data = await ApiRequests.getMovies(query, currentPage);
          if (data.Response === "True") {
            // console.log(data)
            setMovies(data.Search);
            setErrorMessage("");
          } else {
            setMovies([]);
            setErrorMessage(data.Error);
          }
          break;
        case "imdb":
          data = await ApiRequests.getMovie(query);
          if (data.Response === "True") {
            setMovies([data]);
            setErrorMessage("");
          }
          else {
            setMovies([]);
            setErrorMessage(data.Error);
          }
          break;
        case "year":
          if (!year) {
            setMovies([]);
            setErrorMessage("Please enter a year");
            return;
          }
          data = await ApiRequests.getMoviesByYear(query, year);
          console.log(data)
          if (data.Response === "True") {
            setMovies([data]);
            setErrorMessage("");
          } else {
            console.log("teste")
            setMovies([]);
            setErrorMessage(data.Error);
          }
          break;
        default:
          console.log(`Sorry, there's no results.`);
      }
    } catch (error) {
      console.error(error);
      setMovies([]);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (



    <div className="container dark-style">
      {
        favoriteMovies.length > 0 &&
        <h1 className="mb-4">Favorite Movies</h1>
      }

      <div className="d-flex flex-wrap justify-content-center">
        {favoriteMovies.map((movie) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={movie.imdbID}>
            <MovieCard
              movie={movie}
              handleAddToFavorites={(movie, isFavorite) =>
                saveFavoriteMovie(movie, isFavorite)
              }
              handleSeenClick={(movie, seen) =>
                saveSeenMovie(movie, seen)
              }
              isFavoriteInList={favoriteMovies.find(fav => fav.imdbID === movie.imdbID)}
              alreadySeen={seenMovies.find(seen => seen.imdbID === movie.imdbID)}
              favoritos={true}
            />
          </div>
        ))}
      </div>
      <div className="text-center">
        <div className="container my-4" >
          <h1 className="mb-4">Search for Movies</h1>
          <form onSubmit={searchMovies}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search for a movie"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="btn btn-primary-search" type="submit">
                Search
              </button>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                id="searchByTitle"
                value="title"
                checked={search === "title"}
                onChange={() => { setSearch("title"); setErrorMessage("") }}
              />
              <label className="form-check-label" htmlFor="searchByTitle">
                Search by title
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                id="searchByImdb"
                value="imdb"
                onChange={() => { setSearch("imdb"); setErrorMessage("") }}
              />
              <label className="form-check-label" htmlFor="searchByImdb">
                Search by IMDB ID
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="searchType"
                id="searchByYear"
                value="year"
                onChange={() => { setSearch("year"); setErrorMessage("") }}
              />
              <label className="form-check-label" htmlFor="searchByYear">
                Search by year
              </label>
            </div>
            {search === "year" && (
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
            )}
          </form>

          {errorMessage && <p className="text-danger" >{errorMessage}</p>}
          {movies.length > 0 && (
            <div className="d-flex flex-wrap justify-content-center" style={{ marginTop: 20 }}>
              {movies.map((movie) => (

                <div className="col-sm-6 col-md-4 col-lg-2 my-1 mx-2" key={movie.imdbID}>
                  <MovieCard
                    movie={movie}
                    isFavoriteInList={favoriteMovies.find(fav => fav.imdbID === movie.imdbID)}
                    handleAddToFavorites={(movie, isFavorite) =>
                      saveFavoriteMovie(movie, isFavorite)
                    }
                    handleSeenClick={(movie, seen) =>
                      saveSeenMovie(movie, seen)
                    }
                    favoritos={false}
                    moviesList={true}
                  />
                </div>
              ))}
            </div>
          )}
          {
            movies.length > 0 && search == "title" && (

              <nav>
                <ul class="pagination justify-content-center bg-dark">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous" onClick={() => updatePagination(currentPage - 1)}>
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>
                  <li class={`page-item ${currentPage === 1 ? 'active' : ''}`}>
                    <a class="page-link" href="#" onClick={() => updatePagination(1)}>1</a>
                  </li>
                  <li class={`page-item ${currentPage === 2 ? 'active' : ''}`}>
                    <a class="page-link" href="#" onClick={() => updatePagination(2)}>2</a>
                  </li>
                  <li class={`page-item ${currentPage === 3 ? 'active' : ''}`}>
                    <a class="page-link" href="#" onClick={() => updatePagination(3)}>3</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next" onClick={() => updatePagination(currentPage + 1)}>
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>

            )
          }
        </div>
      </div>
    </div>
  );
};

export default HomePage;
