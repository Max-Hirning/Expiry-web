import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';

import { cn } from 'shared/lib';
import { TanStackQueryProvider } from 'shared/providers';

import 'app/styles/global.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Expiry',
};

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={cn(urbanist.className, 'h-screen w-screen')}>
        <TanStackQueryProvider>{children}</TanStackQueryProvider>
      </body>
    </html>
  );
};

export default Layout;
