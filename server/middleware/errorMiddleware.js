export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  console.error(`Error: ${err.message}`);
  console.error(err.stack);
  
  // Handle specific error types
  let error = { ...err };
  error.message = err.message;
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    
    const message = `Duplicate field value: ${field} - ${value}. Please use another value.`;
    error = new Error(message);
    res.status(400);
  }
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(val => val.message);
    const message = `Invalid input data: ${errors.join(', ')}`;
    error = new Error(message);
    res.status(400);
  }
  
  // JSON Web Token error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token. Please log in again.';
    error = new Error(message);
    res.status(401);
  }
  
  // Token expired error
  if (err.name === 'TokenExpiredError') {
    const message = 'Your token has expired. Please log in again.';
    error = new Error(message);
    res.status(401);
  }
  
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};