import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, handleAddToFavorites, favoritos, alreadySeen, isFavoriteInList, handleSeenClick, moviesList }) => {

    const [isFavorite, setIsFavorite] = useState(favoritos);
    const [seen, setSeen] = useState(alreadySeen);

    const handleFavoriteClick = (variable) => {
        if (variable) {
            setIsFavorite(!variable);
            handleAddToFavorites(movie, isFavorite);
            return;
        }
        setIsFavorite(!isFavorite);
        handleAddToFavorites(movie, isFavorite);

    };

    const handleAddSeen = () => {
        setSeen(!seen);
        handleSeenClick(movie, seen);
    };

    return (

        <div className="movie-card" style={{ opacity: seen ? 0.6 : 1, marginRight: 10 }}>
            <Link to={`/movies/${movie.imdbID}`} className="btn btn-primary">
                <img
                    src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                    className="movie-card-img"
                    alt={movie.Title}
                />
            </Link>
            <div className="movie-card-body">
                <h5 className="movie-card-title">{movie.Title}</h5>
                <p className="movie-card-text">{movie.Year}</p>
                {!isFavoriteInList && !favoritos && (
                    <button
                        className={`btn btn-"outline-primary" ms-2 favorite-button`}
                        onClick={() => handleFavoriteClick(true)}
                    >
                        {"Add to favorites"}
                    </button>
                )}
                {!moviesList && (
                    <button
                        className={`btn btn-${isFavorite ? "danger" : "outline-primary"} ms-2 favorite-button`}
                        onClick={() => handleFavoriteClick("")}
                    >
                        {isFavorite ? "Remove from favorites" : "Add to favorites"}
                    </button>
                )}
                {isFavoriteInList && favoritos && (
                    <button
                        className="btn btn-outline-secondary btn-sm mx-1"
                        onClick={handleAddSeen}
                    >
                        {seen ? "Already Seen" : "Not Seen"}

                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
