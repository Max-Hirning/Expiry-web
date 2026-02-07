import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  identifier: z
    .string({ message: 'Email or phone number is required' })
    .min(1, { message: 'Email or phone number is required' }),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
