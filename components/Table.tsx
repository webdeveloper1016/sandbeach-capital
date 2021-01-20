import React from 'react';
import { useTable } from 'react-table';

interface TableHeaderProps {
  headerGroups: any;
}

export interface TableProps {
  columns: {
    accessor: string;
    Header: string;
  }[];
  data: Record<any, any>[];
  layout?: 'fixed' | 'auto'
}

export const TableHead = ({ headerGroups }: TableHeaderProps) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr
        className="z-20 sticky top-0 text-sm font-semibold text-green-500 p-0"
        {...headerGroup.getHeaderGroupProps()}
      >
        {headerGroup.headers.map((column) => (
          <th className="px-2 md:px-0" {...column.getHeaderProps()}>{column.render('Header')}</th>
        ))}
      </tr>
    ))}
  </thead>
);

export const Table = ({ columns, data, layout="auto" }: TableProps) => {
  const colMemo = React.useMemo(() => columns, [columns]);
  const dataMemo = React.useMemo(() => data, [data]);
  const tableInstance = useTable({ columns: colMemo, data: dataMemo });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table className={`w-full text-left table-auto md:table-${layout}`} {...getTableProps()}>
      <TableHead headerGroups={headerGroups} />
      <tbody className="align-baseline" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td className="px-2 md:px-0 pt-1 min-w-full" {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
