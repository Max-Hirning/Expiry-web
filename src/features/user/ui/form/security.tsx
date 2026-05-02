'use client';

import { FC } from 'react';

import { UseFormReturn } from 'react-hook-form';

import { Form, FormElement, FormField, Input } from 'shared/ui';

import { SecurityFormInput } from '../../schemas';

interface IProps {
  form: UseFormReturn<SecurityFormInput>;
  disabled?: boolean;
  onSubmit: (value: SecurityFormInput) => void;
}

export const UserSecurityForm: FC<IProps> = ({ form, disabled, onSubmit }) => {
  return (
    <Form {...form}>
      <form
        id="security-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-[400px] flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormElement label="Current Password" className="max-w-full">
              <Input
                {...field}
                disabled={disabled}
                type="password"
                hidePasswordStrengthChecker
                placeholder="Enter your current password"
              />
            </FormElement>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormElement label="New Password" className="max-w-full">
              <Input
                {...field}
                disabled={disabled}
                type="password"
                placeholder="Enter your new password"
              />
            </FormElement>
          )}
        />

        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormElement label="Confirm New Password" className="max-w-full">
              <Input
                {...field}
                disabled={disabled}
                type="password"
                hidePasswordStrengthChecker
                placeholder="Confirm your new password"
              />
            </FormElement>
          )}
        />
      </form>
    </Form>
  );
};
