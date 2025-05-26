import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Generator from './pages/Generator';
import Profile from './pages/Profile';
import Plans from './pages/Plans';
import NotFound from './pages/NotFound';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicOnlyRoute from './components/auth/PublicOnlyRoute';
import Layout from './components/layout/Layout';

function App() {
  const location = useLocation();
  const { isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-100">
        <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          
          {/* Public routes (only accessible when not logged in) */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          
          {/* Protected routes (require authentication) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/plans" element={<Plans />} />
          </Route>
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;