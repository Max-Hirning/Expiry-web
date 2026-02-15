import { ReactNode } from 'react';

import { SideBar } from 'features';

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <SideBar />
      {children}
    </>
  );
};

export default Layout;
