import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../hooks/useToast';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignupForm: React.FC = () => {
  const { signup } = useAuth();
  const { success, error } = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupFormData>();

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    const result = await signup(data.name, data.email, data.password);
    
    if (result.success) {
      success('Welcome!', 'Your account has been created successfully.');
      navigate('/dashboard');
    } else {
      error('Signup Failed', 'There was an issue creating your account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-text-primary">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Or{' '}
            <Link
              to="/auth/login"
              className="font-medium text-accent hover:text-accent-light transition-colors"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <Input
              id="name"
              type="text"
              label="Full name"
              autoComplete="name"
              placeholder="Enter your full name"
              error={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              })}
            />
            
            <Input
              id="email"
              type="email"
              label="Email address"
              autoComplete="email"
              placeholder="Enter your email"
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
              autoComplete="new-password"
              placeholder="Create a password (min 6 characters)"
              error={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            
            <Input
              id="confirmPassword"
              type="password"
              label="Confirm password"
              autoComplete="new-password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === password || 'Passwords do not match',
              })}
            />
          </div>

          <div>
            <Button
              type="submit"
              loading={isSubmitting}
              className="w-full"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};