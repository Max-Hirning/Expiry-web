'use client';

import { FC } from 'react';

import { IUser, useGetUsersInfiniteScroll } from 'entities/user';
import { Trash } from 'lucide-react';

import { useUpdateSearch } from 'shared/hooks';
import { TeamMemberRoles } from 'shared/types';
import { Button, SearchSelect } from 'shared/ui';

interface IProps {
  assignee: {
    userId: string;
    role: TeamMemberRoles;
    fullName: string;
  };
  value: {
    userId: string;
    role: TeamMemberRoles;
    fullName: string;
  }[];
  onChange: (
    payload: {
      userId: string;
      role: TeamMemberRoles;
      fullName: string;
    }[],
  ) => void;
  index: number;
}

export const TeamMemberForm: FC<IProps> = ({
  assignee,
  index,
  value,
  onChange,
}) => {
  const { searchState, searchValue, setSearchState } = useUpdateSearch();
  const {
    data: usersData,
    isLoading,
    ...restUsersData
  } = useGetUsersInfiniteScroll({
    page: 1,
    perPage: 15,
    search: searchValue,
    omitUsersIds: value
      .map(({ userId }) => userId)
      .filter(userId => userId !== assignee.userId),
  });
  const users = usersData?.pages.map(({ data }) => data.users).flat(1) || [];

  const teamMembers = [...value];

  return (
    <div className="flex w-full items-center gap-4">
      <SearchSelect<Omit<IUser, 'unReadNotifications'>>
        {...restUsersData}
        data={users}
        setSearch={setSearchState}
        search={searchState}
        buttonLabel={() => assignee.fullName.toLowerCase()}
        placeholder="Select member"
        searchPlaceholder="Search member"
        selectionType="single"
        disabled={isLoading}
        elLabel={({ fullName }) => fullName}
        elIsSelected={({ id }) => value.some(({ userId }) => userId === id)}
        onSelect={({ id, fullName }) => {
          teamMembers[index].userId = id;
          teamMembers[index].fullName = fullName;
          onChange(teamMembers);
        }}
      />
      <SearchSelect<TeamMemberRoles>
        {...restUsersData}
        data={Object.values(TeamMemberRoles)}
        buttonLabel={() => assignee.role.toLowerCase()}
        selectionType="single"
        placeholder="Select member role"
        searchPlaceholder="Search member role"
        disabled={isLoading}
        elLabel={teamMemberRole => teamMemberRole.toLowerCase()}
        elIsSelected={teamMemberRole =>
          value.some(({ role }) => role === teamMemberRole)
        }
        onSelect={teamMemberRole => {
          teamMembers[index].role = teamMemberRole;
          onChange(teamMembers);
        }}
      />
      <Button
        variant="ghost"
        onClick={() => {
          teamMembers.splice(index, 1);
          onChange(teamMembers);
        }}
      >
        <Trash className="text-destructive" />
      </Button>
    </div>
  );
};
