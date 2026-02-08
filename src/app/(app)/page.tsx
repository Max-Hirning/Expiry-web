import { TeamSelector } from 'features/team';

const Page = () => {
  return (
    <main className="flex !h-full flex-col items-center justify-start overflow-auto p-4 main-position">
      <TeamSelector />
    </main>
  );
};

export default Page;
