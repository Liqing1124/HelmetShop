import React from 'react';
import { Link } from 'react-router-dom';
import './OrderItem.css';

const OrderItem = ({ item }) => {
  return (
    <div className="order-item">
      <div className="order-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      
      <div className="order-item-details">
        <h3 className="order-item-name">
          <Link to={`/products/${item.productId}`}>{item.name}</Link>
        </h3>
        
        <div className="order-item-info">
          <p className="order-item-price">${item.price.toFixed(2)} x {item.quantity}</p>
          <p className="order-item-total">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderItem; 