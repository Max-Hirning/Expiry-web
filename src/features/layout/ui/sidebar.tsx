'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from 'shared/lib';
import { useTeamStore } from 'shared/store';

import { bottomNavItems, mainNavItems } from '../constants';

export const SideBar = () => {
  const { selectedTeam } = useTeamStore();
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <aside className="fixed left-0 top-0 flex h-full w-[192px] flex-col border-r border-[#27272a] bg-[#0c0a09] p-2">
      <div className="flex flex-col gap-0">
        <h1 className="px-3 py-2 text-lg font-bold tracking-[3px] text-white">
          Expiry
        </h1>
        {selectedTeam && (
          <div className="mb-2 flex items-center gap-3 rounded-2xl bg-white px-4">
            <img
              src={selectedTeam.logo?.url}
              width={56}
              height={56}
              alt={`${selectedTeam.name} logo`}
            />
            <p className="text-base font-semibold">{selectedTeam.name}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-0.5 px-0">
        <p className="flex h-8 items-center px-2 text-[10px] uppercase text-[#a1a1aa] opacity-70">
          {selectedTeam?.name ?? 'Menu'}
        </p>
        {mainNavItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex h-10 w-full items-center gap-2 rounded-full px-3 text-sm transition-colors',
              isActive(href)
                ? 'border border-[rgba(255,56,187,0.8)] bg-[#292524] font-medium text-[#fafafa] drop-shadow-[0px_1px_3px_rgba(255,255,255,0.18),0px_1px_10px_rgba(255,255,255,0.15)]'
                : 'font-normal text-[#a1a1aa] hover:bg-[#1c1917] hover:text-[#fafafa]',
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-0.5 px-0">
        <p className="flex h-8 items-center px-2 text-[10px] uppercase text-[#a1a1aa] opacity-70">
          Global
        </p>
        {bottomNavItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex h-10 w-full items-center gap-2 rounded-full px-3 text-sm font-normal text-[#a1a1aa] transition-colors hover:bg-[#1c1917] hover:text-[#fafafa]"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
};
