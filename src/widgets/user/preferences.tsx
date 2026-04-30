'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'entities/auth';
import { useUpdateUser } from 'entities/user';
import { Controller, useForm } from 'react-hook-form';

import { PreferencesFormInput, preferencesFormSchema } from 'features/user';
import { Button, Form, ToggleFormElement } from 'shared/ui';

export const UserPreferencesWidget = () => {
  const { data } = useSession();
  const user = data?.data?.user;

  const form = useForm<PreferencesFormInput>({
    resolver: zodResolver(preferencesFormSchema),
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    form.reset({
      inAppNotifications: user.notificationPreferences.inAppNotifications,
      emailNotifications: user.notificationPreferences.emailNotifications,
      documentNews: user.notificationPreferences.documentNews,
      teamNews: user.notificationPreferences.teamNews,
    });
  }, [user]);

  const { mutate: updateUser, isPending } = useUpdateUser();

  const onReset = () => {
    form.reset();
  };
  const onSubmit = (data: PreferencesFormInput) => {
    if (!user) {
      return;
    }

    updateUser({
      userId: user.id,
      notificationPreferences: {
        inAppNotifications: data.inAppNotifications,
        emailNotifications: data.emailNotifications,
        documentNews: data.documentNews,
        teamNews: data.teamNews,
      },
    });
  };

  return (
    <>
      <main className="flex flex-col items-center overflow-auto p-4 main-position">
        <p className="mb-8 text-center text-sm leading-5 text-muted-foreground">
          Here you can set up your notification preferences.
        </p>
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
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </form>
        </Form>
      </main>
      <footer className="fixed bottom-0 right-0 flex h-[72px] w-[calc(100%-192px)] items-center justify-end gap-4 border-t border-border bg-white/10 px-4 backdrop-blur-sm">
        <Button
          onClick={onReset}
          disabled={isPending}
          type="reset"
          variant="secondary"
          className="h-10 rounded-full px-8 opacity-50"
        >
          Back
        </Button>
        <Button
          type="submit"
          form="preferences-form"
          disabled={!user}
          isLoading={isPending}
          className="h-10 rounded-full bg-primary px-8 text-black"
        >
          Save
        </Button>
      </footer>
    </>
  );
};
