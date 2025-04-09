import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import AddressForm from '../components/user/AddressForm';
import Loading from '../components/common/Loading';
import CartSummary from '../components/cart/CartSummary';
import { createOrder } from '../api/order';
import { formatPrice } from '../utils/helper';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [error, setError] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  
  // Load cart items from localStorage
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    if (items.length === 0) {
      // Redirect to cart if no items
      navigate('/cart');
      return;
    }
    
    setCartItems(items);
    
    // Load saved shipping address from localStorage
    const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'));
    if (savedAddress) {
      setShippingAddress(savedAddress);
    }
    
    // Load addresses (in a real app, these would come from an API)
    const userAddresses = JSON.parse(localStorage.getItem('addresses')) || [];
    setAddresses(userAddresses);
    
    // Select default address if available
    const defaultAddress = userAddresses.find(addr => addr.isDefault);
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id);
      setShippingAddress(defaultAddress);
    }
    
    setLoading(false);
  }, [navigate]);
  
  const handleAddressSelect = (addressId) => {
    setSelectedAddressId(addressId);
    const selected = addresses.find(addr => addr.id === addressId);
    if (selected) {
      setShippingAddress(selected);
    }
  };
  
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  
  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const handleSaveAddress = (addressData) => {
    const newAddress = {
      ...addressData,
      id: Date.now() // Simple way to generate unique ID
    };
    
    // Add new address to list
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    
    // Save to localStorage (in a real app, this would be sent to an API)
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    
    // Select the new address
    setSelectedAddressId(newAddress.id);
    setShippingAddress(newAddress);
    
    // Hide the form
    setShowAddressForm(false);
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!shippingAddress) {
      errors.address = 'Please select a shipping address';
    }
    
    if (paymentMethod === 'credit_card') {
      if (!cardInfo.cardNumber.trim()) {
        errors.cardNumber = 'Card number is required';
      } else if (!/^\d{16}$/.test(cardInfo.cardNumber.replace(/\s/g, ''))) {
        errors.cardNumber = 'Invalid card number';
      }
      
      if (!cardInfo.cardName.trim()) {
        errors.cardName = 'Name on card is required';
      }
      
      if (!cardInfo.expiryDate.trim()) {
        errors.expiryDate = 'Expiry date is required';
      } else if (!/^\d{2}\/\d{2}$/.test(cardInfo.expiryDate)) {
        errors.expiryDate = 'Invalid expiry date (MM/YY)';
      }
      
      if (!cardInfo.cvv.trim()) {
        errors.cvv = 'CVV is required';
      } else if (!/^\d{3,4}$/.test(cardInfo.cvv)) {
        errors.cvv = 'Invalid CVV';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const calculateOrderSummary = () => {
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shippingCost = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.1; // 10% tax rate
    const total = subtotal + shippingCost + tax;
    
    return {
      subtotal,
      shippingCost,
      tax,
      total
    };
  };
  
  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        document.getElementsByName(firstErrorField)[0]?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }
    
    try {
      setLoadingOrder(true);
      setError(null);
      
      const { subtotal, shippingCost, tax, total } = calculateOrderSummary();
      
      // Create order object
      const orderData = {
        orderItems: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        shippingAddress,
        paymentMethod,
        paymentDetails: paymentMethod === 'credit_card' ? {
          cardNumber: cardInfo.cardNumber.slice(-4), // Only store last 4 digits
          cardName: cardInfo.cardName
        } : {},
        itemsPrice: subtotal,
        shippingPrice: shippingCost,
        taxPrice: tax,
        totalPrice: total
      };
      
      // Call API to create order
      const createdOrder = await createOrder(orderData);
      
      // Clear cart
      localStorage.removeItem('cart');
      
      // Redirect to order confirmation page
      navigate(`/orders/${createdOrder.id}/confirmation`);
      
      setLoadingOrder(false);
    } catch (err) {
      setError('Error placing order. Please try again.');
      setLoadingOrder(false);
      console.error('Error placing order:', err);
    }
  };
  
  if (loading) {
    return <Loading text="Loading checkout..." />;
  }
  
  return (
    <div className="checkout-page">
      <Navbar />
      
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        
        {error && <div className="checkout-error">{error}</div>}
        
        <div className="checkout-content">
          <div className="checkout-form">
            <div className="checkout-section">
              <h2>Shipping Address</h2>
              
              {formErrors.address && (
                <div className="form-error">{formErrors.address}</div>
              )}
              
              {addresses.length > 0 && (
                <div className="saved-addresses">
                  <h3>Select a Saved Address</h3>
                  
                  <div className="address-options">
                    {addresses.map(address => (
                      <div 
                        key={address.id} 
                        className={`address-option ${selectedAddressId === address.id ? 'selected' : ''}`}
                        onClick={() => handleAddressSelect(address.id)}
                      >
                        <div className="address-option-radio">
                          <input 
                            type="radio" 
                            name="address" 
                            checked={selectedAddressId === address.id}
                            onChange={() => handleAddressSelect(address.id)}
                          />
                        </div>
                        
                        <div className="address-option-details">
                          <p className="address-name">{address.fullName}</p>
                          <p>{address.addressLine1}</p>
                          {address.addressLine2 && <p>{address.addressLine2}</p>}
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                          {address.phone && <p>Phone: {address.phone}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {showAddressForm ? (
                <div className="new-address-form">
                  <h3>Add New Address</h3>
                  <AddressForm 
                    onSubmit={handleSaveAddress}
                    buttonText="Save & Use This Address"
                  />
                  <button 
                    className="cancel-button"
                    onClick={() => setShowAddressForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  size="small"
                  onClick={() => setShowAddressForm(true)}
                >
                  Add New Address
                </Button>
              )}
            </div>
            
            <div className="checkout-section">
              <h2>Payment Method</h2>
              
              <div className="payment-methods">
                <div className="payment-method">
                  <input 
                    type="radio" 
                    id="credit_card" 
                    name="paymentMethod" 
                    value="credit_card"
                    checked={paymentMethod === 'credit_card'}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="credit_card">Credit / Debit Card</label>
                </div>
                
                <div className="payment-method">
                  <input 
                    type="radio" 
                    id="paypal" 
                    name="paymentMethod" 
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={handlePaymentMethodChange}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
              
              {paymentMethod === 'credit_card' && (
                <div className="credit-card-form">
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    label="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={cardInfo.cardNumber}
                    onChange={handleCardInfoChange}
                    error={formErrors.cardNumber}
                  />
                  
                  <Input
                    id="cardName"
                    name="cardName"
                    type="text"
                    label="Name on Card"
                    placeholder="John Doe"
                    value={cardInfo.cardName}
                    onChange={handleCardInfoChange}
                    error={formErrors.cardName}
                  />
                  
                  <div className="card-row">
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      type="text"
                      label="Expiry Date"
                      placeholder="MM/YY"
                      value={cardInfo.expiryDate}
                      onChange={handleCardInfoChange}
                      error={formErrors.expiryDate}
                      className="expiry-input"
                    />
                    
                    <Input
                      id="cvv"
                      name="cvv"
                      type="text"
                      label="CVV"
                      placeholder="123"
                      value={cardInfo.cvv}
                      onChange={handleCardInfoChange}
                      error={formErrors.cvv}
                      className="cvv-input"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="checkout-section">
              <h2>Order Items</h2>
              
              <div className="checkout-items">
                {cartItems.map(item => (
                  <div key={item.id} className="checkout-item">
                    <div className="checkout-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="checkout-item-details">
                      <p className="checkout-item-name">{item.name}</p>
                      <p className="checkout-item-price">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                    <div className="checkout-item-total">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button 
              onClick={handlePlaceOrder} 
              variant="primary" 
              size="large"
              fullWidth
              disabled={loadingOrder}
            >
              {loadingOrder ? 'Processing...' : 'Place Order'}
            </Button>
          </div>
          
          <div className="checkout-sidebar">
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Checkout; 