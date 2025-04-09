import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { login } from '../api/user';
import { isAuthenticated } from '../utils/helper';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from URL parameter or default to home page
  const redirect = location.search ? location.search.split('=')[1] : '/';
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
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
    setCredentials({
      ...credentials,
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
    
    if (!credentials.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!credentials.password) {
      errors.password = 'Password is required';
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
      await login(credentials);
      setLoading(false);
      
      // Redirect to intended page or home page
      navigate(redirect);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page">
      <Navbar />
      
      <div className="login-container">
        <div className="login-form-container">
          <h1 className="login-title">Login</h1>
          
          {error && <div className="login-error">{error}</div>}
          
          <form className="login-form" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={credentials.email}
              onChange={handleChange}
              required
              error={formErrors.email}
            />
            
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              value={credentials.password}
              onChange={handleChange}
              required
              error={formErrors.password}
            />
            
            <Button 
              type="submit" 
              variant="primary" 
              size="large"
              fullWidth
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            
            <div className="login-register-link">
              <p>
                Don't have an account?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                  Sign Up
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

export default Login; 