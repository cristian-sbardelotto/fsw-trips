import ptBR from 'date-fns/locale/pt-BR';
import { LegacyRef, forwardRef } from 'react';
import ReactDatePicker, {
  ReactDatePickerProps,
  registerLocale,
} from 'react-datepicker';
import { twMerge } from 'tailwind-merge';

import { InputErrorProps } from '@/types';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBR);

type DatePickerProps = InputErrorProps & ReactDatePickerProps;

function DatePicker(
  { className, error, errorMessage, ...props }: DatePickerProps,
  ref: LegacyRef<HTMLInputElement> | undefined
) {
  const datePickerClassName = twMerge(
    `rounded-lg border border-gray-300 bg-white p-2 text-sm font-normal text-primary-dark placeholder-black placeholder-opacity-20 outline-none transition-all focus:ring-1 focus:ring-primary ${
      error ? 'border-red-500' : ''
    } ${className}`
  );

  return (
    <div className='flex flex-col w-full'>
      <ReactDatePicker
        dateFormat='DD/MM/yyyy'
        locale='pt-BR'
        wrapperClassName='w-full'
        className={datePickerClassName}
        enableTabLoop={false}
        {...props}
      />

      {error && errorMessage && (
        <div className='text-red-500 mt-1 text-xs'>{errorMessage}</div>
      )}
    </div>
  );
}

export default forwardRef(DatePicker);
