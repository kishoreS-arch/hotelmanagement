import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-nav">
      <ul className="pagination-list">
        {/* Previous Button */}
        <li>
          <button
            type="button"
            className="pagination-btn pagination-nav-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {/* Page Number Buttons */}
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              type="button"
              className={`pagination-btn pagination-num-btn ${
                num === currentPage ? 'pagination-num-active' : ''
              }`}
              onClick={() => onPageChange(num)}
            >
              {num}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            type="button"
            className="pagination-btn pagination-nav-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
