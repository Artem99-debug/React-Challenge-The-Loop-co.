import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MovieCard from "../../components/MovieCard";
import ApiRequests from "../../utils/api";

const HomePage = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [favoriteMovies, setFavoriteMovies] = useState(
        JSON.parse(localStorage.getItem("favoriteMovies")) || []
    );

    const saveFavoriteMovie = (movie, isFavorite) => {
        let newFavoriteMovies = [...favoriteMovies];

        if (isFavorite) {
            // Remove the movie from the favorites list
            newFavoriteMovies = newFavoriteMovies.filter((m) => m.imdbID !== movie.imdbID);
        } else {
            // Add the movie to the favorites list
            newFavoriteMovies.push(movie);
        }

        localStorage.setItem("favoriteMovies", JSON.stringify(newFavoriteMovies));
        setFavoriteMovies(newFavoriteMovies);
    };


    const searchMovies = async (e) => {
        e.preventDefault();
        try {
            const data = await ApiRequests.getMovies(query);
            if (data.Response === "True") {
                setMovies(data.Search);
                setErrorMessage("");
            } else {
                setMovies([]);
                setErrorMessage(data.Error);
            }
        } catch (error) {
            console.error(error);
            setMovies([]);
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="container ">
            <div className="d-flex flex-wrap">
                {favoriteMovies.map((movie) => (
                    <div className="col-6" key={movie.imdbID}>
                        <MovieCard movie={movie} handleAddToFavorites={(movie, isFavorite) => saveFavoriteMovie(movie, isFavorite)} favoritos={true} />
                    </div>
                ))}
            </div>
            <div className="text-center">
                <div className="container my-4">
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
                            <button className="btn btn-primary" type="submit">
                                Search
                            </button>
                        </div>
                    </form>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                    {movies.length > 0 && (
                        <div className="d-flex flex-wrap">
                            {movies.map((movie) => (
                                <div className="col-sm-6 col-md-4 col-lg-3 mb-3" key={movie.imdbID}>
                                    <MovieCard movie={movie} handleAddToFavorites={(movie, isFavorite) => saveFavoriteMovie(movie, isFavorite)} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
