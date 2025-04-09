import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Search.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductList from '../components/product/ProductList';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';
import { searchProducts } from '../api/product';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';
  
  const [query, setQuery] = useState(searchQuery);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const addToRecentSearches = useCallback((searchTerm) => {
    setRecentSearches(prevSearches => {
      // Remove if already exists
      const filteredSearches = prevSearches.filter(s => 
        s.toLowerCase() !== searchTerm.toLowerCase());
      
      // Add to beginning of array
      const newSearches = [searchTerm, ...filteredSearches].slice(0, 5);
      
      // Update localStorage
      localStorage.setItem('recentSearches', JSON.stringify(newSearches));
      
      return newSearches;
    });
  }, []);
  
  const performSearch = useCallback(async (searchTerm) => {
    try {
      setLoading(true);
      setError(null);
      const results = await searchProducts(searchTerm);
      setProducts(results);
      setLoading(false);
      
      // Add to recent searches
      if (searchTerm.trim()) {
        addToRecentSearches(searchTerm);
      }
    } catch (err) {
      setError('Failed to perform search. Please try again.');
      setLoading(false);
      console.error('Error searching products:', err);
    }
  }, [addToRecentSearches]);
  
  useEffect(() => {
    // Load recent searches from localStorage
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(searches);
    
    // If there's a search query in the URL, perform search
    if (searchQuery) {
      performSearch(searchQuery);
    }
  }, [searchQuery, performSearch]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (query.trim()) {
      // Update URL with search query
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  
  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm);
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };
  
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };
  
  return (
    <div className="search-page">
      <Navbar />
      
      <div className="search-container">
        <div className="search-header">
          <h1 className="search-title">Search Products</h1>
          
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-container">
              <Input
                id="search"
                name="search"
                type="text"
                placeholder="Search for helmets, gear, accessories..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="search-input"
              />
              <Button 
                type="submit" 
                variant="primary"
                disabled={loading}
              >
                <i className="fa fa-search"></i> Search
              </Button>
            </div>
          </form>
          
          {recentSearches.length > 0 && (
            <div className="recent-searches">
              <div className="recent-searches-header">
                <h3>Recent Searches</h3>
                <button 
                  className="clear-recent-searches"
                  onClick={clearRecentSearches}
                >
                  Clear
                </button>
              </div>
              <div className="recent-searches-list">
                {recentSearches.map((term, index) => (
                  <span 
                    key={index} 
                    className="recent-search-term"
                    onClick={() => handleRecentSearchClick(term)}
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="search-results">
          {loading ? (
            <Loading text="Searching..." />
          ) : error ? (
            <div className="search-error">{error}</div>
          ) : products.length > 0 ? (
            <>
              <div className="search-results-header">
                <h2>
                  {products.length} results for "{searchQuery}"
                </h2>
              </div>
              <ProductList products={products} />
            </>
          ) : searchQuery ? (
            <div className="no-results">
              <h2>No results found for "{searchQuery}"</h2>
              <p>Try checking your spelling or use more general terms.</p>
            </div>
          ) : null}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Search; 