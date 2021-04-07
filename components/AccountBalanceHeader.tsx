import { NumberDisplayModel } from '../ts';

interface AccountBalanceHeaderProps {
  nickname: string;
  subheader?: string;
  balance: string;
  percChange: string;
  percClass: string;
  weight?: {
    tgt: NumberDisplayModel;
    actual: NumberDisplayModel;
  };
}

export const AccountBalanceHeader = ({
  nickname,
  subheader,
  balance,
  percChange,
  percClass,
  weight,
}: AccountBalanceHeaderProps) => (
  <div className="mb-5">
    <div className="text-xl">{nickname}</div>
    {subheader && (
      <div className="text-gray-500 text-sm -mt-1 font-extralight">
        {subheader}
      </div>
    )}
    <div className="text-2xl md:text-3xl">
      <span className="max-w-sm">💰 {balance}</span>
      <span className={`text-base max-w-sm ml-3 ${percClass} `}>
        {percChange && (percClass.includes('green') ? `📈 ` : `📉 `)}
        {percChange}
      </span>
      {weight && (
        <span className="text-base max-w-sm text-gray-400 ml-3">
          {weight.tgt.val ? `⚖️ ${weight.actual.display}/${weight.tgt.display}` : `⚖️ ${weight.actual.display}`}
        </span>
      )}
    </div>
  </div>
);
