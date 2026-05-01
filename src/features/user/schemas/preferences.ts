import { z } from 'zod';

export const preferencesFormSchema = z
  .object({
    inAppNotifications: z.boolean(),
    emailNotifications: z.boolean(),
    documentNews: z.boolean(),
    teamNews: z.boolean(),
  })
  .partial()
  .refine(data => Object.values(data).some(v => v !== undefined), {
    message: 'At least one preference must be set',
  });

export type PreferencesFormInput = z.infer<typeof preferencesFormSchema>;
