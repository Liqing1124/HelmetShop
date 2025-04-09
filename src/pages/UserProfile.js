import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserProfile.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Profile from '../components/user/Profile';
import AddressForm from '../components/user/AddressForm';
import OrderHistory from '../components/order/OrderHistory';
import Button from '../components/common/Button';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '555-123-4567',
      isDefault: true
    }
  ]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowAddressForm(false);
  };
  
  const handleAddAddress = () => {
    setSelectedAddress(null);
    setShowAddressForm(true);
  };
  
  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setShowAddressForm(true);
  };
  
  const handleDeleteAddress = (addressId) => {
    setAddresses(addresses.filter(address => address.id !== addressId));
  };
  
  const handleSetDefaultAddress = (addressId) => {
    setAddresses(addresses.map(address => ({
      ...address,
      isDefault: address.id === addressId
    })));
  };
  
  const handleSaveAddress = (addressData) => {
    if (selectedAddress) {
      // Update existing address
      setAddresses(addresses.map(address => 
        address.id === selectedAddress.id 
          ? { ...addressData, id: address.id }
          : addressData.isDefault 
            ? { ...address, isDefault: false }
            : address
      ));
    } else {
      // Add new address
      const newAddress = {
        ...addressData,
        id: Date.now() // Simple way to generate unique ID
      };
      
      // If new address is default, update other addresses
      if (newAddress.isDefault) {
        setAddresses([
          newAddress,
          ...addresses.map(address => ({ ...address, isDefault: false }))
        ]);
      } else {
        setAddresses([newAddress, ...addresses]);
      }
    }
    
    setShowAddressForm(false);
  };
  
  return (
    <div className="user-profile-page">
      <Navbar />
      
      <div className="user-profile-container">
        <div className="user-profile-sidebar">
          <div className="user-profile-tabs">
            <button 
              className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <i className="fa fa-user"></i> My Profile
            </button>
            
            <button 
              className={`tab ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => handleTabChange('addresses')}
            >
              <i className="fa fa-map-marker"></i> My Addresses
            </button>
            
            <button 
              className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => handleTabChange('orders')}
            >
              <i className="fa fa-shopping-bag"></i> Order History
            </button>
            
            <button 
              className={`tab ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => handleTabChange('wishlist')}
            >
              <i className="fa fa-heart"></i> Wishlist
            </button>
          </div>
          
          <div className="user-profile-logout">
            <Link to="/login">
              <Button variant="outline" size="small">
                <i className="fa fa-sign-out"></i> Logout
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="user-profile-content">
          {activeTab === 'profile' && (
            <div className="profile-section">
              <Profile />
            </div>
          )}
          
          {activeTab === 'addresses' && (
            <div className="addresses-section">
              <div className="section-header">
                <h2>My Addresses</h2>
                {!showAddressForm && (
                  <Button 
                    variant="primary" 
                    size="small"
                    onClick={handleAddAddress}
                  >
                    <i className="fa fa-plus"></i> Add New Address
                  </Button>
                )}
              </div>
              
              {showAddressForm ? (
                <div className="address-form-container">
                  <h3>{selectedAddress ? 'Edit Address' : 'Add New Address'}</h3>
                  <AddressForm 
                    initialAddress={selectedAddress || {}}
                    onSubmit={handleSaveAddress}
                    buttonText={selectedAddress ? 'Update Address' : 'Save Address'}
                  />
                  <button 
                    className="cancel-button"
                    onClick={() => setShowAddressForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              ) : addresses.length > 0 ? (
                <div className="address-list">
                  {addresses.map(address => (
                    <div 
                      key={address.id} 
                      className={`address-card ${address.isDefault ? 'default' : ''}`}
                    >
                      {address.isDefault && (
                        <div className="default-badge">Default</div>
                      )}
                      
                      <div className="address-info">
                        <p className="address-name">{address.fullName}</p>
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                        <p>{address.country}</p>
                        {address.phone && <p>Phone: {address.phone}</p>}
                      </div>
                      
                      <div className="address-actions">
                        <button 
                          className="edit-address"
                          onClick={() => handleEditAddress(address)}
                        >
                          Edit
                        </button>
                        <button 
                          className="delete-address"
                          onClick={() => handleDeleteAddress(address.id)}
                        >
                          Delete
                        </button>
                        {!address.isDefault && (
                          <button 
                            className="set-default-address"
                            onClick={() => handleSetDefaultAddress(address.id)}
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-addresses">
                  <p>You haven't added any addresses yet.</p>
                </div>
              )}
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="orders-section">
              <OrderHistory />
            </div>
          )}
          
          {activeTab === 'wishlist' && (
            <div className="wishlist-section">
              <h2>My Wishlist</h2>
              <p>Feature coming soon!</p>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UserProfile; 