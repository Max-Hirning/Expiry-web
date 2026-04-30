'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'entities/auth';
import { useUpdateUser } from 'entities/user';
import { useForm } from 'react-hook-form';

import { ProfileFormInput, profileFormSchema } from 'features/user';
import { Button, Form, FormElement, FormField, Input } from 'shared/ui';

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
        <Form {...form}>
          <form
            id="edit-profile-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-[500px] flex-col gap-4"
          >
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormElement label="First name" className="max-w-full">
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="First name"
                    />
                  </FormElement>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormElement label="Last name" className="max-w-full">
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Last name"
                    />
                  </FormElement>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormElement label="User email" className="max-w-full">
                  <Input
                    {...field}
                    type="email"
                    disabled={isLoading}
                    placeholder="email@example.com"
                  />
                </FormElement>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormElement label="Phone number" className="max-w-full">
                  <Input
                    {...field}
                    type="tel"
                    disabled={isLoading}
                    placeholder="Phone number"
                  />
                </FormElement>
              )}
            />
          </form>
        </Form>
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
