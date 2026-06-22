import { useState } from "react"

export default function SearchBar() {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query.trim() === "") return
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") handleSearch()
    }

    return (
        <div className="search-bar-container">

            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button className="search-button" onClick={handleSearch}>
                    <span className="material-symbols-rounded">search</span>
                </button>
            </div>

            <button className="mic-button">
                <span className="material-symbols-rounded">mic</span>
            </button>

        </div>
    )
}