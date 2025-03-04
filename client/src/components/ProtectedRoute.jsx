import { Navigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const ProtectedRoute = () => {
  const user = getCurrentUser();
  
  // If not logged in, redirect to login page
  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }
  
  // If logged in, render child routes
  return <Outlet />;
};

export default ProtectedRoute;