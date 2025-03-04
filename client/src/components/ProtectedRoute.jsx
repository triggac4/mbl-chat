import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { useCheckAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useCheckAuth();

  // If not logged in, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If logged in, render child routes
  return  children ;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
