import Image from 'next/image';

type TripHighlightsProps = {
  highlights: string[];
};

export default function TripHighlights({ highlights }: TripHighlightsProps) {
  return (
    <div className='flex flex-col p-5 lg:p-0 lg:mt-12'>
      <h2 className='font-semibold text-primary-dark mb-2 lg:text-xl'>
        Destaques
      </h2>

      <div className='flex flex-wrap gap-y-2 lg:mt-5'>
        {highlights.map(highlight => (
          <div
            className='flex items-center gap-2 w-1/2 lg:gap-3'
            key={highlight}
          >
            <Image
              src='/check-icon.png'
              alt='Check Icon'
              width={15}
              height={15}
            />

            <p className='text-xs text-gray-primary lg:text-base'>
              {highlight}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
