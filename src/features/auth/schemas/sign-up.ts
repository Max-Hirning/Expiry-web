import { z } from 'zod';

export const signUpSchema = z.object({
  email: z
    .email({ message: 'Email is required' })
    .min(1, { message: 'Email is required' }),
  password: z
    .string({ message: 'Password is required' })
    .min(1, { message: 'Password is required' }),
  phoneNumber: z
    .string({ message: 'Phone number is required' })
    .min(1, { message: 'Phone number is required' }),
  fullName: z
    .string({ message: 'Full name is required' })
    .min(1, { message: 'Full name is required' }),
  team: z.string().optional(),
  teamLogo: z
    .custom<File>(val => typeof File !== 'undefined' && val instanceof File)
    .optional(),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
