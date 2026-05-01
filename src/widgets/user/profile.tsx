'use client';

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

    const defaults = retrieveDefaultValues();
    const resolvedFirst = firstName?.trim() || defaults.firstName || '';
    const resolvedLast = lastName?.trim() || defaults.lastName || '';

    updateUser({
      userId: user.id,
      ...(resolvedFirst && resolvedLast
        ? { fullName: `${resolvedFirst} ${resolvedLast}` }
        : {}),
      email,
      phoneNumber,
    });
  };
  const retrieveDefaultValues = (): Partial<ProfileFormInput> => {
    if (!user) {
      return {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      };
    }

    const spaceIndex = user.fullName.indexOf(' ');
    const firstName =
      spaceIndex === -1 ? user.fullName : user.fullName.slice(0, spaceIndex);
    const lastName =
      spaceIndex === -1 ? '' : user.fullName.slice(spaceIndex + 1);

    return {
      firstName,
      lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };
  };

  return (
    <>
      <main className="flex flex-col items-center overflow-auto p-4 main-position">
        <UserProfileForm
          defaultValues={retrieveDefaultValues()}
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
