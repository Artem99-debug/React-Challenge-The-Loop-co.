import { useState, React } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, handleAddToFavorites, favoritos }) => {

    const [isFavorite, setIsFavorite] = useState(favoritos);

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        handleAddToFavorites(movie, isFavorite);
    };

    return (
      
        <div className="movie-card">
              <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                className="movie-card-img"
                alt={movie.Title}
            />
            </Link>
            <div className="movie-card-body">
                <h5 className="movie-card-title">{movie.Title}</h5>
                <p className="movie-card-text">{movie.Year}</p>
                <button
                    className={`btn btn-${isFavorite ? "danger" : "outline-primary"} ms-2 favorite-button`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
