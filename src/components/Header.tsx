'use client';

import { useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

import { AiOutlineMenu } from 'react-icons/ai';

function handleLogin() {
  signIn();
}

function handleLogout() {
  signOut();
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data, status } = useSession();
  const isUserLogged = status === 'authenticated';

  function handleOpenMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className='container mx-auto px-5 h-[93px] flex justify-between items-center'>
      <Image
        src='/fsw-logo.svg'
        alt='Full Stack Week Logo Image'
        width={183}
        height={32}
      />

      {isUserLogged && data?.user ? (
        <div className='flex items-center gap-3 border border-gray-light p-3 rounded-full relative'>
          <AiOutlineMenu
            size={16}
            onClick={handleOpenMenu}
            className='cursor-pointer'
          />

          <Image
            src={data.user.image!}
            alt={`${data.user.image!} Image`}
            width={35}
            height={35}
            className='rounded-full shadow-md'
          />

          {isMenuOpen && (
            <div className='flex flex-col justify-center items-center absolute top-14 left-0 w-full h-full bg-white rounded shadow-md'>
              <button
                className='text-primary text-sm font-semibold'
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className='text-primary text-sm font-semibold'
        >
          Login
        </button>
      )}
    </header>
  );
}
