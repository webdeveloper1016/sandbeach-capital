import { useRouter } from 'next/router';
import _ from 'lodash';
import { Row as SkeletonRow } from '../../components/Skeleton';
import Error from '../../components/Error';
import useFetchAccount from '../../hooks/useFetchAccount';
import { AirTableStockAccounts } from '../../ts';

const IndividualAccountPage = () => {
  const router = useRouter();
  const { account } = router.query;

  const { data, status } = useFetchAccount(account as AirTableStockAccounts);

  if (status === 'loading' || !data) {
    return (
      <div>
        <div className="mb-5">
          <h3 className="text-gray-500 text-lg">Account: {account}</h3>
        </div>
        <div className=" flex space-x-4">
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
        <h3 className="text-gray-500 text-lg">Account: {account}</h3>
      </div>
      <pre className="text-gray-500 my-8">{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
};

export default IndividualAccountPage;
