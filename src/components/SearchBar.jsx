import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="row mb-4 me-0 ms-0">
            <div className="col-md-6 mx-auto">
                <input
                    type="text"
                    className="form-control form-control-lg shadow-sm"
                    placeholder="Search games, consoles, or gear..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;