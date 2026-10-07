import { createSlice } from '@reduxjs/toolkit';
import initialHotels from '../data/hotels';

// Load initial hotels from localStorage or fallback to default dataset
const savedData = localStorage.getItem('hotels');
const initialState = {
  items: savedData ? JSON.parse(savedData) : initialHotels,
};

const hotelSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    // 1. Add hotel
    addHotel: (state, action) => {
      const newHotel = {
        ...action.payload,
        id: Date.now(), // Generate unique ID using timestamp
      };
      state.items.unshift(newHotel);
      localStorage.setItem('hotels', JSON.stringify(state.items));
    },

    // 2. Update hotel
    updateHotel: (state, action) => {
      const index = state.items.findIndex(
        (hotel) => String(hotel.id) === String(action.payload.id)
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('hotels', JSON.stringify(state.items));
      }
    },

    // 3. Delete hotel
    deleteHotel: (state, action) => {
      state.items = state.items.filter(
        (hotel) => String(hotel.id) !== String(action.payload)
      );
      localStorage.setItem('hotels', JSON.stringify(state.items));
    },
  },
});

export const { addHotel, updateHotel, deleteHotel } = hotelSlice.actions;
export default hotelSlice.reducer;
