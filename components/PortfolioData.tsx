import React from 'react';
import get from 'lodash.get';
import Status from './Status';
import TotalNetWorth from './TotalNetWorth';
import useFetchPortfolio from '../hooks/useFetchPortfolio';
import { PortfolioModelExtended } from '../ts/types';

interface PortfolioDataProps {
  children: (data: PortfolioModelExtended) => React.ReactNode;
}

const PortfolioData = ({ children }: PortfolioDataProps) => {
  const { data, status } = useFetchPortfolio();

  return (
    <Status status={status}>
      {data && (
        <div>
          <TotalNetWorth
            portfolioTotal={data.accounts.totalBalance.val}
            btcPrice={get(data, 'quotes.crypto.BTC.price.val', 0)}
          />
          {children(data)}
        </div>
      )}
    </Status>
  );
};

export default PortfolioData;
