import React, { useState, useEffect } from 'react';

// Preset sample images for quick selection
const PRESET_IMAGES = [
  { label: 'Luxury Suite', path: '/images/hotel-1.jpg' },
  { label: 'Bay Resort', path: '/images/hotel-2.jpg' },
  { label: 'Spa Stay', path: '/images/hotel-3.jpg' },
  { label: 'Mountain Retreat', path: '/images/hotel-4.jpg' },
  { label: 'Heritage Palace', path: '/images/hotel-5.jpg' },
  { label: 'Lake Chalet', path: '/images/hotel-6.jpg' },
];

const HotelForm = ({
  initialData = {},
  onSubmit,
  submitText = 'Save Hotel',
  isSubmitting = false,
  onCancel,
}) => {
  // 1. Single state object for all form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    latitude: '',
    longitude: '',
    price: '',
    image: '',
  });

  const [errors, setErrors] = useState({});

  // 2. Load initial data when editing
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        latitude: initialData.latitude ?? '',
        longitude: initialData.longitude ?? '',
        price: initialData.price ?? '',
        image: initialData.image || '',
      });
    }
  }, [initialData]);

  // 3. Simple input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // 4. Handle file upload preview
  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  // 5. Basic form validation on submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.price || Number(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.latitude) newErrors.latitude = 'Latitude is required';
    if (!formData.longitude) newErrors.longitude = 'Longitude is required';
    if (!formData.image) newErrors.image = 'Please upload or select an image';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Pass sanitized numeric data to parent
    onSubmit({
      ...formData,
      price: Number(formData.price),
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
    });
  };

  return (
    <form className="hotel-form" onSubmit={handleSubmit}>
      {/* Title */}
      <div className="form-group">
        <label className="form-label">Hotel Title *</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Grand Resort & Spa"
          className="form-input"
        />
        {errors.title && <p className="field-error-message">{errors.title}</p>}
      </div>

      {/* Description */}
      <div className="form-group">
        <label className="form-label">Description *</label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief overview of hotel services and amenities..."
          className="form-textarea"
        />
        {errors.description && <p className="field-error-message">{errors.description}</p>}
      </div>

      {/* Price */}
      <div className="form-group">
        <label className="form-label">Price per Night (₹) *</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="e.g. 4500"
          className="form-input"
        />
        {errors.price && <p className="field-error-message">{errors.price}</p>}
      </div>

      {/* Coordinates: Latitude & Longitude in 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label className="form-label">Latitude *</label>
          <input
            name="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="e.g. 13.0827"
            className="form-input"
          />
          {errors.latitude && <p className="field-error-message">{errors.latitude}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Longitude *</label>
          <input
            name="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="e.g. 80.2707"
            className="form-input"
          />
          {errors.longitude && <p className="field-error-message">{errors.longitude}</p>}
        </div>
      </div>

      {/* Image Upload & Presets */}
      <div className="form-group">
        <label className="form-label">Hotel Image *</label>
        
        {/* Upload file */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFile}
          className="form-input"
          style={{ marginBottom: '0.75rem' }}
        />

        {/* Or pick a sample preset image */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Or select a sample photo:
        </p>
        <div className="preset-thumbnails">
          {PRESET_IMAGES.map((preset, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => setFormData((prev) => ({ ...prev, image: preset.path }))}
              className={`preset-thumb-btn ${formData.image === preset.path ? 'preset-active' : ''}`}
            >
              <img src={preset.path} alt={preset.label} />
            </button>
          ))}
        </div>

        {/* Live Preview */}
        {formData.image && (
          <div style={{ marginTop: '0.75rem' }}>
            <img
              src={formData.image}
              alt="Preview"
              style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px' }}
            />
          </div>
        )}
        {errors.image && <p className="field-error-message">{errors.image}</p>}
      </div>

      {/* Form Buttons */}
      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitText}
        </button>
      </div>
    </form>
  );
};

export default HotelForm;
