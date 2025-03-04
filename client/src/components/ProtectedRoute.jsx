import { Navigate, Outlet } from 'react-router-dom';
import { useCheckAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const {isAuthenticated} = useCheckAuth();
  
  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // If logged in, render child routes
  return <Outlet />;
};

export default ProtectedRoute;