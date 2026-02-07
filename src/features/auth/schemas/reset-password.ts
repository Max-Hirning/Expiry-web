import { z } from 'zod';

import { PASSWORD_MIN_LENGTH } from 'shared/constants';

export const resetPasswordSchema = z.object({
  password: z
    .string({ message: 'Password is required' })
    .min(PASSWORD_MIN_LENGTH, { message: 'Password is required' }),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
