import { ICursorPaginationResponse, TeamMemberRoles } from 'shared/types';

export interface ITeamStats {
  id: string;
  createdAt: string;
  updatedAt: string;
  totalDocuments: number;
  processingDocuments: number;
  activeDocuments: number;
  archivedDocuments: number;
  failedDocuments: number;
  needsReviewDocuments: number;
  highRiskDocuments: number;
  mediumRiskDocuments: number;
  lowRiskDocuments: number;
  expiringSoonDocuments: number;
  teamId: string;
}

export interface ITeamLogo {
  id: string;
  createdAt: string;
  updatedAt: string;
  fileSize: number;
  mimeType: string;
  url: string;
  width: number;
  height: number;
}

export interface ITeam {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  logo: ITeamLogo | null;
  stats: ITeamStats;
  currentMember: {
    id: string;
    createdAt: string;
    updatedAt: string;
    role: TeamMemberRoles;
    userId: string;
  };
}

export interface ITeamResponse {
  message: string;
  data: {
    team: ITeam;
  };
}

export interface ICreateTeamResponse {
  message: string;
  data: {
    team: ITeam;
    uploadUrl: string | null;
  };
}

export interface IUpdateTeamResponse extends ICreateTeamResponse {}

export interface ITeamsResponse {
  message: string;
  data: {
    pagination: ICursorPaginationResponse;
    teams: ITeam[];
  };
}
