import React from 'react';
import { QueryStatus } from 'react-query';
import Skeleton from './Skeleton';
import Error from './Error';

interface StatusProps {
  status: QueryStatus;
  children: React.ReactNode;
}

const Status = ({ status, children }: StatusProps) => {
  if (status === 'loading') {
    return <Skeleton />;
  }

  if (status === 'error') {
    return <Error />;
  }

  return <div>{children}</div>;
};

export default Status;
