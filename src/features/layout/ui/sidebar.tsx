'use client';

import { useTeamStore } from 'shared/store';

export const SideBar = () => {
  const { selectedTeam } = useTeamStore();

  return (
    <aside className="fixed left-0 top-0 flex h-full w-[192px] flex-col gap-4 bg-black p-2">
      <h1 className="text-lg font-bold tracking-[3px] text-white">Expiry</h1>
      {selectedTeam && (
        <div className="flex items-center gap-3 rounded-2xl bg-white px-4">
          <img
            src={selectedTeam.logo?.url}
            width={56}
            height={56}
            alt={`${selectedTeam.name} logo`}
          />
          <p className="text-base font-semibold">{selectedTeam.name}</p>
        </div>
      )}
    </aside>
  );
};
