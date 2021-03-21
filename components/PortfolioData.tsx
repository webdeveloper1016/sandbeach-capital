import React from 'react';
import { useRouter } from 'next/router';
import Status from './Status';
import TotalNetWorth from './TotalNetWorth';
import useFetchPortfolio from '../hooks/useFetchPortfolio';
import { APIPortfolioModel } from '../ts';

interface PortfolioDataProps {
  children: (data: APIPortfolioModel) => React.ReactNode;
}

const PortfolioData = ({ children }: PortfolioDataProps) => {
  const router = useRouter();
  const account = router.query.account;

  const { data, status } = useFetchPortfolio(account);

  return (
    <Status status={status}>
      {data && (
        <div>
          <TotalNetWorth
            portfolioTotal={data.summary.portfolioTotal.val}
            btcPrice={data.summary.btcLast.priceDisplay.val}
          />
          {children(data)}
        </div>
      )}
    </Status>
  );
};

export default PortfolioData;
