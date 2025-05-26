import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full text-center"
      >
        <h1 className="text-6xl font-bold text-primary-600 dark:text-primary-400">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">Page not found</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="w-full sm:w-auto">
              <Home size={16} className="mr-2" />
              Go to Home
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" className="w-full sm:w-auto">
              <Search size={16} className="mr-2" />
              Search Content
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;