import React from 'react';
import Status from './Status';
import TotalNetWorth from './TotalNetWorth';
import useFetchPortfolio from '../hooks/useFetchPortfolio';
import { APIPortfolioModel } from '../ts';

interface PortfolioDataProps {
  children: (data: APIPortfolioModel) => React.ReactNode;
}

const PortfolioData = ({ children }: PortfolioDataProps) => {
  const { data, status } = useFetchPortfolio();

  return (
    <Status status={status}>
      {data && (
        <div>
          <TotalNetWorth
            portfolioTotal={data.summary.portfolioTotal.val}
            btcPrice={data.summary.btcLast.priceUsdNumber}
          />
          {children(data)}
        </div>
      )}
    </Status>
  );
};

export default PortfolioData;
