'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'entities/auth';
import { useUpdateUser } from 'entities/user';
import { useForm } from 'react-hook-form';

import {
  PreferencesFormInput,
  preferencesFormSchema,
  UserPreferencesForm,
} from 'features/user';
import { Button } from 'shared/ui';

export const UserPreferencesWidget = () => {
  const { data, isLoading } = useSession();
  const user = data?.data?.user;

  const form = useForm<PreferencesFormInput>({
    resolver: zodResolver(preferencesFormSchema),
  });

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
  const retrieveDefaultValues = (): Partial<PreferencesFormInput> => {
    if (!user) {
      return {
        inAppNotifications: false,
        emailNotifications: false,
        documentNews: false,
        teamNews: false,
      };
    }

    return {
      inAppNotifications: user.notificationPreferences.inAppNotifications,
      emailNotifications: user.notificationPreferences.emailNotifications,
      documentNews: user.notificationPreferences.documentNews,
      teamNews: user.notificationPreferences.teamNews,
    };
  };

  return (
    <>
      <main className="flex flex-col items-center overflow-auto p-4 main-position">
        <p className="mb-8 text-center text-sm leading-5 text-muted-foreground">
          Here you can set up your notification preferences.
        </p>
        <UserPreferencesForm
          form={form}
          defaultValues={retrieveDefaultValues()}
          disabled={isLoading}
          onSubmit={onSubmit}
        />
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
          disabled={!user || !form.formState.isValid}
          isLoading={isPending}
          className="h-10 rounded-full bg-primary px-8 text-black"
        >
          Save
        </Button>
      </footer>
    </>
  );
};
