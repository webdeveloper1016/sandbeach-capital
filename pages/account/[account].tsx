import PortfolioData from '../../components/PortfolioData';
import AccountAnalysis from '../../components/AccountAnalysis';

const IndividualAccountPage = () => {
  return (
    <PortfolioData>
      {(data) => <AccountAnalysis portfolioData={data} />}
    </PortfolioData>
  );
};

export default IndividualAccountPage;
