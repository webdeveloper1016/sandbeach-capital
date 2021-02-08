import { AirTableAccountRoutes } from '../ts';

export const labels: Record<AirTableAccountRoutes, string> = {
  'm1-emergency': 'M1 Emergency 🏠',
  'm1-taxable': 'M1 Taxable 💎',
  'bryan-roth': 'M1 Roth 🏝',
  crypto: 'Crypto 🚀',
};

export const subheader: Record<AirTableAccountRoutes, string | null> = {
  'm1-taxable': 'Combined view of M1 and Robinhood accounts',
  'bryan-roth': null,
  'm1-emergency': null,
  crypto: null,
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
    {subheader[accountName] && (
      <div className="text-gray-500 text-sm -mt-1 font-extralight">
        {subheader[accountName]}
      </div>
    )}
    <div className="text-2xl md:text-3xl">
      <span>{balance}</span>
      <span className={`text-base ml-2 ${percClass} `}>{percChange}</span>
    </div>
  </div>
);
