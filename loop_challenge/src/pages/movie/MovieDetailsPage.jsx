import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ApiRequests from "../../utils/api";
import { Spinner } from "react-bootstrap";

import "./MovieDetailsPage.css";

const MovieDetailsPage = () => {
    const { imdbID } = useParams();
    const [movie, setMovie] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const getMovie = async () => {
        try {
            const data = await ApiRequests.getMovie(imdbID);
            if (data.Response === "True") {
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
        return (
            <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={movie.Poster}
                        alt={`${movie.Title} poster`}
                        className="img-fluid rounded"
                    />
                </div>
                <div className="col-md-8">
                    <h1 className="text-white mb-4">{movie.Title}</h1>
                    <p className="text-white">{movie.Plot}</p>
                    <p className="text-white">
                        <strong>Director:</strong> {movie.Director}
                    </p>
                    <p className="text-white">
                        <strong>Actors:</strong> {movie.Actors}
                    </p>
                    <p className="text-white">
                        <strong>IMDb Rating:</strong> {movie.imdbRating}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;
