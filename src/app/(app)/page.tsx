import { TagsList, TagsListFilters, TeamSelector } from 'features';

const Page = () => {
  return (
    <>
      <header className="sticky top-0 flex !h-fit flex-col gap-4 p-4 header-position">
        <div className="relative h-[62px]">
          <TeamSelector />
        </div>
        <TagsListFilters />
      </header>
      <main className="flex !h-[calc(100%-158px)] flex-col overflow-auto p-4 pt-0 main-position">
        <TagsList />
      </main>
    </>
  );
};

export default Page;
