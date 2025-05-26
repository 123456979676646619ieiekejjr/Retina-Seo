import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';

const Layout = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Don't show sidebar on public pages
  const isPublicPage = ['/', '/login', '/register'].includes(pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-100 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Navbar />
      
      <div className="flex">
        {isAuthenticated && !isPublicPage && <Sidebar />}
        
        <main className={`flex-1 ${isAuthenticated && !isPublicPage ? 'ml-0 md:ml-64' : ''}`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="container mx-auto px-4 py-8"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;