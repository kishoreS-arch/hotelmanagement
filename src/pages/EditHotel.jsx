import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { updateHotel } from '../redux/hotelSlice';
import HotelForm from '../components/HotelForm';
import SuccessPopup from '../components/SuccessPopup';

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Find the hotel to edit from Redux store
  const hotel = useSelector((state) =>
    state.hotels.items.find((h) => String(h.id) === String(id))
  );

  const [successMsg, setSuccessMsg] = useState('');

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

  // Handle updates
  const handleSubmit = (updatedData) => {
    dispatch(updateHotel({ ...updatedData, id: hotel.id }));
    setSuccessMsg('Hotel updated successfully!');

    setTimeout(() => {
      navigate(`/hotel/${hotel.id}`);
    }, 1000);
  };

  return (
    <div className="page-container form-page-container">
      <SuccessPopup message={successMsg} onClose={() => setSuccessMsg('')} />

      <div className="form-card-container">
        {/* Navigation link */}
        <div className="form-header-nav">
          <Link to={`/hotel/${hotel.id}`} className="btn-back-link">
            ← Back to Details
          </Link>
        </div>

        {/* Title */}
        <div className="form-title-block">
          <h1 className="form-heading">Edit Hotel</h1>
          <p className="form-subheading">Update information for {hotel.title}</p>
        </div>

        {/* Reusable Form pre-filled with existing data */}
        <HotelForm
          initialData={hotel}
          onSubmit={handleSubmit}
          submitText="Update Hotel"
          onCancel={() => navigate(`/hotel/${hotel.id}`)}
        />
      </div>
    </div>
  );
};

export default EditHotel;
