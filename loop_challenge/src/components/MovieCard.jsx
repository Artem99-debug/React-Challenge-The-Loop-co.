import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faHeart as solidHeart, faHeart as regularHeart } from "@fortawesome/free-solid-svg-icons";



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

        <div className="movie-card" style={{ opacity: seen ? 0.4 : 1 }}>
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
                        className="btn ms-2 favorite-button-movie-card"
                        onClick={() => handleFavoriteClick(true)}
                    >
                        <FontAwesomeIcon icon={solidHeart} />
                    </button>
                )}
                {!moviesList && (
                    <button
                        className="btn  ms-2 mx-2 favorite-button-movie-favorite-card"
                        onClick={() => handleFavoriteClick("")}
                    >
                        <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
                    </button>
                )}
                {isFavoriteInList && favoritos && (
                    <button
                        className="btn btn-outline-secondary btn-sm "
                        onClick={handleAddSeen}
                        style={{ marginTop: 5 }}
                    >
                        {seen ? (
                            <FontAwesomeIcon icon={faEyeSlash} title="Seen" />
                        ) : (
                            <FontAwesomeIcon icon={faEye} title="Unseen" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
