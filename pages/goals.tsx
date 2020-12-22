import PortfolioData from '../components/PortfolioData';
import Header from '../components/Header';
import Section from '../components/Section';
import TableSection from '../components/TableSection';

const GoalsPage = () => {
  return (
    <PortfolioData>
      {(data) => {
        console.log(data.goals);
        return (
          <div>
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
            <Section>
              <Header size="2xl" content="Savings Goals:" />
              <ul>
                {data.goals.savings.goalStatements.map((q, k) => (
                  <li key={k}>
                    <p className="text-gray-500 text-lg mb-5">{q.goal}</p>
                  </li>
                ))}
              </ul>
            </Section>
            <TableSection
              header="Savings Analysis:"
              columns={[
                { Header: 'Label', accessor: 'label' },
                { Header: 'Amount', accessor: 'value.display' },
                { Header: 'Percent', accessor: 'weight.display' },
              ]}
              data={data.goals.savingsAnalysis}
              layout="fixed"
            />
          </div>
        );
      }}
    </PortfolioData>
  );
};

export default GoalsPage;
