import { ReactNode } from 'react';

import { cookies } from 'next/headers';

import { SideBar } from 'features';

type Props = {
  children: ReactNode;
};

const Layout = async ({ children }: Props) => {
  const userCookie = (await cookies()).get('user')?.value;
  let selectedTeamId: string | null = null;

  if (userCookie) {
    try {
      selectedTeamId = JSON.parse(userCookie)?.selectedTeamId ?? null;
    } catch {
      selectedTeamId = null;
    }
  }

  return (
    <>
      <SideBar selectedTeamId={selectedTeamId} />
      {children}
    </>
  );
};

export default Layout;
