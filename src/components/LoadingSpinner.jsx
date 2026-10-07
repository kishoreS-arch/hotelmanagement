import React from 'react';

/**
 * Reusable Loading Spinner Component
 * Ready for asynchronous API integrations and data fetching states
 */
const LoadingSpinner = ({ message = 'Loading hotels...' }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
