'use client';

import { useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

import Link from 'next/link';
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
      <Link href='/'>
        <Image
          src='/fsw-logo.svg'
          alt='Full Stack Week Logo Image'
          width={183}
          height={32}
        />
      </Link>

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
            <div className='z-50 absolute top-14 left-0 w-full h-[100px] bg-white rounded-lg shadow-md flex flex-col justify-center items-center'>
              <Link
                href='/my-trips'
                onClick={() => setIsMenuOpen(false)}
              >
                <button className='pb-2 text-primary text-sm font-semibold border-b border-gray-light'>
                  Minhas viagens
                </button>
              </Link>

              <button
                className='pt-2 text-primary text-sm font-semibold'
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
