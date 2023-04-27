import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== "") {
            history.push(`/search/${searchTerm}`);
            setSearchTerm("");
        }
    };

    return (
        <form onSubmit={handleSearchSubmit} className="form-inline">
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <div className="input-group-append">
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
};

export default SearchBar;
