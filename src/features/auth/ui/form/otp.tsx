'use client';

import { FC, useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { RotateCw } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { cn } from 'shared/lib';
import { MfaTypes } from 'shared/types';
import {
  Button,
  Form,
  FormElement,
  FormField,
  InputOTP,
  InputOTPSlot,
} from 'shared/ui';

import { OtpInput, otpSchema } from '../../schemas';

interface IProps {
  type: MfaTypes;
}

export const OtpForm: FC<IProps> = ({ type }) => {
  const form = useForm<OtpInput>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });
  const [timer, setTimer] = useState<number>(59);
  const [resendCodeAvailable, setResendCodeAvailable] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (!resendCodeAvailable) {
      interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(interval);
            setResendCodeAvailable(true);

            return 59;
          }

          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [resendCodeAvailable]);

  const resendCode = () => {
    setResendCodeAvailable(false);
  };

  const onSubmit = (value: OtpInput) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  return (
    <>
      <article className="flex flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-normal">Confirm with OTP</h1>
        <p className="text-center text-base font-normal">
          Enter the one-time password (OTP) we’ve sent to your email to
          <br />
          continue.
        </p>
      </article>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="profile"
          className="flex w-full max-w-96 flex-wrap items-center justify-center gap-9"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormElement className="flex flex-row justify-center">
                <InputOTP
                  {...field}
                  maxLength={6}
                  className="flex flex-row items-center gap-3"
                >
                  <InputOTPSlot
                    className="!rounded-xl border border-input shadow-sm"
                    index={0}
                  />
                  <InputOTPSlot
                    className="!rounded-xl border border-input shadow-sm"
                    index={1}
                  />
                  <InputOTPSlot
                    className="!rounded-xl border border-input shadow-sm"
                    index={2}
                  />
                  <InputOTPSlot
                    className="!rounded-xl border border-input shadow-sm"
                    index={3}
                  />
                  <InputOTPSlot
                    className="!rounded-xl border border-input shadow-sm"
                    index={4}
                  />
                  <InputOTPSlot
                    className="!rounded-xl border border-input shadow-sm"
                    index={5}
                  />
                </InputOTP>
              </FormElement>
            )}
          />
          <div className="flex w-full flex-col gap-4">
            <Button
              type="submit"
              className="flex w-full items-center justify-center text-base"
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={resendCode}
              disabled={!resendCodeAvailable}
              className={cn(
                'flex w-full items-center justify-center gap-2 text-base',
                type !== MfaTypes.CUSTOM && 'hidden',
              )}
            >
              <RotateCw />
              Didn’t receive an code? 00:{timer}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
