import { TeamMemberRoles } from 'shared/types';

import { ITeam, ITeamLogo } from './responses';

export interface ICreateTeam extends Required<Pick<ITeam, 'name'>> {
  teamMembers?: {
    userId: string;
    role: TeamMemberRoles;
  }[];
  logo?: Pick<ITeamLogo, 'mimeType' | 'fileSize' | 'width' | 'height'>;
}
export interface IUpdateTeam extends Partial<ICreateTeam> {
  teamMembersUsersToDeleteIds?: string[];
}
