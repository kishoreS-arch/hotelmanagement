import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { deleteHotel } from '../redux/hotelSlice';
import DeleteModal from '../components/DeleteModal';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // 1. Get the current hotel from Redux store
  const hotel = useSelector((state) =>
    state.hotels.items.find((item) => String(item.id) === String(id))
  );

  // 2. Handle missing hotel
  if (!hotel) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>Hotel Not Found</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Hotels
        </Link>
      </div>
    );
  }

  // 3. Handle hotel deletion
  const handleDelete = () => {
    dispatch(deleteHotel(hotel.id));
    setShowDeleteModal(false);
    navigate('/');
  };

  const lat = Number(hotel.latitude);
  const lon = Number(hotel.longitude);
  const mapEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.02}%2C${lat - 0.02}%2C${lon + 0.02}%2C${lat + 0.02}&layer=mapnik&marker=${lat}%2C${lon}`;

  return (
    <div className="page-container details-page-container">
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        hotelTitle={hotel.title}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
      />

      {/* Top Navigation & Action Row */}
      <div className="details-header-row">
        <Link to="/" className="btn-back-link">
          ← Back to Hotels
        </Link>

        <div className="details-header-actions">
          <Link to={`/edit/${hotel.id}`} className="btn btn-secondary">
            Edit Hotel
          </Link>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Main Details Grid */}
      <article className="details-main-grid">
        {/* Left Column: Image & Info */}
        <div className="details-left-pane">
          <div className="details-image-hero">
            <img
              src={hotel.image || '/images/hotel-1.jpg'}
              alt={hotel.title}
              className="details-large-img"
            />
            <div className="details-image-overlay-price">
              <span className="price-tag-value">₹{Number(hotel.price).toLocaleString('en-IN')}</span>
              <span className="price-tag-unit">/ night</span>
            </div>
          </div>

          <div className="details-content-card">
            <div className="details-title-section">
              <h1 className="details-title">{hotel.title}</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                Coordinates: Latitude: {lat} | Longitude: {lon}
              </p>
            </div>

            <div className="details-divider" />

            <div className="details-section">
              <h2 className="section-title">Property Description</h2>
              <p className="details-full-description">{hotel.description}</p>
            </div>

            <div className="details-divider" />

            <div className="details-section">
              <h2 className="section-title">Amenities</h2>
              <div className="amenities-grid">
                <div className="amenity-item">✓ High-Speed Wi-Fi</div>
                <div className="amenity-item">✓ Complimentary Breakfast</div>
                <div className="amenity-item">✓ Free Parking</div>
                <div className="amenity-item">✓ 24/7 Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Location Map */}
        <aside className="details-right-pane">
          <div className="map-card">
            <div className="map-card-header">
              <h3 className="map-card-title">Property Location</h3>
            </div>
            <div className="map-frame-wrapper">
              <iframe
                title="Location Map"
                className="osm-iframe"
                src={mapEmbedUrl}
                loading="lazy"
              />
            </div>
          </div>

          <div className="booking-summary-card">
            <div className="summary-price-header">
              <div>
                <span className="rate-label">Starting From</span>
                <div className="summary-price-display">
                  <span className="currency">₹</span>
                  <span className="amount">{Number(hotel.price).toLocaleString('en-IN')}</span>
                  <span className="period">/ night</span>
                </div>
              </div>
            </div>

            <div className="summary-actions">
              <Link to={`/edit/${hotel.id}`} className="btn btn-primary btn-block">
                Edit Hotel
              </Link>
            </div>
          </div>
        </aside>
      </article>
    </div>
  );
};

export default HotelDetails;
