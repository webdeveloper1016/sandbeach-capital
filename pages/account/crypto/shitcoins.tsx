import { useRouter } from 'next/router';

const ShitcoinsPage = () => {
  const router = useRouter();
  const asset = router.query.asset as string;
  return <div>shitcoins here</div>;
};

export default ShitcoinsPage;