import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner"; // A reusable loading component

// eslint-disable-next-line react/prop-types
function RouteGuard({ children, requireAuth }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  // Return a loading spinner or indicator while the authentication state is loading
  if (isLoading) {
    return <LoadingSpinner />; // You can create your own loading spinner component
  }

  // If the route requires authentication and the user is not authenticated, redirect to /login
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to log in for authentication
  }

  // If the route is public but the user is authenticated, redirect them to the home page
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />; // Authenticated users should not access public routes like login/signup
  }

  // If all conditions are satisfied, render the child components
  return children;
}

export default RouteGuard;
