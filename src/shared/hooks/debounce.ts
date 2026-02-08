import { useEffect, useMemo, useState } from 'react';

import debounce from 'lodash/debounce';

export const useUpdateSearch = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const [searchState, setSearchState] = useState('');

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setSearchValue(value || undefined);
      }, 500),
    [],
  );

  const updateSearchState = (value: string) => {
    setSearchState(value);
    debouncedUpdate(value);
  };

  useEffect(() => {
    return () => debouncedUpdate.cancel();
  }, [debouncedUpdate]);

  return {
    searchValue,
    searchState,
    setSearchState: updateSearchState, // debounced setter
  };
};
