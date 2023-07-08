import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import Button from './Button';
import CurrencyInput from './CurrencyInput';
import DatePicker from './DatePicker';
import Input from './Input';

import { SearchFormProps } from '@/types';

export default function TripSearch() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchFormProps>();

  const router = useRouter();

  function onSubmit(data: SearchFormProps) {
    const searchRouteUrl = `/trips/search?text=${
      data.text
    }&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`;
    router.push(searchRouteUrl);
  }

  return (
    <div className='container mx-auto p-5 bg-world-map bg-cover bg-center bg-no-repeat'>
      <h1 className='font-semibold text-2xl text-primary-dark text-center'>
        Encontre sua próxima <span className='text-primary'>viagem!</span>
      </h1>

      <div className='flex flex-col gap-4 mt-5'>
        <Input
          placeholder='Onde você quer ir?'
          error={!!errors.text}
          {...register('text', {
            required: {
              value: true,
              message: 'Texto é obrigatório.',
            },
          })}
          errorMessage={errors.text?.message}
        />

        <div className='flex gap-4'>
          <Controller
            name='startDate'
            control={control}
            render={({ field }) => (
              <DatePicker
                onChange={field.onChange}
                selected={field.value}
                placeholderText='Data Final'
                className='w-full'
                minDate={new Date()}
              />
            )}
          />

          <Controller
            name='budget'
            control={control}
            render={({ field }) => (
              <CurrencyInput
                allowDecimals={false}
                placeholder='Orçamento'
                onValueChange={field.onChange as any}
                value={field.value}
                onBlur={field.onBlur}
              />
            )}
          />
        </div>

        <Button onClick={() => handleSubmit(onSubmit)()}>Buscar</Button>
      </div>
    </div>
  );
}
