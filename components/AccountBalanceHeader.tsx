import { AirTableAccountRoutes } from '../ts';

export const labels: Record<AirTableAccountRoutes, string> = {
  robinhood: 'Robinhood',
  'm1-emergency': 'M1 Emergency',
  'm1-taxable': 'M1 Taxable',
  'bryan-roth': 'M1 Roth',
  'crypto': 'Crypto'
};

export const AccountLabelHeader = ({
  accountName,
}: {
  accountName: AirTableAccountRoutes;
}) => <div className="text-xl">{labels[accountName]}</div>;

interface AccountBalanceHeaderProps {
  accountName: AirTableAccountRoutes;
  balance: string;
  percChange: string;
  percClass: string;
}

export const AccountBalanceHeader = ({
  accountName,
  balance,
  percChange,
  percClass,
}: AccountBalanceHeaderProps) => (
  <div className="mb-5">
    <div className="text-xl">{labels[accountName]}</div>
    <div className="text-2xl md:text-3xl">
      <span>{balance}</span>
      <span className={`text-base ml-2 ${percClass} `}>{percChange}</span>
    </div>
  </div>
);
