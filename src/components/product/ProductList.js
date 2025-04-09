import React, { useState, useEffect } from 'react';
import './ProductList.css';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';
import { getProducts } from '../../api/product';

const ProductList = ({ category = null, searchQuery = null, limit = null }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let fetchedProducts;
        
        if (category) {
          // Fetch products by category
          const { getProductsByCategory } = await import('../../api/product');
          fetchedProducts = await getProductsByCategory(category);
        } else if (searchQuery) {
          // Fetch products by search query
          const { searchProducts } = await import('../../api/product');
          fetchedProducts = await searchProducts(searchQuery);
        } else {
          // Fetch all products
          fetchedProducts = await getProducts();
        }
        
        // Apply limit if specified
        const limitedProducts = limit ? fetchedProducts.slice(0, limit) : fetchedProducts;
        
        setProducts(limitedProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [category, searchQuery, limit]);

  if (loading) {
    return <Loading text="Loading products..." />;
  }

  if (error) {
    return <div className="product-list-error">{error}</div>;
  }

  if (products.length === 0) {
    return (
      <div className="product-list-empty">
        <p>No products found.</p>
        {searchQuery && <p>Try a different search term or browse our categories.</p>}
        {category && <p>No products available in this category at the moment.</p>}
      </div>
    );
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList; 