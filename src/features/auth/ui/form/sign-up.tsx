'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSignUp } from 'entities/auth';
import { useForm } from 'react-hook-form';

import {
  Button,
  FileUpload,
  Form,
  FormElement,
  FormField,
  Input,
} from 'shared/ui';

import { SignUpInput, signUpSchema } from '../../schemas';

enum Steps {
  GENERAL_INFO,
  PASSWORD,
}

export const SignUpForm = () => {
  const { push } = useRouter();
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      phoneNumber: '',
      fullName: '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const { mutate: signUp, isPending } = useSignUp();
  const [step, setStep] = useState<Steps>(Steps.GENERAL_INFO);

  const onSubmit = (value: SignUpInput) => {
    signUp(
      {
        user: {
          email: value.email,
          phoneNumber: value.phoneNumber,
          fullName: value.fullName,
          password: value.password,
        },
        team: {
          name: value.team,
          // ...(value.teamLogo && {
          //   logo: {
          //     mimeType: value.teamLogo.type,
          //     width: value.teamLogo.width,
          //     height: value.teamLogo.height,
          //     fileSize: value.teamLogo.size,
          //   }
          // })
        },
      },
      {
        onSuccess: () => {
          push('/');
        },
      },
    );
  };

  return (
    <>
      {step === Steps.GENERAL_INFO && (
        <article className="flex flex-col items-center gap-2">
          <h1 className="text-center text-3xl font-normal">
            Complete your profile
          </h1>
          <p className="text-center text-base font-normal">
            Your profile is partially completed. Review the existing
            information,
            <br />
            update it if needed, and fill in the remaining details to proceed.
          </p>
        </article>
      )}
      {step === Steps.PASSWORD && (
        <h1 className="text-center text-3xl font-normal">Create password</h1>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="profile"
          className="flex w-full max-w-96 flex-wrap items-center justify-center gap-4"
        >
          {step === Steps.GENERAL_INFO && (
            <>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormElement label="Full Name" className="max-w-full">
                    <Input {...field} placeholder="John Doe" />
                  </FormElement>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormElement label="Email" className="max-w-full">
                    <Input
                      {...field}
                      type="email"
                      placeholder="fox@email.com"
                    />
                  </FormElement>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormElement label="Phone number" className="max-w-full">
                    <Input {...field} type="tel" placeholder="99229289" />
                  </FormElement>
                )}
              />
              <FormField
                control={form.control}
                name="team"
                render={({ field }) => (
                  <FormElement label="Team Name" className="max-w-full">
                    <Input {...field} placeholder="FOX Inc." />
                  </FormElement>
                )}
              />
              <FormField
                control={form.control}
                name="teamLogo"
                render={({ field }) => (
                  <FormElement label="Team Logo" className="max-w-full">
                    <FileUpload
                      multiple={false}
                      accept="image/jpeg,image/png"
                      onChange={([file]) => {
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                      value={field.value ? [field.value] : []}
                    />
                  </FormElement>
                )}
              />
              <Button
                type="button"
                onClick={async () => {
                  const isValid = await form.trigger([
                    'fullName',
                    'email',
                    'phoneNumber',
                    'team',
                  ]);

                  if (!isValid) {
                    return;
                  }

                  setStep(Steps.PASSWORD);
                }}
                className="flex w-full items-center justify-center text-base"
              >
                Next
              </Button>
            </>
          )}
          {step === Steps.PASSWORD && (
            <>
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
              <div className="flex w-full flex-col gap-4">
                <Button
                  type="submit"
                  isLoading={isPending}
                  className="flex w-full items-center justify-center text-base"
                >
                  Create Profile
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep(Steps.GENERAL_INFO)}
                  className="flex w-full items-center justify-center text-base"
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>
    </>
  );
};
