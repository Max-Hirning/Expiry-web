import { ForgotPasswordForm } from 'features';

const Page = () => {
  return (
    <>
      <article className="flex flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-normal">Reset Password</h1>
        <p className="text-center text-base font-normal">
          Enter your email to reset the password
        </p>
      </article>
      <ForgotPasswordForm />
    </>
  );
};

export default Page;
