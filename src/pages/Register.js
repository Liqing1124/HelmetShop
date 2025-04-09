import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Register.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { register } from '../api/user';
import { isAuthenticated } from '../utils/helper';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from URL parameter or default to home page
  const redirect = location.search ? location.search.split('=')[1] : '/';
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate(redirect);
    }
  }, [navigate, redirect]);
  
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
    
    // Clear general error when form is being edited
    if (error) {
      setError('');
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
    
    if (!userData.password) {
      errors.password = 'Password is required';
    } else if (userData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (userData.password !== userData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
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
      setLoading(true);
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = userData;
      await register(registerData);
      setLoading(false);
      
      // Redirect to login page with success message
      navigate(`/login?redirect=${redirect}&registered=true`);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Registration failed. Please try again.'
      );
      setLoading(false);
    }
  };
  
  return (
    <div className="register-page">
      <Navbar />
      
      <div className="register-container">
        <div className="register-form-container">
          <h1 className="register-title">Create Account</h1>
          
          {error && <div className="register-error">{error}</div>}
          
          <form className="register-form" onSubmit={handleSubmit}>
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
              id="password"
              name="password"
              type="password"
              label="Password"
              value={userData.password}
              onChange={handleChange}
              required
              error={formErrors.password}
            />
            
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={userData.confirmPassword}
              onChange={handleChange}
              required
              error={formErrors.confirmPassword}
            />
            
            <div className="register-terms">
              <p>
                By creating an account, you agree to our{' '}
                <Link to="/terms">Terms of Service</Link> and{' '}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
            
            <div className="register-login-link">
              <p>
                Already have an account?{' '}
                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Register; 