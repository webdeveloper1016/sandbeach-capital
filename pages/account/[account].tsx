import { useRouter } from 'next/router';
import _ from 'lodash';
import { Row as SkeletonRow, Title as SkeletonTitle } from '../../components/Skeleton';
import Error from '../../components/Error';
import useFetchAccount from '../../hooks/useFetchAccount';
import { numberFormatter } from '../../utils/calc';
import { AirTableStockAccounts } from '../../ts';

const labels: Record<AirTableStockAccounts, string> = {
  robinhood: 'Robinhood',
  'm1-emergency': 'M1 Emergency',
  'm1-taxable': 'M1 Taxable',
  'bryan-roth': 'M1 Roth',
};

const IndividualAccountPage = () => {
  const router = useRouter();
  const account = router.query.account as AirTableStockAccounts;
  const accountLabel = labels[account];

  const { data, status } = useFetchAccount(account);

  if (status === 'loading' || !data) {
    return (
      <div>
        <div className="mb-5">
          <div className="text-xl">{accountLabel}</div>
          <div className="animate-pulse"><SkeletonTitle /></div>
        </div>
        <div className=" flex space-x-4 animate-pulse">
          <div className="flex-1 space-y-4 py-1 mb-10">
            {_.range(5).map((r) => (
              <SkeletonRow key={r} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return <Error />;
  }

  console.log(data);

  return (
    <div>
      <div className="mb-5">
        <div className="text-xl">{accountLabel}</div>
        <div className="text-2xl md:text-3xl">
          <span>{data.summary.balance.display}</span>
          <span
            className={`text-base ml-2 ${
              data.summary.dayChange.val >= 0
                ? 'text-green-500'
                : 'text-red-500'
            } `}
          >
            {data.summary.dayChange.val >= 0
              ? `+${data.summary.dayChange.display}`
              : data.summary.dayChange.display}
          </span>
        </div>
      </div>
      <div>list here</div>
    </div>
  );
};

export default IndividualAccountPage;
