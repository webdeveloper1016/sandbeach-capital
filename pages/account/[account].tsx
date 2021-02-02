import { useRouter } from 'next/router';
import { AccountViewSkeleton } from '../../components/Skeleton';
import Error from '../../components/Error';
import { AccountBalanceHeader } from '../../components/AccountBalanceHeader';
import useFetchAccount from '../../hooks/useFetchAccount';
import { AirTableStockAccounts } from '../../ts';

const IndividualAccountPage = () => {
  const router = useRouter();
  const account = router.query.account as AirTableStockAccounts;

  const { data, status } = useFetchAccount(account);

  if (status === 'loading' || !data) {
    return <AccountViewSkeleton accountName={account} />;
  }

  if (status === 'error') {
    return <Error />;
  }

  console.log(data);

  return (
    <div>
      <AccountBalanceHeader
        accountName={account}
        balance={data.summary.balance.display}
        percChange={data.summary.dayChange.perc.display}
        percClass={data.summary.dayChange.class}
      />
      <div>list here</div>
    </div>
  );
};

export default IndividualAccountPage;
