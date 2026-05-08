import { useSession } from 'entities/auth';
import { ITeam } from 'entities/team';
import { useUpdateUser } from 'entities/user';

import { useTeamStore } from 'shared/store';

export const useSelectTeam = () => {
  const { selectTeam, selectedTeam } = useTeamStore();
  const { data: session } = useSession();
  const { mutate: updateUser } = useUpdateUser();

  return (team: ITeam) => {
    if (selectedTeam?.id === team.id) {
      return;
    }

    selectTeam(team);

    const userId = session?.data?.user?.id;
    const previousSelected = session?.data?.user?.selectedTeamId;

    if (userId && previousSelected !== team.id) {
      updateUser({ userId, selectedTeamId: team.id });
    }
  };
};
