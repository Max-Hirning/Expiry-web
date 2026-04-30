import { z } from 'zod';

export const preferencesFormSchema = z
  .object({
    inAppNotifications: z.boolean(),
    emailNotifications: z.boolean(),
    documentNews: z.boolean(),
    teamNews: z.boolean(),
  })
  .partial();

export type PreferencesFormInput = z.infer<typeof preferencesFormSchema>;
