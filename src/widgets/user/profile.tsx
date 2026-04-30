'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'entities/auth';
import { useUpdateUser } from 'entities/user';
import { useForm } from 'react-hook-form';

import {
  ProfileFormInput,
  profileFormSchema,
  UserProfileForm,
} from 'features/user';
import { Button } from 'shared/ui';

export const UserProfileWidget = () => {
  const { data, isLoading } = useSession();
  const user = data?.data?.user;

  const form = useForm<ProfileFormInput>({
    resolver: zodResolver(profileFormSchema),
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    const spaceIndex = user.fullName.indexOf(' ');
    const firstName =
      spaceIndex === -1 ? user.fullName : user.fullName.slice(0, spaceIndex);
    const lastName =
      spaceIndex === -1 ? '' : user.fullName.slice(spaceIndex + 1);

    form.reset({
      firstName,
      lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  }, [user]);

  const { mutate: updateUser, isPending } = useUpdateUser();

  const onReset = () => {
    form.reset();
  };
  const onSubmit = ({
    firstName,
    lastName,
    email,
    phoneNumber,
  }: ProfileFormInput) => {
    if (!user) {
      return;
    }

    updateUser({
      userId: user.id,
      fullName: `${firstName} ${lastName}`,
      email,
      phoneNumber,
    });
  };

  return (
    <>
      <main className="flex flex-col items-center overflow-auto p-4 main-position">
        <UserProfileForm form={form} disabled={isLoading} onSubmit={onSubmit} />
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
          disabled={!user}
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
