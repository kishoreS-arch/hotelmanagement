import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteHotel } from '../redux/hotelSlice';
import SearchBar from '../components/SearchBar';
import PriceFilter from '../components/PriceFilter';
import HotelCard from '../components/HotelCard';
import Pagination from '../components/Pagination';
import DeleteModal from '../components/DeleteModal';

const ITEMS_PER_PAGE = 6;

const HotelList = () => {
  const dispatch = useDispatch();
  const hotels = useSelector((state) => state.hotels.items);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Delete modal state
  const [hotelToDelete, setHotelToDelete] = useState(null);

  // 1. Filter hotels by title and price range
  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.title
      ? hotel.title.toLowerCase().includes(searchTerm.toLowerCase().trim())
      : false;

    const price = Number(hotel.price);
    const min = minPrice !== '' ? Number(minPrice) : null;
    const max = maxPrice !== '' ? Number(maxPrice) : null;

    const matchesMin = min === null || price >= min;
    const matchesMax = max === null || price <= max;

    return matchesSearch && matchesMin && matchesMax;
  });

  // 2. Pagination calculations
  const totalPages = Math.ceil(filteredHotels.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedHotels = filteredHotels.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 3. Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  };

  // 4. Delete hotel confirmation
  const handleConfirmDelete = () => {
    if (hotelToDelete) {
      dispatch(deleteHotel(hotelToDelete.id));
      setHotelToDelete(null);
    }
  };

  return (
    <div className="page-container hotel-list-page">
      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={Boolean(hotelToDelete)}
        hotelTitle={hotelToDelete?.title}
        onConfirm={handleConfirmDelete}
        onCancel={() => setHotelToDelete(null)}
      />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Stay</h1>
          <p className="hero-subtitle">
            Browse and manage our curated collection of luxury hotels and resorts.
          </p>
          <div className="hero-actions">
            <Link to="/add" className="btn btn-primary btn-hero">
              + Add Hotel
            </Link>
          </div>
        </div>
      </section>

      {/* Filter and Search Section */}
      <section className="filter-controls-section">
        <div className="filter-controls-wrapper">
          <div className="search-filter-col">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={(val) => {
                setSearchTerm(val);
                setCurrentPage(1);
              }}
            />
          </div>

          <div className="price-filter-col">
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinChange={(val) => {
                setMinPrice(val);
                setCurrentPage(1);
              }}
              onMaxChange={(val) => {
                setMaxPrice(val);
                setCurrentPage(1);
              }}
              onClear={handleClearFilters}
            />
          </div>
        </div>

        {/* Results Count & Clear Button */}
        <div className="results-summary-row">
          <p className="results-count-text">
            Showing <strong>{filteredHotels.length}</strong> hotels available
          </p>
          {(searchTerm || minPrice || maxPrice) && (
            <button type="button" onClick={handleClearFilters} className="btn-link-reset">
              Reset all filters
            </button>
          )}
        </div>
      </section>

      {/* Hotel Cards List */}
      <main className="hotels-content-area">
        {filteredHotels.length === 0 ? (
          <div className="empty-state-card">
            <h2>No hotels found</h2>
            <p>Try adjusting your search query or price range.</p>
            <button
              type="button"
              onClick={handleClearFilters}
              className="btn btn-primary"
              style={{ marginTop: '1rem' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="hotel-cards-grid">
              {paginatedHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onDeleteClick={(h) => setHotelToDelete(h)}
                />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination-wrapper">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default HotelList;
