import Pill from './Pill';
import { PercChangeModel } from '../ts';

export const SymbolNameCell = ({
  value,
}: {
  value: { symbol: string; name: string };
}) => (
  <div className="flex flex-col">
    <span className="text-base">{value.symbol}</span>
    <span className="text-xs truncate sb-max-w-xs">{value.name}</span>
  </div>
);

export const TagCell = ({ value }: { value: string }) => (
  <div className="flex">
    <Pill color="blue" content={value} />
  </div>
);

export const TagListCell = ({ value }: { value: string[] }) => (
  <div className="flex">
    {value.map((v) => (
      <span className="mr-1 last:mr-0" key={v}>
        <Pill color="yellow" content={v} />
      </span>
    ))}
  </div>
);

export const PercChangeCell = ({ value }: { value: PercChangeModel }) => (
  <div className={value.class}>{value.perc.display}</div>
);
