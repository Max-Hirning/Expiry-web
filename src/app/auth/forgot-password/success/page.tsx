import Link from 'next/link';

import { Button } from 'shared/ui';

const Page = () => {
  return (
    <>
      <article className="flex flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-normal">Reset Link Sent</h1>
        <p className="text-center text-base font-normal">
          We’ve sent a secure link to your email. Follow it to create a new
          password and get back on track.
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
