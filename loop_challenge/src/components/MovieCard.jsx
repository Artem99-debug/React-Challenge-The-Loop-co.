import { useState, React } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, handleAddToFavorites, favoritos }) => {

    const [isFavorite, setIsFavorite] = useState(favoritos);



    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
        handleAddToFavorites(movie, isFavorite);
    };

    return (
        <div className="card">
            <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                className="card-img-top"
                alt={movie.Title}
            />
            <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <p className="card-text">{movie.Year}</p>
                <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary">
                    Details
                </Link>
                <button
                    className={`btn btn-${isFavorite ? "danger" : "outline-primary"} ms-2`}
                    onClick={handleFavoriteClick}
                >
                    {isFavorite ? "Remove from favorites" : "Add to favorites"}
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
