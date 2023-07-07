import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'outline';
};

export default function Button({
  className,
  children,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark',
    outline:
      'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    danger:
      'border border-red-500 text-red-500 hover:bg-red-600 bg-transparent hover:text-white',
  };

  const buttonClassName = twMerge(
    `${variantClasses[variant]} w-full appearance-none rounded-lg p-2 text-sm font-medium shadow transition-colors ${className}`
  );

  return (
    <button
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
}
