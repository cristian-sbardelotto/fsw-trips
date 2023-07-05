'use client';

import { SessionProvider } from 'next-auth/react';

import { ChildrenComponentProps } from '@/types';

export function NextAuthProvider({ children }: ChildrenComponentProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
