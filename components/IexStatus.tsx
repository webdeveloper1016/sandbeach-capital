import { useQueryClient } from 'react-query';
import { format } from 'date-fns';
import _ from 'lodash';
import ErrorBoundary from '../layout/ErrorBoundary';

const IexStatusComp = (): React.ReactElement => {
  const queryClient = useQueryClient();
  const queries = queryClient
    .getQueryCache()
    .findAll()
    .map((q) => ({ updatedAt: q.state.dataUpdatedAt, hash: q.queryHash }));
  const latest = _.chain(queries)
    .orderBy('updatedAt', 'desc')
    .head()
    .get('updatedAt', null)
    .value() as number;

  if (!latest) {
    return <div />;
  }

  return (
    <div>
      <a href="https://iexcloud.io" className="mx-2 text-green-300 underline">
        IEX Cloud {process.env.NODE_ENV === 'production' ? 'Live' : 'Sandbox'}
      </a>
      <span>{format(latest, 'p')}</span>
    </div>
  );
};

export const IexStatus = () => (
  <ErrorBoundary fallback={<div />}>
    <IexStatusComp />
  </ErrorBoundary>
);
