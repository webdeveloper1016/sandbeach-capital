import { AirTableAccountRoutes, NumberDisplayModel } from '../ts';

export const labels: Record<AirTableAccountRoutes, string> = {
  'robinhood-aw': 'All Weather ☔️',
  'robinhood-income': 'Income 💦',
  'bryan-roth': 'Roth 🏝',
  'robinhood-core': 'Core 💎',
  'robinhood-moon': 'Moon 🧪',
  crypto: 'Crypto 🚀',
};

export const subheader: Record<AirTableAccountRoutes, string | null> = {
  'robinhood-aw': null,
  'robinhood-income': null,
  'bryan-roth': null,
  'robinhood-core': null,
  'robinhood-moon': null,
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
  weight?: {
    tgt: NumberDisplayModel;
    actual: NumberDisplayModel;
  };
}

export const AccountBalanceHeader = ({
  accountName,
  balance,
  percChange,
  percClass,
  weight,
}: AccountBalanceHeaderProps) => (
  <div className="mb-5">
    <div className="text-xl">{labels[accountName]}</div>
    {subheader[accountName] && (
      <div className="text-gray-500 text-sm -mt-1 font-extralight">
        {subheader[accountName]}
      </div>
    )}
    <div className="text-2xl md:text-3xl">
      <span>💰 {balance}</span>
      <span className={`text-base ml-3 ${percClass} `}>
        {percClass.includes('green') ? `📈` : `📉`} {percChange}
      </span>
      {weight && (
        <span className="text-base text-gray-400 ml-3">
          ⚖️ ${weight.actual.display}/${weight.tgt.display}
        </span>
      )}
    </div>
  </div>
);
