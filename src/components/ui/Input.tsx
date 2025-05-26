import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  description?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, description, ...props }, ref) => {
    const id = props.id || props.name;

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          className={cn(
            'flex h-10 w-full rounded-md border border-gray-300 dark:border-dark-400 bg-white dark:bg-dark-300 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-error-300 focus:ring-error-500',
            className
          )}
          ref={ref}
          id={id}
          {...props}
        />
        {description && !error && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        )}
        {error && <p className="text-sm text-error-600 dark:text-error-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };