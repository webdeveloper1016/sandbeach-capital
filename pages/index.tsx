import Header from '../components/Header';
import useFetchPortfolio from '../hooks/useFetchPortfolio';

const HomePage = () => {
  const { data, status } = useFetchPortfolio();

  if (status === 'loading') {
    return <div className="text-green-500">loading...</div>;
  }

  if (status === 'error') {
    return <div className="text-red-500">error...</div>;
  }

  console.log(data);

  return (
    <div>
      <div className="mb-5">
        <Header size="2xl" content="Total Portfolio Value:" />
        <Header size="5xl" content={data.totalBalance.display} noGutter />
      </div>
      <div className="mb-5">
        <Header size="2xl" content="By Time Horizon:" />
        <div className="grid grid-cols-3 gap-4">
          <div>Category</div>
          <div>Balance</div>
          <div>Weight</div>
          <>
            {data.categorySummary.map((c) => (
              <>
                <div>{c.label}</div>
                <div>{c.value.display}</div>
                <div>{c.weight.display}</div>
              </>
            ))}
          </>
        </div>
      </div>
      <div className="mb-5">
        <Header size="2xl" content="By Sector:" />
        <div className="grid grid-cols-3 gap-4">
          <div>Sector</div>
          <div>Balance</div>
          <div>Weight</div>
          <>
            {data.portfolioSectorWeights.map((c) => (
              <>
                <div>{c.sector}</div>
                <div>{c.value.display}</div>
                <div>{c.weight.display}</div>
              </>
            ))}
          </>
        </div>
      </div>
      <div className="mb-5">
        <Header size="2xl" content="By Sector (ex-ST):" />
        <div className="grid grid-cols-3 gap-4">
          <div>Sector</div>
          <div>Balance</div>
          <div>Weight</div>
          <>
            {data.longTermRetireSectorWeights.map((c) => (
              <>
                <div>{c.sector}</div>
                <div>{c.value.display}</div>
                <div>{c.weight.display}</div>
              </>
            ))}
          </>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
