import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiRequests from "../../utils/api";

const MovieDetailsPage = () => {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const getMovie = async () => {

        try {
            const data = await ApiRequests.getMovie(imdbID);
            if (data.Response === "True") {
                // console.log(data)
                setMovie(data);
                setErrorMessage("");
            } else {
                setMovie([]);
                setErrorMessage(data.Error);
            }
        } catch (error) {
            console.error(error);
            setMovie([]);
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    useEffect(() => {
        getMovie();
    }, [imdbID]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={movie.Poster}
                        alt={`${movie.Title} poster`}
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-8">
                    <h1>{movie.Title}</h1>
                    <p>{movie.Plot}</p>
                    <p>Director: {movie.Director}</p>
                    <p>Actors: {movie.Actors}</p>
                    <p>IMDb Rating: {movie.imdbRating}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
