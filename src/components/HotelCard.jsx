import React from 'react';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel, onDeleteClick }) => {
  return (
    <article className="hotel-card">
      {/* Hotel Image with Price Overlay */}
      <div className="hotel-card-image-wrap">
        <img
          src={hotel.image || '/images/hotel-1.jpg'}
          alt={hotel.title}
          className="hotel-card-img"
          onError={(e) => {
            e.target.src = '/images/hotel-1.jpg';
          }}
        />
        <div className="hotel-card-price-badge">
          <span className="price-amount">₹{Number(hotel.price).toLocaleString('en-IN')}</span>
          <span className="price-unit">/ night</span>
        </div>
      </div>

      {/* Hotel Body */}
      <div className="hotel-card-body">
        <h3 className="hotel-card-title">{hotel.title}</h3>

        <div className="hotel-card-location">
          <span>📍 {hotel.latitude}, {hotel.longitude}</span>
        </div>

        <p className="hotel-card-desc">{hotel.description}</p>

        {/* View Details Link */}
        <div className="hotel-card-details-link-wrap">
          <Link to={`/hotel/${hotel.id}`} className="details-link">
            View Details →
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hotel-card-actions">
          <Link to={`/edit/${hotel.id}`} className="btn-card-action btn-card-edit">
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDeleteClick(hotel)}
            className="btn-card-action btn-card-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default HotelCard;
