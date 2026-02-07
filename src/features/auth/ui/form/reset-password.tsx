'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button, Form, FormElement, FormField, Input } from 'shared/ui';

import { ResetPasswordInput, resetPasswordSchema } from '../../schemas';

export const ResetPasswordForm = () => {
  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (value: ResetPasswordInput) => {
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
          name="password"
          render={({ field }) => (
            <FormElement className="max-w-full text-primary">
              <Input
                {...field}
                type="password"
                placeholder="Enter your password"
              />
            </FormElement>
          )}
        />
        <Button
          type="submit"
          className="flex w-full items-center justify-center text-base"
        >
          Create Password
        </Button>
      </form>
    </Form>
  );
};
