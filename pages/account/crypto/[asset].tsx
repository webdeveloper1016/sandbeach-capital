import { useRouter } from 'next/router';

const IndividualCryptoAssetPage = () => {
  const router = useRouter();
  const asset = router.query.asset as string;
  return <div>{asset}</div>;
};

export default IndividualCryptoAssetPage;
