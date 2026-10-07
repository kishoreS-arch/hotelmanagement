import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HotelList from '../pages/HotelList';
import AddHotel from '../pages/AddHotel';
import EditHotel from '../pages/EditHotel';
import HotelDetails from '../pages/HotelDetails';

/**
 * Main Application Routing Specification
 * SPA Client-side route declarations
 */
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HotelList />} />
      <Route path="/add" element={<AddHotel />} />
      <Route path="/edit/:id" element={<EditHotel />} />
      <Route path="/hotel/:id" element={<HotelDetails />} />
      {/* Catch-all route redirects back to hotel listing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
