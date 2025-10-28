import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon: Icon, className = '', ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            className={`
              w-full px-3 py-2 bg-bg-card border rounded-md
              text-text-primary placeholder-text-muted
              focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
              transition-all duration-200
              ${Icon ? 'pl-10' : ''}
              ${error ? 'border-red-500' : 'border-color-border'}
              ${className}
            `}
            {...props}
          />
          {Icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Icon size={16} className="text-text-muted" />
            </div>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';