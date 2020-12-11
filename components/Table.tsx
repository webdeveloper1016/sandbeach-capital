import React from 'react';
import { useTable } from 'react-table';

interface TableChildrenProp {
  children: React.ReactNode;
}

interface TableHeaderProps {
  columns: {
    accessor: 'string';
    Header: 'string';
  }[];
}

interface TableProps extends TableHeaderProps {
  columns: {
    accessor: 'string';
    label: 'string';
  }[];
  data: Record<string, unknown>[];
}

export const TableHead = ({ headers }: TableHeaderProps) => (
  <thead>
    <tr className="z-20 sticky top-0 text-sm font-semibold text-green-500 p-0">
      {headers.map((h) => (
        <th>{h.label}</th>
      ))}
    </tr>
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
  return (
    <table className="w-full text-left">
      <TableHead columns={columns} />
      <tbody className="align-baseline">
        {data.map((h) => {
          <TableRow>{}</TableRow>;
        })}
        <tr>
          <td className="py-2 pr-2 whitespace-nowrap border-t border-green-500">
            Intro to CSS
          </td>
          <td>Adam</td>
          <td>858</td>
        </tr>
        <tr>
          <td>A Long and Winding Tour</td>
          <td>Adam</td>
          <td>112</td>
        </tr>
        <tr>
          <td>Intro to JavaScript</td>
          <td>Chris</td>
          <td>1,280</td>
        </tr>
      </tbody>
    </table>
  );
};
