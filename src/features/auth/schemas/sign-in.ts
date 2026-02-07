import { z } from 'zod';

import { PASSWORD_MIN_LENGTH } from 'shared/constants';

export const signInSchema = z.object({
  identifier: z
    .string({ message: 'Email or phone number is required' })
    .min(1, { message: 'Email or phone number is required' }),
  password: z
    .string({ message: 'Password is required' })
    .min(PASSWORD_MIN_LENGTH, { message: 'Password is required' }),
});

export type SignInInput = z.infer<typeof signInSchema>;
