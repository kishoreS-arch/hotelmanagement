import React from 'react';

const PriceFilter = ({ minPrice, maxPrice, onMinChange, onMaxChange, onClear }) => {
  const isFilterActive = minPrice !== '' || maxPrice !== '';

  return (
    <div className="price-filter-container">
      <div className="price-filter-fields">
        {/* Min Price */}
        <div className="price-input-group">
          <label className="price-label">Min Price (₹)</label>
          <input
            type="number"
            placeholder="e.g. 2000"
            value={minPrice}
            onChange={(e) => onMinChange(e.target.value)}
            className="price-input"
          />
        </div>

        {/* Max Price */}
        <div className="price-input-group">
          <label className="price-label">Max Price (₹)</label>
          <input
            type="number"
            placeholder="e.g. 8000"
            value={maxPrice}
            onChange={(e) => onMaxChange(e.target.value)}
            className="price-input"
          />
        </div>
      </div>

      {/* Clear Button */}
      {isFilterActive && (
        <button type="button" onClick={onClear} className="btn-filter-clear">
          Clear Filter
        </button>
      )}
    </div>
  );
};

export default PriceFilter;
