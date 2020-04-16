import { useIoc } from 'domain/ioc';
import { useMutation, queryCache } from 'react-query';
import { SaveEntry, Entry, DeleteEntry } from 'core/entries';
import { GET_ENTRIES } from 'domain/selectors/entries';

export const useSaveEntry = () => {
  const ioc = useIoc();
  return useMutation((entry: Partial<Entry>) => {
    const service = ioc.resolve<SaveEntry>();
    return service({ entry });
  }, {
    onSuccess() {
      queryCache.refetchQueries(GET_ENTRIES, { force: true });
    },
  });
};

export const useDeleteEntry = () => {
  const ioc = useIoc();
  return useMutation(
    (id: string) => {
      const service = ioc.resolve<DeleteEntry>();
      return service({ id });
    },
    {
      onSuccess() {
        queryCache.refetchQueries(GET_ENTRIES, { force: true });
      },
    },
  );
};
