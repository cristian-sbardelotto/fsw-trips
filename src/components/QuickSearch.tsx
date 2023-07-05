import Image from 'next/image';

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
        <div className='flex flex-col'>
          <Image
            src='/hotel-icon.png'
            alt='Hotel Icon'
            width={35}
            height={35}
          />

          <p className='text-sm text-gray-primary'>Hotel</p>
        </div>

        <div className='flex flex-col'>
          <Image
            src='/farm-icon.png'
            alt='Fazenda Icon'
            width={35}
            height={35}
          />

          <p className='text-sm text-gray-primary'>Fazenda</p>
        </div>

        <div className='flex flex-col'>
          <Image
            src='/cottage-icon.png'
            alt='Chalé Icon'
            width={35}
            height={35}
          />

          <p className='text-sm text-gray-primary'>Chalé</p>
        </div>

        <div className='flex flex-col'>
          <Image
            src='/inn-icon.png'
            alt='Pousada Icon'
            width={35}
            height={35}
          />

          <p className='text-sm text-gray-primary'>Pousada</p>
        </div>
      </div>
    </div>
  );
}
