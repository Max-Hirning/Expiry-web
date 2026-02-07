import Link from 'next/link';

import { Button } from 'shared/ui';

const Page = () => {
  return (
    <>
      <article className="flex flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-normal">Password Updated</h1>
        <p className="text-center text-base font-normal">
          Your new password is set. You can now sign in and continue where you
          left off.
        </p>
      </article>
      <Link href="/auth/sign-in" className="w-full max-w-[374px]">
        <Button className="flex w-full items-center justify-center text-base">
          Back to Log In
        </Button>
      </Link>
    </>
  );
};

export default Page;
