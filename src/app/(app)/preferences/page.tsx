import { UserPreferencesWidget } from 'widgets';

const Page = () => {
  return (
    <>
      <header className="flex flex-col gap-2 px-4 py-4 header-position">
        <h1 className="text-xl font-normal leading-7 text-foreground">
          Preferences
        </h1>
      </header>
      <UserPreferencesWidget />
    </>
  );
};

export default Page;
