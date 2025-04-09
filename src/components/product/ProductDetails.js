import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { getProductById } from '../../api/product';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const fetchedProduct = await getProductById(id);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
        console.error('Error fetching product details:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Product exists in cart, increase quantity
      cart[existingItemIndex].quantity += quantity;
    } else {
      // Product not in cart, add it
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Navigate to cart page
    navigate('/cart');
  };

  if (loading) {
    return <Loading text="Loading product details..." />;
  }

  if (error || !product) {
    return <div className="product-details-error">{error || "Product not found"}</div>;
  }

  return (
    <div className="product-details">
      <div className="product-details-container">
        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="product-details-info">
          <h1 className="product-details-title">{product.name}</h1>
          
          <div className="product-details-rating">
            {Array(5).fill('').map((_, index) => (
              <span 
                key={index} 
                className={`fa fa-star ${index < product.rating ? 'checked' : ''}`}
              ></span>
            ))}
            <span className="product-details-review-count">({product.reviewCount} reviews)</span>
          </div>
          
          <div className="product-details-price">
            {product.discount > 0 ? (
              <>
                <span className="product-details-original-price">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="product-details-current-price">
                  ${product.price.toFixed(2)}
                </span>
                <span className="product-details-discount">
                  {product.discount}% OFF
                </span>
              </>
            ) : (
              <span className="product-details-current-price">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="product-details-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          
          <div className="product-details-features">
            <h3>Features</h3>
            <ul>
              {product.features && product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="product-details-availability">
            <span className={`product-details-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 
                ? `In Stock (${product.stock} available)` 
                : 'Out of Stock'}
            </span>
          </div>
          
          {product.stock > 0 && (
            <div className="product-details-actions">
              <div className="product-details-quantity">
                <button 
                  className="quantity-btn" 
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="quantity-input"
                />
                <button 
                  className="quantity-btn" 
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              
              <Button 
                onClick={addToCart} 
                variant="primary" 
                size="large"
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 