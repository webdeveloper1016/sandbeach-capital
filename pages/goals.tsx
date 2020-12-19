import PortfolioData from '../components/PortfolioData';
import Header from '../components/Header';
import Section from '../components/Section';

const GoalsPage = () => {
  return (
    <PortfolioData>
      {(data) => {
        return (
          <Section>
            <Header size="2xl" content="Quotes to Remember:" />
            <ul>
              {data.goals.quotes.map((q, k) => (
                <li key={k}>
                  <p className="text-gray-500 text-lg mb-5">{q.quote}</p>
                </li>
              ))}
            </ul>
          </Section>
        );
      }}
    </PortfolioData>
  );
};

export default GoalsPage;
