import { InputErrorProps } from '@/types';
import ReactCurrencyInput, {
  CurrencyInputProps as ReactCurrencyInputProps,
} from 'react-currency-input-field';

import { twMerge } from 'tailwind-merge';

type CurrencyInputProps = InputErrorProps & ReactCurrencyInputProps;

export default function CurrencyInput({
  className,
  error,
  errorMessage,
  ...props
}: CurrencyInputProps) {
  const currencyInputClassName = twMerge(
    `rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primaryDarker placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary ${
      error ? 'border-red-500' : ''
    } ${className}`
  );

  return (
    <div className='flex flex-col w-full'>
      <ReactCurrencyInput
        lang='pt-BR'
        className={currencyInputClassName}
        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
        {...props}
      />

      {error && errorMessage && (
        <div className='text-red-500 mt-1 text-xs'>{errorMessage}</div>
      )}
    </div>
  );
}
