import React from 'react';
import './Input.css';

const Input = ({
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  label = '',
  required = false,
  error = '',
  disabled = false,
  className = '',
  min,
  max,
  step
}) => {
  return (
    <div className={`input-container ${className}`}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label} {required && <span className="required-mark">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`input-field ${error ? 'input-error' : ''}`}
        min={min}
        max={max}
        step={step}
      />
      {error && <div className="input-error-message">{error}</div>}
    </div>
  );
};

export default Input; 