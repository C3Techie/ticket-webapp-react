import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const { success, error: showError } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    const result = await login(data.email, data.password);
    
    if (result.success) {
      success('Welcome back!', 'You have been successfully logged in.');
      navigate(from, { replace: true });
    } else {
      showError('Login Failed', result.error || 'Please check your credentials and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-text-primary">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Or{' '}
            <Link
              to="/auth/signup"
              className="font-medium text-accent hover:text-accent-light transition-colors"
            >
              create a new account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              id="email"
              type="email"
              label="Email address"
              autoComplete="email"
              placeholder="demo@example.com"
              error={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            
            <Input
              id="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              placeholder="Enter your password"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </div>

          <div>
            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full"
            >
              Sign in
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-text-muted">
              Demo credentials: <strong>demo@example.com</strong> / <strong>password</strong>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};