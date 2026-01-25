import { SignInForm } from 'features';

const Page = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-9 bg-white">
      <h1 className="text-center text-3xl font-normal">Log In</h1>
      <SignInForm />
    </main>
  );
};

export default Page;
