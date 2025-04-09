import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './ProductList.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ProductList from '../components/product/ProductList';
import Loading from '../components/common/Loading';
import { getProducts, getProductsByCategory } from '../api/product';

const ProductListPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: categoryParam || 'all',
    priceRange: [0, 1000],
    sortBy: 'popularity'
  });
  
  const categories = [
    'All Products',
    'Full Face Helmets',
    'Open Face Helmets',
    'Modular Helmets',
    'Off-Road Helmets',
    'Adventure Helmets',
    'Novelty Helmets'
  ];
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let productsData;
        
        if (filters.category && filters.category !== 'all') {
          productsData = await getProductsByCategory(filters.category);
        } else {
          productsData = await getProducts();
        }
        
        // Filter by price
        const filteredProducts = productsData.filter(product => 
          product.price >= filters.priceRange[0] && 
          product.price <= filters.priceRange[1]
        );
        
        // Sort products
        const sortedProducts = sortProducts(filteredProducts, filters.sortBy);
        
        setProducts(sortedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };
    
    fetchProducts();
  }, [filters]);
  
  // Update category filter when URL param changes
  useEffect(() => {
    if (categoryParam) {
      setFilters(prevFilters => ({
        ...prevFilters,
        category: categoryParam
      }));
    }
  }, [categoryParam]);
  
  // Sort products based on selected option
  const sortProducts = (products, sortOption) => {
    const sorted = [...products];
    
    switch (sortOption) {
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'popularity':
      default:
        return sorted.sort((a, b) => b.soldCount - a.soldCount);
    }
  };
  
  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category
    });
  };
  
  const handlePriceRangeChange = (range) => {
    setFilters({
      ...filters,
      priceRange: range
    });
  };
  
  const handleSortChange = (e) => {
    setFilters({
      ...filters,
      sortBy: e.target.value
    });
  };
  
  return (
    <div className="product-list-page">
      <Navbar />
      
      <div className="product-list-banner">
        <h1>{filters.category === 'all' ? 'All Products' : filters.category}</h1>
      </div>
      
      <div className="product-list-container">
        <div className="product-list-sidebar">
          <div className="filter-section">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map((category, index) => (
                <li 
                  key={index} 
                  className={`category-item ${filters.category === (index === 0 ? 'all' : category) ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(index === 0 ? 'all' : category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-slider">
              <div className="price-range">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1000" 
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange([filters.priceRange[0], parseInt(e.target.value)])}
              />
            </div>
          </div>
        </div>
        
        <div className="product-list-content">
          <div className="product-list-header">
            <div className="product-count">
              {!loading && <span>{products.length} products found</span>}
            </div>
            
            <div className="product-sort">
              <label htmlFor="sort">Sort by:</label>
              <select 
                id="sort" 
                value={filters.sortBy} 
                onChange={handleSortChange}
              >
                <option value="popularity">Popularity</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <Loading text="Loading products..." />
          ) : error ? (
            <div className="product-list-error">{error}</div>
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductListPage; 