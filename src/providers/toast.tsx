'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ChildrenComponentProps } from '@/types';

export default function ToastProvider({ children }: ChildrenComponentProps) {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
