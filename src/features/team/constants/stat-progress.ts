import { ITeamStats } from 'entities/team';

const teamStatColor: Record<
  keyof Pick<
    ITeamStats,
    | 'processingDocuments'
    | 'activeDocuments'
    | 'archivedDocuments'
    | 'failedDocuments'
    | 'needsReviewDocuments'
    | 'highRiskDocuments'
    | 'mediumRiskDocuments'
    | 'lowRiskDocuments'
    | 'expiringSoonDocuments'
  >,
  string
> = {
  processingDocuments: 'bg-blue-500',
  activeDocuments: 'bg-green-500',
  archivedDocuments: 'bg-yellow-500',
  failedDocuments: 'bg-red-500',
  needsReviewDocuments: 'bg-yellow-500',
  highRiskDocuments: 'bg-red-500',
  mediumRiskDocuments: 'bg-purple-500',
  lowRiskDocuments: 'bg-blue-500',
  expiringSoonDocuments: 'bg-yellow-500',
};

const teamStatTitle: Record<
  keyof Pick<
    ITeamStats,
    | 'processingDocuments'
    | 'activeDocuments'
    | 'archivedDocuments'
    | 'failedDocuments'
    | 'needsReviewDocuments'
    | 'highRiskDocuments'
    | 'mediumRiskDocuments'
    | 'lowRiskDocuments'
    | 'expiringSoonDocuments'
  >,
  string
> = {
  processingDocuments: 'Processing documents',
  activeDocuments: 'Active documents',
  archivedDocuments: 'Archived documents',
  failedDocuments: 'Failed documents',
  needsReviewDocuments: 'Needs review documents',
  highRiskDocuments: 'High risk documents',
  mediumRiskDocuments: 'Medium risk documents',
  lowRiskDocuments: 'Low risk documents',
  expiringSoonDocuments: 'Expiring soon documents',
};

export { teamStatColor, teamStatTitle };
