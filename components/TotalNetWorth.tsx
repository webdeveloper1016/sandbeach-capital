import React from 'react';
import { numberFormatter } from '../utils/calc';

interface PortfolioValModel {
  total: number | null;
  btc: number | null;
  display: string;
}

interface TotalNetWorthProps {
  btcPrice: number;
  portfolioTotal: number;
}

const TotalNetWorth = ({ btcPrice, portfolioTotal }: TotalNetWorthProps) => {
  const portfolioValues = React.useMemo<PortfolioValModel>(() => {
    const vals = {
      total: portfolioTotal,
      btc: btcPrice,
      display:
        btcPrice > 0
          ? `${numberFormatter.format(Math.round(portfolioTotal))} / ${
              Math.round((portfolioTotal / btcPrice) * 100 * 100) / 10000
            }`
          : `${numberFormatter.format(Math.round(portfolioTotal))}`,
    };

    return vals;
  }, [btcPrice, portfolioTotal]);

  return (
    <div className="mb-5">
      <div className="md:text-xl md:mb-1">Total Portfolio Value:</div>
      <div className="text-xl md:text-4xl mb-2">
        <span>
          <span className="flex">
            <span className="text-base mr-1 mt-0.5">$</span>
            <span className="">{portfolioValues.display}</span>
            {btcPrice > 0 && <span className="text-sm ml-1 mt-0.5">BTC</span>}
          </span>
        </span>
      </div>
    </div>
  );
};

export default TotalNetWorth;
