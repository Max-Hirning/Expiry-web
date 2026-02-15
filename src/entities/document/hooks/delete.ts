import { useMutation } from '@tanstack/react-query';

import { QueryKeys } from 'shared/constants';
import { queryClient } from 'shared/lib';

import { deleteDocument } from '../api';
import { IGetDocumentParams } from '../types';

export const useDeleteDocument = () => {
  return useMutation({
    onSuccess(data) {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_DOCUMENTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_TEAMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_TEAMS],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_INFINITE_DOCUMENTS],
      });
    },
    onError(error) {
      console.error(error);
    },
    mutationFn: (params: IGetDocumentParams) => deleteDocument(params),
  });
};
