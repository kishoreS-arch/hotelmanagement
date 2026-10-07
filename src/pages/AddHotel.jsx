import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { addHotel } from '../redux/hotelSlice';
import HotelForm from '../components/HotelForm';
import SuccessPopup from '../components/SuccessPopup';

const AddHotel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState('');

  // Handle new hotel creation
  const handleSubmit = (hotelData) => {
    dispatch(addHotel(hotelData));
    setSuccessMsg('Hotel added successfully!');

    // Redirect to home after 1 second
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <div className="page-container form-page-container">
      <SuccessPopup message={successMsg} onClose={() => setSuccessMsg('')} />

      <div className="form-card-container">
        {/* Navigation link */}
        <div className="form-header-nav">
          <Link to="/" className="btn-back-link">
            ← Back to Hotels
          </Link>
        </div>

        {/* Title */}
        <div className="form-title-block">
          <h1 className="form-heading">Add New Hotel</h1>
          <p className="form-subheading">Fill in the details below to list a new hotel.</p>
        </div>

        {/* Reusable Form */}
        <HotelForm
          onSubmit={handleSubmit}
          submitText="Add Hotel"
          onCancel={() => navigate('/')}
        />
      </div>
    </div>
  );
};

export default AddHotel;
