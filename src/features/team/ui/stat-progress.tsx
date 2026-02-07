import { FC } from 'react';

import { ITeam, ITeamStats } from 'entities/team';

import { cn } from 'shared/lib';
import { Tooltip, TooltipContent, TooltipTrigger } from 'shared/ui';

import { teamStatColor, teamStatTitle } from '../constants';

interface IProps {
  team: ITeam;
}

export const TeamStatProgress: FC<IProps> = ({ team }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex h-2 w-full cursor-pointer gap-[2px] overflow-hidden rounded-full">
          {(
            Object.entries(teamStatColor) as [
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
              string,
            ][]
          ).map(([key, color]) => (
            <div
              key={key}
              className={cn(color)}
              style={{
                width: `${Math.round((team.stats[key] / team.stats.totalDocuments) * 100)}%`,
              }}
            />
          ))}
        </div>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="border border-input bg-white shadow-sm"
      >
        <h4>Status</h4>
        <ul>
          {(
            Object.entries(teamStatColor) as [
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
              string,
            ][]
          ).map(([key, color]) => (
            <li key={key} className="flex items-center gap-2">
              <div className={cn('h-2 w-2 rounded-full', color)} />
              <p className="flex-1 text-sm font-normal text-gray-400">
                {teamStatTitle[key]}
              </p>
              <p className="flex items-center gap-[2px]">
                {team.stats[key]}
                <span className="text-gray-400">
                  (
                  {Math.round(
                    (team.stats[key] / (team.stats.totalDocuments || 1)) * 100,
                  )}
                  %)
                </span>
              </p>
            </li>
          ))}
        </ul>
      </TooltipContent>
    </Tooltip>
  );
};
