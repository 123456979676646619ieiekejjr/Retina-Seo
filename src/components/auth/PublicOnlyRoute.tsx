import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PublicOnlyRoute = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect to dashboard if already authenticated
    return <Navigate to="/dashboard" replace />;
  }

  // Render child routes
  return <Outlet />;
};

export default PublicOnlyRoute;