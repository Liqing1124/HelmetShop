import React, { useState, useEffect } from 'react';
import './Profile.css';
import Button from '../common/Button';
import Input from '../common/Input';
import Loading from '../common/Loading';
import { getUserProfile, updateUserProfile } from '../../api/user';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const profile = await getUserProfile();
        setUserData({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user profile. Please try again later.');
        setLoading(false);
        console.error('Error fetching user profile:', err);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    // Clear success message when form is being edited
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!userData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!userData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (userData.phone && !/^\d{10}$/.test(userData.phone.replace(/[^0-9]/g, ''))) {
      errors.phone = 'Phone number is invalid';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setUpdating(true);
      await updateUserProfile(userData);
      setSuccessMessage('Profile updated successfully!');
      setUpdating(false);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      setUpdating(false);
      console.error('Error updating profile:', err);
    }
  };

  if (loading) {
    return <Loading text="Loading profile..." />;
  }

  return (
    <div className="profile">
      <h2 className="profile-title">My Profile</h2>
      
      {error && <div className="profile-error">{error}</div>}
      {successMessage && <div className="profile-success">{successMessage}</div>}
      
      <form className="profile-form" onSubmit={handleSubmit}>
        <Input
          id="name"
          name="name"
          type="text"
          label="Full Name"
          value={userData.name}
          onChange={handleChange}
          required
          error={formErrors.name}
        />
        
        <Input
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={userData.email}
          onChange={handleChange}
          required
          error={formErrors.email}
        />
        
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Phone Number"
          value={userData.phone}
          onChange={handleChange}
          error={formErrors.phone}
        />
        
        <div className="profile-form-actions">
          <Button 
            type="submit" 
            variant="primary" 
            disabled={updating}
          >
            {updating ? 'Updating...' : 'Update Profile'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Profile; 