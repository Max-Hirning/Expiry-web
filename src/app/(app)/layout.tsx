import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-[192px] bg-black" />
      <main className="fixed right-0 top-0 flex h-full w-[calc(100%-192px)] flex-col items-start justify-start gap-9 overflow-auto bg-white p-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
