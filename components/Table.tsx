import React from 'react';
import { useTable } from 'react-table';

interface TableChildrenProp {
  children: React.ReactNode;
}

interface TableHeaderProps {
  headerGroups: any;
}

interface TableProps {
  columns: {
    accessor: string;
    Header: string;
  }[];
  data: Record<any, any>[];
}

export const TableHead = ({ headerGroups }: TableHeaderProps) => (
  <thead>
    {
      // Loop over the header rows
      headerGroups.map((headerGroup) => (
        // Apply the header row props
        <tr
          className="z-20 sticky top-0 text-sm font-semibold text-green-500 p-0"
          {...headerGroup.getHeaderGroupProps()}
        >
          {
            // Loop over the headers in each row
            headerGroup.headers.map((column) => (
              // Apply the header cell props
              <th {...column.getHeaderProps()}>
                {
                  // Render the header
                  column.render('Header')
                }
              </th>
            ))
          }
        </tr>
      ))
    }
  </thead>
);

export const TableRow = ({ children }: TableChildrenProp) => (
  <tr>{children}</tr>
);

export const TableCell = ({ children }: TableChildrenProp) => (
  <td className="py-2 pr-2 whitespace-nowrap border-t border-green-500">
    {children}
  </td>
);

export const Table = ({ columns, data }: TableProps) => {
  const colMemo = React.useMemo(() => columns, [columns])
  const dataMemo = React.useMemo(() => data, [data])
  const tableInstance = useTable({ columns: colMemo, data: dataMemo });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table className="w-full text-left" {...getTableProps()}>
      <TableHead headerGroups={headerGroups} />
      <tbody className="align-baseline" {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {
                  // Loop over the rows cells
                  row.cells.map((cell) => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {
                          // Render the cell contents
                          cell.render('Cell')
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
