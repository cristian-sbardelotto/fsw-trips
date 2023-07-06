import { NextAuthProvider } from '@/providers/auth';
import { Poppins } from 'next/font/google';
import './globals.css';

import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
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
        <NextAuthProvider>
          <Header />

          {children}

          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
