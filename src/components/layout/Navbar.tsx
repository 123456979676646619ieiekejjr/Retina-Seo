import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../ui/Logo';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  // Define navigation links based on auth status
  const navLinks = isAuthenticated
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Generator', path: '/generator' },
        { name: 'Plans', path: '/plans' },
      ]
    : [
        { name: 'Features', path: '/#features' },
        { name: 'Pricing', path: '/#pricing' },
        { name: 'About', path: '/#about' },
      ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark-200/80 backdrop-blur-lg border-b border-gray-200 dark:border-dark-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo className="h-8 w-8" />
            <span className="font-bold text-xl text-primary-600 dark:text-primary-400">Retina SEO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  location.pathname === link.path
                    ? 'text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 focus:outline-none"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-primary-500">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <span className="text-primary-600 dark:text-primary-300 font-medium">
                          {user?.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-200 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-dark-300"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-300"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-300"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200 dark:border-dark-300">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === link.path
                      ? 'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-900/20'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-center text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              <button
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
                className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300"
              >
                {theme === 'dark' ? <Sun size={16} className="mr-2" /> : <Moon size={16} className="mr-2" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;