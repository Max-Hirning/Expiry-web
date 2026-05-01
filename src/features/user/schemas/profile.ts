import { z } from 'zod';

export const profileFormSchema = z
  .object({
    firstName: z.string().min(1, 'Required'),
    lastName: z.string().min(1, 'Required'),
    email: z.email('Invalid email'),
    phoneNumber: z.string().min(1, 'Required'),
    avatar: z
      .custom<File>(val => typeof File !== 'undefined' && val instanceof File)
      .optional(),
  })
  .partial()
  .refine(data => Object.values(data).some(v => v !== undefined && v !== ''), {
    message: 'At least one field is required',
  });

export type ProfileFormInput = z.infer<typeof profileFormSchema>;
