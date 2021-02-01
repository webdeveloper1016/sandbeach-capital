import { useRouter } from 'next/router';
import useFetchAccount from '../../hooks/useFetchAccount';
import { AirTableStockAccounts } from '../../ts';

const IndividualAccountPage = () => {
  const router = useRouter();
  const { account } = router.query;

  const { data, status } = useFetchAccount(account as AirTableStockAccounts);

  if (status === 'loading' || !data) {
    return <div className="text-green-500">loading...</div>;
  }

  if (status === 'error') {
    return <div className="text-red-500">error...</div>;
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
