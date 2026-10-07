/**
 * Hotel API Service
 * Future Backend Integration Layer for Node.js / Express / PostgreSQL
 * 
 * Note: The application currently operates with Redux Toolkit and local data.
 * These asynchronous API wrappers are prepared so the backend can be wired up seamlessly
 * without requiring changes to components.
 */

const API_BASE_URL = 'http://localhost:5000/api/hotels';

export const getHotels = async () => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch hotels: ${response.statusText}`);
  }
  return response.json();
};

export const getHotel = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch hotel with id ${id}: ${response.statusText}`);
  }
  return response.json();
};

export const createHotel = async (hotelData) => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hotelData),
  });
  if (!response.ok) {
    throw new Error(`Failed to create hotel: ${response.statusText}`);
  }
  return response.json();
};

export const updateHotel = async (id, hotelData) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hotelData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update hotel ${id}: ${response.statusText}`);
  }
  return response.json();
};

export const removeHotel = async (id) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete hotel ${id}: ${response.statusText}`);
  }
  return response.json();
};
