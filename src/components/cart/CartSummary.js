import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartSummary.css';
import Button from '../common/Button';

const CartSummary = ({ cartItems }) => {
  const navigate = useNavigate();
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Shipping cost (you can adjust this logic based on your requirements)
  const shippingCost = subtotal > 100 ? 0 : 10;
  
  // Tax calculation (you can adjust tax rate)
  const taxRate = 0.1; // 10% tax
  const tax = subtotal * taxRate;
  
  // Total amount
  const total = subtotal + shippingCost + tax;
  
  const handleCheckout = () => {
    // Navigate to checkout page
    navigate('/checkout');
  };

  return (
    <div className="cart-summary">
      <h2 className="cart-summary-title">Order Summary</h2>
      
      <div className="cart-summary-row">
        <span>Subtotal ({cartItems.reduce((count, item) => count + item.quantity, 0)} items)</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      <div className="cart-summary-row">
        <span>Shipping</span>
        <span>
          {shippingCost === 0 
            ? 'Free' 
            : `$${shippingCost.toFixed(2)}`}
        </span>
      </div>
      
      <div className="cart-summary-row">
        <span>Estimated Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      
      {shippingCost > 0 && (
        <div className="cart-summary-shipping-note">
          <p>Free shipping on orders over $100</p>
          <p>You're ${(100 - subtotal).toFixed(2)} away from free shipping</p>
        </div>
      )}
      
      <div className="cart-summary-divider"></div>
      
      <div className="cart-summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      
      <Button 
        onClick={handleCheckout} 
        variant="primary" 
        size="large" 
        fullWidth
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CartSummary; 