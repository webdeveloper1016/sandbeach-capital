import PortfolioData from '../../components/PortfolioData';
import AccountAnalysis from '../../components/AccountAnalysis';

// TODO: add trading view chart popover --> https://www.tradingview.com/widget/mini-chart/
const IndividualAccountPage = () => {
  return (
    <PortfolioData>{(data) => <AccountAnalysis portfolioData={data} />}</PortfolioData>
  );
};

export default IndividualAccountPage;
