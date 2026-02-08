import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { CreateTeamForm } from 'features/team';
import { Button } from 'shared/ui';

const Page = () => {
  return (
    <>
      <header className="flex items-center gap-2 border-b border-input p-4 header-position">
        <Link href="/">
          <Button variant="ghost">
            <ArrowLeft />
          </Button>
        </Link>
        <h1>Create Team</h1>
      </header>
      <main className="flex flex-col items-center justify-start overflow-auto p-8 main-position">
        <CreateTeamForm />
      </main>
    </>
  );
};

export default Page;
