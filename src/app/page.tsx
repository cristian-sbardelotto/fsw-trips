'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const { data } = useSession();

  return (
    <div className='flex justify-around w-screen'>
      <button onClick={() => signIn()}>Login</button>
      <button onClick={() => signOut()}>Sign out</button>

      {data?.user?.name ?? 'Você não logou.'}
    </div>
  );
}
