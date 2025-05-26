import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Sparkles, 
  CreditCard, 
  Settings,
  History,
  BookMarked,
  Users,
  HelpCircle 
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'SEO Generator', icon: Sparkles, path: '/generator' },
    { name: 'History', icon: History, path: '/dashboard/history' },
    { name: 'Saved Content', icon: BookMarked, path: '/dashboard/saved' },
    { name: 'Subscription', icon: CreditCard, path: '/plans' },
    { name: 'Settings', icon: Settings, path: '/profile' },
  ];

  // Only show these items for certain plans
  if (user?.plan === 'enterprise') {
    navigationItems.splice(4, 0, { 
      name: 'Team Access', 
      icon: Users, 
      path: '/dashboard/team' 
    });
  }

  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-dark-200 border-r border-gray-200 dark:border-dark-300 hidden md:block overflow-y-auto"
    >
      <div className="p-4">
        {/* User info */}
        <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-dark-300">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary-500">
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
            <div>
              <h3 className="font-medium text-sm">{user?.name}</h3>
              <div className="flex items-center mt-1">
                <span className="px-2 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 font-medium">
                  {user?.plan.charAt(0).toUpperCase() + user?.plan.slice(1)}
                </span>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                  {user?.credits} credits
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav>
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-primary-700 bg-primary-50 dark:text-primary-300 dark:bg-primary-900/20'
                      : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300'
                  }`}
                >
                  <item.icon
                    size={18}
                    className={`mr-2 ${
                      location.pathname === item.path
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Help section */}
        <div className="mt-8 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20">
          <div className="flex items-start space-x-3">
            <HelpCircle size={18} className="text-primary-600 dark:text-primary-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-sm text-primary-700 dark:text-primary-300">Need Help?</h4>
              <p className="mt-1 text-xs text-primary-600/80 dark:text-primary-400/80">
                Check our documentation or contact support for assistance.
              </p>
              <a 
                href="#" 
                className="mt-2 inline-block text-xs font-medium text-primary-600 dark:text-primary-400 hover:underline"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;