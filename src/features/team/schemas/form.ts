import { z } from 'zod';

import { TeamMemberRoles } from 'shared/types';

export const createTeamSchema = z.object({
  name: z
    .string({ message: 'Team name is required' })
    .min(1, { message: 'Team name is required' }),
  teamMembers: z.array(
    z.object({
      userId: z.uuid({ message: 'User id is required' }),
      role: z.enum(TeamMemberRoles),
      fullName: z
        .string({ message: 'Team member is required' })
        .min(1, { message: 'Team member is required' }),
    }),
  ),
  logo: z
    .custom<File>(val => typeof File !== 'undefined' && val instanceof File)
    .optional(),
});
export const updateTeamSchema = createTeamSchema
  .extend({
    teamMembersUsersToDeleteIds: z.array(z.uuid()),
  })
  .partial();

export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type UpdateTeamInput = z.infer<typeof updateTeamSchema>;
