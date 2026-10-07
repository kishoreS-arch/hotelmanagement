/**
 * Form Validation Utility for Hotel Data
 * Validates title, description, latitude, longitude, price, and image.
 */

export const validateHotel = (formData) => {
  const errors = {};

  // Title: Required, min 3 characters
  if (!formData.title || !formData.title.trim()) {
    errors.title = 'Hotel title is required.';
  } else if (formData.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long.';
  }

  // Description: Required, min 10 characters
  if (!formData.description || !formData.description.trim()) {
    errors.description = 'Hotel description is required.';
  } else if (formData.description.trim().length < 10) {
    errors.description = 'Description must be at least 10 characters long.';
  }

  // Latitude: Required, range -90 to 90
  if (formData.latitude === undefined || formData.latitude === null || String(formData.latitude).trim() === '') {
    errors.latitude = 'Latitude is required.';
  } else {
    const lat = Number(formData.latitude);
    if (isNaN(lat)) {
      errors.latitude = 'Latitude must be a valid number.';
    } else if (lat < -90 || lat > 90) {
      errors.latitude = 'Latitude must be between -90 and 90 degrees.';
    }
  }

  // Longitude: Required, range -180 to 180
  if (formData.longitude === undefined || formData.longitude === null || String(formData.longitude).trim() === '') {
    errors.longitude = 'Longitude is required.';
  } else {
    const lng = Number(formData.longitude);
    if (isNaN(lng)) {
      errors.longitude = 'Longitude must be a valid number.';
    } else if (lng < -180 || lng > 180) {
      errors.longitude = 'Longitude must be between -180 and 180 degrees.';
    }
  }

  // Price: Required, must be greater than 0
  if (formData.price === undefined || formData.price === null || String(formData.price).trim() === '') {
    errors.price = 'Price per night is required.';
  } else {
    const priceNum = Number(formData.price);
    if (isNaN(priceNum)) {
      errors.price = 'Price must be a valid numeric amount.';
    } else if (priceNum <= 0) {
      errors.price = 'Price must be greater than 0.';
    }
  }

  // Image: Required
  if (!formData.image || !String(formData.image).trim()) {
    errors.image = 'Hotel image is required. Please upload or select an image.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
