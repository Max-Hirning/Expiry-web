'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn } from 'entities/auth';
import { useForm } from 'react-hook-form';

import { Button, Form, FormElement, FormField, Input } from 'shared/ui';

import { SignInInput, signInSchema } from '../../schemas';

export const SignInForm = () => {
  const { push } = useRouter();
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      password: '',
      identifier: '',
    },
  });
  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit = (value: SignInInput) => {
    signIn(value, {
      onSuccess: () => {
        push('/');
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="profile"
        className="flex w-full max-w-96 flex-wrap items-center justify-center gap-4"
      >
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormElement className="max-w-full">
              <Input {...field} type="email" placeholder="Enter your email" />
            </FormElement>
          )}
        />
        <fieldset className="flex w-full flex-col items-end gap-1">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormElement className="max-w-full text-primary">
                <Input
                  {...field}
                  hidePasswordStrengthChecker
                  type="password"
                  placeholder="Enter your password"
                />
              </FormElement>
            )}
          />
          <Link
            href="/auth/forgot-password"
            className="text-small font-medium text-primary"
          >
            Forgot password?
          </Link>
        </fieldset>
        <Button
          type="submit"
          isLoading={isPending}
          className="flex w-full items-center justify-center text-base"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
