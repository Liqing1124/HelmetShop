import React, { useState } from 'react';
import './AddressForm.css';
import Button from '../common/Button';
import Input from '../common/Input';

const AddressForm = ({ 
  initialAddress = {}, 
  onSubmit, 
  buttonText = 'Save Address',
  isSubmitting = false 
}) => {
  const [address, setAddress] = useState({
    fullName: initialAddress.fullName || '',
    addressLine1: initialAddress.addressLine1 || '',
    addressLine2: initialAddress.addressLine2 || '',
    city: initialAddress.city || '',
    state: initialAddress.state || '',
    zipCode: initialAddress.zipCode || '',
    country: initialAddress.country || 'United States',
    phone: initialAddress.phone || '',
    isDefault: initialAddress.isDefault || false
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress({
      ...address,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    
    if (!address.fullName.trim()) {
      validationErrors.fullName = 'Full name is required';
    }
    
    if (!address.addressLine1.trim()) {
      validationErrors.addressLine1 = 'Address is required';
    }
    
    if (!address.city.trim()) {
      validationErrors.city = 'City is required';
    }
    
    if (!address.state.trim()) {
      validationErrors.state = 'State is required';
    }
    
    if (!address.zipCode.trim()) {
      validationErrors.zipCode = 'ZIP code is required';
    } else if (!/^\d{5}(-\d{4})?$/.test(address.zipCode)) {
      validationErrors.zipCode = 'Invalid ZIP code format';
    }
    
    if (!address.country.trim()) {
      validationErrors.country = 'Country is required';
    }
    
    if (address.phone && !/^\d{10}$/.test(address.phone.replace(/[^0-9]/g, ''))) {
      validationErrors.phone = 'Invalid phone number format';
    }
    
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(address);
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <Input
        id="fullName"
        name="fullName"
        type="text"
        label="Full Name"
        value={address.fullName}
        onChange={handleChange}
        required
        error={errors.fullName}
      />
      
      <Input
        id="addressLine1"
        name="addressLine1"
        type="text"
        label="Address Line 1"
        value={address.addressLine1}
        onChange={handleChange}
        required
        error={errors.addressLine1}
      />
      
      <Input
        id="addressLine2"
        name="addressLine2"
        type="text"
        label="Address Line 2 (Optional)"
        value={address.addressLine2}
        onChange={handleChange}
        error={errors.addressLine2}
      />
      
      <div className="address-form-row">
        <Input
          id="city"
          name="city"
          type="text"
          label="City"
          value={address.city}
          onChange={handleChange}
          required
          error={errors.city}
          className="address-form-city"
        />
        
        <Input
          id="state"
          name="state"
          type="text"
          label="State"
          value={address.state}
          onChange={handleChange}
          required
          error={errors.state}
          className="address-form-state"
        />
        
        <Input
          id="zipCode"
          name="zipCode"
          type="text"
          label="ZIP Code"
          value={address.zipCode}
          onChange={handleChange}
          required
          error={errors.zipCode}
          className="address-form-zip"
        />
      </div>
      
      <Input
        id="country"
        name="country"
        type="text"
        label="Country"
        value={address.country}
        onChange={handleChange}
        required
        error={errors.country}
      />
      
      <Input
        id="phone"
        name="phone"
        type="tel"
        label="Phone Number"
        value={address.phone}
        onChange={handleChange}
        error={errors.phone}
      />
      
      <div className="address-form-checkbox">
        <input
          id="isDefault"
          name="isDefault"
          type="checkbox"
          checked={address.isDefault}
          onChange={handleChange}
        />
        <label htmlFor="isDefault">Set as default address</label>
      </div>
      
      <div className="address-form-actions">
        <Button 
          type="submit" 
          variant="primary" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm; 