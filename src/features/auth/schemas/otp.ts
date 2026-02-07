import { z } from 'zod';

import { OTP_CODE_LENGTH } from 'shared/constants';

export const otpSchema = z.object({
  otp: z
    .string({ message: 'Otp code is required' })
    .length(OTP_CODE_LENGTH, { message: 'Invalid otp code' }),
});

export type OtpInput = z.infer<typeof otpSchema>;
