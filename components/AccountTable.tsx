import React from 'react';
import { useTable, useSortBy } from 'react-table';

interface TableHeaderProps {
  headerGroups: any;
}

export interface TableProps {
  columns: {
    accessor: string;
    Header: string;
    Cell?: (
      instance: {
        value: any;
      },
      column: any,
    ) => React.ReactNode;
    style?: React.CSSProperties;
    sortType?: 'alphanumeric' | 'basic' | 'datetime';
  }[];
  data: Record<any, any>[];
}

export const TableHead = ({ headerGroups }: TableHeaderProps) => (
  <thead>
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map((column) => (
          <th
            className="px-4 pt-4 pb-7 border-b-2 border-gray-500 text-left text-sm leading-4 text-green-500 tracking-wider min-table-width"
            {...column.getHeaderProps([
              {
                ...column.getSortByToggleProps(),
                // className: column.className,
                style: column.style,
              },
              // getColumnProps(column),
              // getHeaderProps(column),
            ])}
          >
            {column.render('Header')}
            <span>
              {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
            </span>
          </th>
        ))}
      </tr>
    ))}
  </thead>
);

export const AccountTable = ({ columns, data }: TableProps) => {
  const colMemo = React.useMemo(() => columns, [columns]);
  const dataMemo = React.useMemo(() => data, [data]);
  const tableInstance = useTable(
    { columns: colMemo, data: dataMemo },
    useSortBy,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <div className="border border-current rounded-md">
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden shadow-dashboard pt-3">
          <table className="min-w-full table-auto" {...getTableProps()}>
            <TableHead headerGroups={headerGroups} />
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b border-gray-600 last:border-0 hover:bg-gray-800"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="px-4 py-4 text-sm leading-5 min-w-full mx-8"
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
