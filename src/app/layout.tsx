import { NextAuthProvider } from '@/providers/auth';
import { Poppins } from 'next/font/google';
import './globals.css';

import { ChildrenComponentProps } from '@/types';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'FSW Trips',
  description: 'Sistema de reserva de viagens',
};

export default function RootLayout({ children }: ChildrenComponentProps) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
