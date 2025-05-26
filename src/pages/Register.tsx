import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, AlertCircle, Facebook, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/Card';
import { useAuth } from '../hooks/useAuth';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { register: registerUser, socialLogin } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setRegisterError(null);
    
    try {
      await registerUser(data.email, data.password, data.name);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setRegisterError(error.message);
      } else {
        setRegisterError('Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(true);
    setRegisterError(null);
    
    try {
      await socialLogin(provider);
      navigate('/dashboard');
    } catch (error) {
      setRegisterError(`Failed to login with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="space-y-1 text-center">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your information to get started
            </p>
          </CardHeader>
          <CardContent>
            {registerError && (
              <div className="mb-4 p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 text-error-600 dark:text-error-400 mr-2 shrink-0 mt-0.5" />
                <p className="text-sm text-error-700 dark:text-error-300">{registerError}</p>
              </div>
            )}

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  className="w-full"
                  onClick={() => handleSocialLogin('google')}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={isLoading}
                  className="w-full"
                  onClick={() => handleSocialLogin('facebook')}
                >
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300 dark:border-dark-400" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-dark-200 px-2 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Name"
                  placeholder="John Doe"
                  error={errors.name?.message}
                  {...register('name', { 
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  error={errors.email?.message}
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    error={errors.password?.message}
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-9 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword', { 
                    required: 'Please confirm your password',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                />

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <a 
                      href="#" 
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a 
                      href="#" 
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <Button 
                  type="submit" 
                  fullWidth={true}
                  isLoading={isLoading}
                >
                  Create Account
                </Button>
              </form>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;