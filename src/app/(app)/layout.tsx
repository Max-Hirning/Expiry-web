import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <aside className="fixed left-0 top-0 h-full w-[192px] bg-black" />
      {children}
    </>
  );
};

export default Layout;
