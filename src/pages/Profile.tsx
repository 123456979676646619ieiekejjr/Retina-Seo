import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Key, Bell, CreditCard, ShieldCheck } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

type ProfileFormData = {
  name: string;
  email: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  
  const profileForm = useForm<ProfileFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });
  
  const passwordForm = useForm<PasswordFormData>();
  
  const { watch: watchPassword } = passwordForm;
  const newPassword = watchPassword('newPassword');
  
  const handleProfileUpdate = async (data: ProfileFormData) => {
    setIsUpdating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success message would go here
    
    setIsUpdating(false);
  };
  
  const handlePasswordUpdate = async (data: PasswordFormData) => {
    setIsUpdating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Success message would go here
    
    setIsUpdating(false);
    passwordForm.reset();
  };

  const tabContent = {
    profile: (
      <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)}>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary-500">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <span className="text-primary-600 dark:text-primary-300 font-medium text-3xl">
                    {user?.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <div>
              <Button variant="outline" size="sm">
                Change Avatar
              </Button>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                JPG, GIF or PNG. Max size 2MB.
              </p>
            </div>
          </div>

          <Input
            label="Full Name"
            error={profileForm.formState.errors.name?.message}
            {...profileForm.register('name', { 
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
          />

          <Input
            label="Email Address"
            type="email"
            error={profileForm.formState.errors.email?.message}
            {...profileForm.register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />

          <div className="pt-4">
            <Button 
              type="submit" 
              isLoading={isUpdating}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </form>
    ),
    password: (
      <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)}>
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="Current Password"
              type={showCurrentPassword ? 'text' : 'password'}
              error={passwordForm.formState.errors.currentPassword?.message}
              {...passwordForm.register('currentPassword', { 
                required: 'Current password is required',
              })}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              error={passwordForm.formState.errors.newPassword?.message}
              {...passwordForm.register('newPassword', { 
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="relative">
            <Input
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              error={passwordForm.formState.errors.confirmPassword?.message}
              {...passwordForm.register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === newPassword || 'Passwords do not match'
              })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              isLoading={isUpdating}
            >
              Update Password
            </Button>
          </div>
        </div>
      </form>
    ),
    notifications: (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Product Updates</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive emails about new features and improvements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-500 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Usage Reports</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Weekly reports about your account usage and activity</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-500 peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Marketing Emails</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Promotional offers, discounts, and marketing materials</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-dark-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-dark-500 peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Button>
            Save Preferences
          </Button>
        </div>
      </div>
    ),
    billing: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Current Plan</h3>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 border border-primary-100 dark:border-primary-800">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-primary-700 dark:text-primary-300">
                  {user?.plan.charAt(0).toUpperCase() + user?.plan.slice(1)} Plan
                </p>
                <p className="text-sm text-primary-600/80 dark:text-primary-400/80 mt-1">
                  Renews on May 12, 2023
                </p>
              </div>
              <Link to="/plans">
                <Button variant="outline" size="sm">
                  Change Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Methods</h3>
          <div className="bg-white dark:bg-dark-300 rounded-lg border border-gray-200 dark:border-dark-400 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-16 bg-gray-100 dark:bg-dark-400 rounded flex items-center justify-center mr-4">
                <CreditCard className="text-gray-600 dark:text-gray-300" size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Visa ending in 4242</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2025</p>
              </div>
            </div>
            <div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-4">
            Add Payment Method
          </Button>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Billing History</h3>
          <div className="bg-white dark:bg-dark-300 rounded-lg border border-gray-200 dark:border-dark-400 overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-dark-400">
              <thead className="bg-gray-50 dark:bg-dark-400">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-dark-300 divide-y divide-gray-200 dark:divide-dark-400">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    Apr 12, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    $19.99
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 text-right">
                    <a href="#" className="hover:underline">View</a>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    Mar 12, 2023
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    $19.99
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300">
                      Paid
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 text-right">
                    <a href="#" className="hover:underline">View</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ),
    security: (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Two-Factor Authentication</h3>
          <div className="bg-gray-50 dark:bg-dark-300 rounded-lg p-4 border border-gray-200 dark:border-dark-400">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Protect your account with 2FA</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Add an extra layer of security to your account by requiring both your password and a verification code.
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Active Sessions</h3>
          <div className="space-y-3">
            <div className="bg-white dark:bg-dark-300 rounded-lg border border-gray-200 dark:border-dark-400 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-success-100 dark:bg-success-900/20 rounded-full flex items-center justify-center mr-3">
                      <ShieldCheck className="h-4 w-4 text-success-600 dark:text-success-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Current Session</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Chrome on macOS • 192.168.1.105
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" disabled>
                  Current
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-dark-300 rounded-lg border border-gray-200 dark:border-dark-400 p-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-gray-100 dark:bg-dark-400 rounded-full flex items-center justify-center mr-3">
                      <ShieldCheck className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Mobile App</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        iPhone 13 • Last active 2 days ago
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-error-600 dark:text-error-400 hover:text-error-700 dark:hover:text-error-300 hover:bg-error-50 dark:hover:bg-error-900/20">
                  Revoke
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Activity</h3>
          <div className="bg-white dark:bg-dark-300 rounded-lg border border-gray-200 dark:border-dark-400 p-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Key className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Password Changed</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your password was changed on Apr 5, 2023
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Mail className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email Verified</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your email was verified on Mar 15, 2023
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <User className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Account Created</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Your account was created on Mar 10, 2023
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: ShieldCheck },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="md:w-64 flex-shrink-0"
        >
          <Card>
            <CardContent className="p-4">
              <nav>
                <ul className="space-y-1">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'text-primary-700 bg-primary-50 dark:text-primary-300 dark:bg-primary-900/20'
                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-dark-300'
                        }`}
                      >
                        <tab.icon
                          size={18}
                          className={`mr-2 ${
                            activeTab === tab.id
                              ? 'text-primary-600 dark:text-primary-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        />
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1"
        >
          <Card>
            <CardHeader>
              <CardTitle>{tabs.find(tab => tab.id === activeTab)?.label}</CardTitle>
              <CardDescription>
                {activeTab === 'profile' && 'Update your personal information and profile settings'}
                {activeTab === 'password' && 'Change your password and manage security settings'}
                {activeTab === 'notifications' && 'Manage your notification preferences and settings'}
                {activeTab === 'billing' && 'Manage your subscription, payment methods, and billing history'}
                {activeTab === 'security' && 'Configure your security settings and active sessions'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tabContent[activeTab as keyof typeof tabContent]}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;