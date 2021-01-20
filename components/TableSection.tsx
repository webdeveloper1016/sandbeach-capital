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
    <div className="overflow-x-auto">
      <Header size="text-2xl" content={header} subheader={subheader} />
      <Table columns={columns} data={data} layout={layout} />
    </div>
  </Section>
);

export default TableSection;
