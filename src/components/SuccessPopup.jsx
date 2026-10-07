import React from 'react';

const SuccessPopup = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="success-toast-wrapper">
      <div className="success-toast">
        <span className="success-toast-icon">✓</span>
        <span className="success-toast-text">{message}</span>
        <button type="button" onClick={onClose} className="success-toast-close">
          ✕
        </button>
      </div>
    </div>
  );
};

export default SuccessPopup;
