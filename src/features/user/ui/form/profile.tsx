'use client';

import { FC } from 'react';

import { UseFormReturn } from 'react-hook-form';

import { Form, FormElement, FormField, Input } from 'shared/ui';

import { ProfileFormInput } from '../../schemas';
import { AvatarUpload } from './avatar-upload';

interface IProps {
  form: UseFormReturn<ProfileFormInput>;
  defaultValues?: Partial<ProfileFormInput>;
  disabled?: boolean;
  onSubmit: (value: ProfileFormInput) => void;
  avatarUrl?: string;
  fullName: string;
  onDeleteAvatar?: () => void;
}

export const UserProfileForm: FC<IProps> = ({
  defaultValues,
  form,
  disabled,
  onSubmit,
  avatarUrl,
  fullName,
  onDeleteAvatar,
}) => {
  return (
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
                  value={field.value || defaultValues?.firstName}
                  disabled={disabled}
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
                  value={field.value || defaultValues?.lastName}
                  disabled={disabled}
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
                value={field.value || defaultValues?.email}
                disabled={disabled}
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
                value={field.value || defaultValues?.phoneNumber}
                disabled={disabled}
                placeholder="Phone number"
              />
            </FormElement>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormElement
              label="Profile Photo (optional)"
              className="max-w-full"
            >
              <AvatarUpload
                value={field.value}
                onChange={field.onChange}
                avatarUrl={avatarUrl}
                fullName={fullName}
                onDeleteAvatar={onDeleteAvatar}
              />
            </FormElement>
          )}
        />
      </form>
    </Form>
  );
};
