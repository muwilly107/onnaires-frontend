import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="row mb-4 me-0 ms-0">
            <div className="col-md-6 mx-auto">
                <input
                    type="text"
                    className="form-control form-control-lg shadow-sm"
                    style={{
                        backgroundColor: "#1a1a1a",
                        color: "#ffc107",
                        borderColor: "#ffc107",
                        caretColor: "#ffc107",
                        WebkitTextFillColor: "#dbad07"
                    }}
                    placeholder="Search food, drinks, or desserts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;