import Image from 'next/image';

type TripHighlightsProps = {
  highlights: string[];
};

export default function TripHighlights({ highlights }: TripHighlightsProps) {
  return (
    <div className='flex flex-col p-5'>
      <h2 className='font-semibold text-primary-dark mb-2'>Destaques</h2>

      <div className='flex flex-wrap gap-y-2'>
        {highlights.map(highlight => (
          <div
            className='flex items-center gap-2 w-1/2'
            key={highlight}
          >
            <Image
              src='/check-icon.png'
              alt='Check Icon'
              width={15}
              height={15}
            />

            <p className='text-xs  text-gray-primary'>{highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
