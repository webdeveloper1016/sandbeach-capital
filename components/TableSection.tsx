import Header from '../components/Header';
import Section from '../components/Section';
import { Table, TableProps } from '../components/Table';

interface TableSectionProps extends TableProps {
  header: string;
}

const TableSection = ({ data, columns, header, layout }: TableSectionProps) => (
  <Section>
    <Header size="2xl" content={header} />
    <Table columns={columns} data={data} layout={layout} />
  </Section>
);

export default TableSection;
