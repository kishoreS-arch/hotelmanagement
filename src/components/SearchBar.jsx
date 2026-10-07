import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder = 'Search hotels by name...' }) => {
  return (
    <div className="search-bar-wrapper">
      <div className="search-input-container">
        <span style={{ marginRight: '8px' }}>🔍</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="search-clear-btn"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
