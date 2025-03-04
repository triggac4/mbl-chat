import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  label,
  placeholder = "",
  required = false,
  error = null,
  minLength,
  className = "",
}) => {
  const baseClasses = "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2";
  const stateClasses = error 
    ? "border-red-500 focus:ring-red-500" 
    : "focus:ring-blue-500";

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-gray-700 font-medium mb-2"
        >
          {label}
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
        minLength={minLength}
        className={`${baseClasses} ${stateClasses} ${className}`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
Input.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  minLength: PropTypes.number,
  className: PropTypes.string,
};

export default Input;