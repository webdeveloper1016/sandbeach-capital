import Status from './Status';
import PageTitle from './PageTitle';
import useFetchPortfolio from '../hooks/useFetchPortfolio';
import { PortfolioModelExtended } from '../ts/types';

interface PortfolioDataProps {
  children: (data: PortfolioModelExtended) => React.ReactNode;
}

const PortfolioData = ({ children }: PortfolioDataProps) => {
  const { data, status } = useFetchPortfolio();

  return (
    <Status status={status}>
      {data && (
        <div>
          <PageTitle
            title="Total Portfolio Value:"
            subtitle={data.accounts.totalBalance.display}
          />
          {children(data)}
        </div>
      )}
    </Status>
  );
};

export default PortfolioData;
