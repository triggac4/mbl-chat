import React from 'react';

const Button = ({ 
  children, 
  type = "button", 
  className = "", 
  disabled = false, 
  isLoading = false,
  onClick
}) => {
  const baseClasses = "py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50";
  
  // Default styling is primary button (blue)
  const defaultClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:opacity-50";
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${defaultClasses} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;