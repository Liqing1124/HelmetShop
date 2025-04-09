import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = '',
  fullWidth = false
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button button-${variant} button-${size} ${fullWidth ? 'button-full-width' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button; 