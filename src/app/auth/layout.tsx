import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-9 overflow-auto bg-white p-10">
      {children}
    </main>
  );
};

export default Layout;
