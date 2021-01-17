import Header from '../components/Header';
import Section from '../components/Section';
import { Table, TableProps } from '../components/Table';

interface TableSectionProps extends TableProps {
  header: string;
  subheader?: string;
}

const TableSection = ({
  data,
  columns,
  header,
  layout,
  subheader,
}: TableSectionProps) => (
  <Section>
    <Header size="text-2xl" content={header} subheader={subheader} />
    <Table columns={columns} data={data} layout={layout} />
  </Section>
);

export default TableSection;
