import { z } from 'zod';

export const profileFormSchema = z
  .object({
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    email: z.email('Invalid email'),
    phoneNumber: z.string().min(1, 'Required'),
  })
  .partial();

export type ProfileFormInput = z.infer<typeof profileFormSchema>;
