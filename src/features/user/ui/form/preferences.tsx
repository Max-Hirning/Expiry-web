'use client';

import { FC } from 'react';

import { Controller, UseFormReturn } from 'react-hook-form';

import { Form, ToggleFormElement } from 'shared/ui';

import { PreferencesFormInput } from '../../schemas';

interface IProps {
  form: UseFormReturn<PreferencesFormInput>;
  disabled?: boolean;
  onSubmit: (value: PreferencesFormInput) => void;
}

export const UserPreferencesForm: FC<IProps> = ({
  form,
  disabled,
  onSubmit,
}) => {
  return (
    <Form {...form}>
      <form
        id="preferences-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[500px] flex-col gap-6"
      >
        <Controller
          control={form.control}
          name="inAppNotifications"
          render={({ field }) => (
            <ToggleFormElement
              label="Get notified via MSP"
              description="Receive notifications right in the MSP portal."
              checked={field.value || false}
              disabled={disabled}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="emailNotifications"
          render={({ field }) => (
            <ToggleFormElement
              label="Get notified via Email"
              description="Receive notifications directly in your inbox."
              checked={field.value || false}
              disabled={disabled}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="teamNews"
          render={({ field }) => (
            <ToggleFormElement
              label="Team news"
              description="Receive updates about activity in your teams."
              checked={field.value || false}
              disabled={disabled}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <Controller
          control={form.control}
          name="documentNews"
          render={({ field }) => (
            <ToggleFormElement
              label="Document news"
              description="Receive updates when documents are changed or shared."
              checked={field.value || false}
              disabled={disabled}
              onCheckedChange={field.onChange}
            />
          )}
        />
      </form>
    </Form>
  );
};
