import Image from 'next/image';
import Link from 'next/link';

export default function QuickSearch() {
  return (
    <div className='container mx-auto p-5'>
      <div className='flex items-center'>
        <div className='w-full h-[1px] bg-gray-light' />

        <h2 className='px-5 font-medium text-gray-primary whitespace-nowrap'>
          Tente pesquisar por
        </h2>

        <div className='w-full h-[1px] bg-gray-light' />
      </div>

      <div className='flex items-center justify-between w-full mt-5'>
        <div className='group flex flex-col'>
          <Link
            href='/trips/search?text=Hotel'
            className='flex flex-col items-center hover:text-primary transition-all'
          >
            <Image
              src='/hotel-icon.png'
              alt='Hotel Icon'
              width={35}
              height={35}
              className='group-hover:brightness-50'
            />

            <p className='text-sm text-gray-primary group-hover:text-primary'>
              Hotel
            </p>
          </Link>
        </div>

        <div className='group flex flex-col'>
          <Link
            href='/trips/search?text=Fazenda'
            className='flex flex-col items-center hover:text-primary transition-all'
          >
            <Image
              src='/farm-icon.png'
              alt='Fazenda Icon'
              width={35}
              height={35}
              className='group-hover:brightness-50'
            />

            <p className='text-sm text-gray-primary group-hover:text-primary'>
              Fazenda
            </p>
          </Link>
        </div>

        <div className='group flex flex-col'>
          <Link
            href='/trips/search?text=Chalé'
            className='flex flex-col items-center hover:text-primary transition-all'
          >
            <Image
              src='/cottage-icon.png'
              alt='Chalé Icon'
              width={35}
              height={35}
              className='group-hover:brightness-50'
            />

            <p className='text-sm text-gray-primary group-hover:text-primary'>
              Chalé
            </p>
          </Link>
        </div>

        <div className='group flex flex-col'>
          <Link
            href='/trips/search?text=Pousada'
            className='flex flex-col items-center hover:text-primary transition-all'
          >
            <Image
              src='/inn-icon.png'
              alt='Pousada Icon'
              width={35}
              height={35}
              className='group-hover:brightness-50'
            />

            <p className='text-sm text-gray-primary group-hover:text-primary'>
              Pousada
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
