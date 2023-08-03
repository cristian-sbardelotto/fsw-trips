import { AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

type TripCancellationModalProps = {
  tripName: string;
  onDelete: () => void;
  onCancel: () => void;
};

export default function TripCancellationModal({
  tripName,
  onDelete,
  onCancel,
}: TripCancellationModalProps) {
  return (
    <div className='absolute inset-0 z-50 px-4 lg:p-0 w-full h-screen flex items-center justify-center bg-shadow-transparent'>
      <div className='p-8 rounded-lg shadow-xl bg-gray-200'>
        <div className='mb-3 pb-3 flex justify-between items-center border-b border-gray-light'>
          <h2 className='text-xl font-medium'>{tripName}</h2>

          <button onClick={onCancel}>
            <AiOutlineClose
              className='h-fit'
              size={22}
            />
          </button>
        </div>

        <p className='mb-6'>
          Você tem certeza que deseja excluir a reserva desta viagem?
        </p>

        <div className='flex gap-3 justify-end'>
          <Button
            variant='danger'
            onClick={onDelete}
            className='lg:max-w-[25%] '
          >
            Excluir
          </Button>

          <Button
            onClick={onCancel}
            variant='outline'
            className=' lg:max-w-[25%]'
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
