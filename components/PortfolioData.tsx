import React from 'react';
import get from 'lodash.get';
import Status from './Status';
import PageTitle from './PageTitle';
import useFetchPortfolio from '../hooks/useFetchPortfolio';
import { numberFormatter } from '../utils/calc';
import { PortfolioModelExtended } from '../ts/types';

interface PortfolioDataProps {
  children: (data: PortfolioModelExtended) => React.ReactNode;
}

const PortfolioData = ({ children }: PortfolioDataProps) => {
  const { data, status } = useFetchPortfolio();
  const btcToPort = React.useMemo(() => {
    const btc = get(data, 'quotes.crypto.BTC.price.val');
    if (btc) {
      return (
        Math.round((data.accounts.totalBalance.val / btc) * 100 * 100) / 10000
      );
    }
    return null;
  }, [data]);

  return (
    <Status status={status}>
      {data && (
        <div>
          <PageTitle
            title="Total Portfolio Value:"
            subtitle={
              <span>
                <span className="flex">
                  <span className="text-base mr-1 mt-1">$</span>
                  <span className="">{`${numberFormatter.format(
                    Math.round(data.accounts.totalBalance.val),
                  )} / ${btcToPort}`}</span>
                  <span className="text-sm ml-1 mt-1">BTC</span>
                </span>
              </span>
            }
          />
          {children(data)}
        </div>
      )}
    </Status>
  );
};

export default PortfolioData;
