import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistory.css';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { getUserOrders } from '../../api/order';
import { formatDate, formatPrice } from '../../utils/helper';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await getUserOrders();
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch orders. Please try again later.');
        setLoading(false);
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading text="Loading order history..." />;
  }

  if (error) {
    return <div className="order-history-error">{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="order-history-empty">
        <p>You have no previous orders.</p>
        <Link to="/products">
          <Button variant="primary">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="order-history">
      <h2 className="order-history-title">Order History</h2>
      
      <div className="order-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-card-header">
              <div className="order-card-info">
                <p className="order-id">Order #{order.id}</p>
                <p className="order-date">{formatDate(order.createdAt)}</p>
              </div>
              
              <div className={`order-status order-status-${order.status.toLowerCase()}`}>
                {order.status}
              </div>
            </div>
            
            <div className="order-card-items">
              {order.items.map(item => (
                <div key={item.id} className="order-card-item">
                  <div className="order-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-quantity">x{item.quantity}</div>
                  <div className="order-item-price">{formatPrice(item.price)}</div>
                </div>
              ))}
            </div>
            
            <div className="order-card-footer">
              <div className="order-total">
                <span>Total:</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
              
              <Link to={`/orders/${order.id}`}>
                <Button variant="outline" size="small">View Details</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory; 