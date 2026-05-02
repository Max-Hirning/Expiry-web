'use client';

import { type } from 'os';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'entities/auth';
import { useUpdateUser, useUpdateUserPassword } from 'entities/user';
import { Save } from 'lucide-react';
import { useForm } from 'react-hook-form';

import {
  SecurityFormInput,
  securityFormSchema,
  UserSecurityForm,
} from 'features/user';
import { Button } from 'shared/ui';

export const UserSecurityWidget = () => {
  const { data, isLoading } = useSession();
  const user = data?.data?.user;

  const form = useForm<SecurityFormInput>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const { mutate: updatePassword, isPending } = useUpdateUserPassword();

  const onReset = () => {
    form.reset();
  };
  const onSubmit = ({ currentPassword, newPassword }: SecurityFormInput) => {
    if (!user) {
      return;
    }

    updatePassword(
      { userId: user.id, oldPassword: currentPassword, password: newPassword },
      {
        onSuccess: () => {
          form.reset();
        },
        onError: error => {
          const statusCode = error.response?.data.statusCode;

          if (statusCode === 409 && error.response?.data.message) {
            form.setError('currentPassword', {
              message: error.response.data.message,
            });
          }
        },
      },
    );
  };

  return (
    <>
      <main className="flex flex-col items-center overflow-auto p-4 main-position">
        <UserSecurityForm
          form={form}
          disabled={isLoading}
          onSubmit={onSubmit}
        />
      </main>

      <footer className="fixed bottom-0 right-0 flex h-[72px] w-[calc(100%-192px)] items-center justify-end gap-4 border-t border-border bg-white/10 px-4 backdrop-blur-sm">
        <Button
          type="reset"
          variant="secondary"
          onClick={onReset}
          disabled={isPending}
          className="h-10 rounded-full px-8 opacity-50"
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={!user || !form.formState.isValid}
          form="edit-profile-form"
          isLoading={isPending}
          className="h-10 rounded-full bg-primary px-8 text-black"
        >
          Save
        </Button>
      </footer>
    </>
  );
};
