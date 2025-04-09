import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import Button from '../common/Button';

const ProductCard = ({ product }) => {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Product exists in cart, increase quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Product not in cart, add it
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Optional: Show feedback to user
    alert('Product added to cart!');
  };

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card-image" 
        />
        {product.discount > 0 && (
          <span className="product-card-discount">-{product.discount}%</span>
        )}
      </div>
      
      <div className="product-card-content">
        <h3 className="product-card-title">
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        
        <div className="product-card-rating">
          {Array(5).fill('').map((_, index) => (
            <span 
              key={index} 
              className={`fas fa-star ${index < product.rating ? 'checked' : ''}`}
            ></span>
          ))}
          <span className="product-card-review-count">({product.reviewCount})</span>
        </div>
        
        <div className="product-card-price">
          {product.discount > 0 ? (
            <>
              <span className="product-card-original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="product-card-current-price">
                ${product.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="product-card-current-price">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <Button 
          onClick={addToCart} 
          variant="primary" 
          fullWidth
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard; 