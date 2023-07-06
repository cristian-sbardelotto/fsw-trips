import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='bg-white-gray p-5 flex justify-center flex-col items-center gap-2'>
      <Image
        src='/fsw-logo.svg'
        alt='Full Stack Week Logo'
        width={133}
        height={23}
      />

      <p className='text-sm font-medium text-primary-dark'>
        Todos os direitos reservados.
      </p>
    </footer>
  );
}
