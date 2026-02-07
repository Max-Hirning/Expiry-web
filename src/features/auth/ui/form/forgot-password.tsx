'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Form, FormElement, FormField, Input } from 'shared/ui';

import { ForgotPasswordInput, forgotPasswordSchema } from '../../schemas';

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      identifier: '',
    },
  });

  const onSubmit = (value: ForgotPasswordInput) => {
    // eslint-disable-next-line no-console
    console.log(value);
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
        <Button
          type="submit"
          className="flex w-full items-center justify-center text-base"
        >
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
};
