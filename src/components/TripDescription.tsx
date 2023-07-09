type TripDescriptionProps = {
  tripDescription: string;
};

export default function TripDescription({
  tripDescription,
}: TripDescriptionProps) {
  return (
    <div className='flex flex-col p-5 lg:p-0'>
      <h2 className='font-semibold text-primary-dark lg:text-xl'>
        Sobre a viagem
      </h2>

      <p className='text-xs leading-5 text-primary-dark mt-1 lg:mt-5 lg:text-base lg:leading-7'>
        {tripDescription}
      </p>
    </div>
  );
}
