type TripDescriptionProps = {
  tripDescription: string;
};

export default function TripDescription({
  tripDescription,
}: TripDescriptionProps) {
  return (
    <div className='flex flex-col p-5'>
      <h2 className='font-semibold text-primary-dark'>Sobre a viagem</h2>

      <p className='text-xs leading-5 text-primary-dark mt-1'>
        {tripDescription}
      </p>
    </div>
  );
}
