import ErrorBoundary from '../layout/ErrorBoundary';

const IexStatusComp = (): React.ReactElement => {
  return (
    <div>
      <a href="https://iexcloud.io" className="mx-2 text-green-300 underline">
        IEX Cloud {process.env.NODE_ENV === 'production' ? 'Live' : 'Sandbox'}
      </a>
    </div>
  );
};

export const IexStatus = () => (
  <ErrorBoundary fallback={<div />}>
    <IexStatusComp />
  </ErrorBoundary>
);
