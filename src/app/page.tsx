import { redirect } from 'next/navigation';

const Page = () => {
  redirect('/auth/sign-in');

  return null;
};

export default Page;
