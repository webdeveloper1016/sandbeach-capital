import Header from '../components/Header';
import Section from '../components/Section';
import { AccountTable, TableProps } from '../components/AccountTable';

interface TableSectionProps extends TableProps {
  header: string;
  subheader?: string;
}

const TableSection = ({
  data,
  columns,
  header,
  subheader,
}: TableSectionProps) => (
  <Section noBorder>
    <Header size="text-2xl" content={header} subheader={subheader} />
    <AccountTable columns={columns} data={data} />
  </Section>
);

export default TableSection;
