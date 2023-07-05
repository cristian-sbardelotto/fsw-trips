import { ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

export default function Button({ className, children, ...props }: ButtonProps) {
  const buttonClassName = twMerge(
    `appearance-none rounded-lg bg-primary p-2 text-sm font-medium text-white shadow transition-colors hover:bg-primary-dark ${className}`
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
