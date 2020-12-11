interface GridListProps {
  headers: string[];
  children: React.ReactNode;
}

const GridList = ({ headers, children }: GridListProps) => (
  <div>
    <div className={`grid grid-cols-1 md:grid-cols-${headers.length} gap-y-2`}>
      {headers.map((h) => (
        <div className="text-green-500 font-bold" key={h}>
          {h}
        </div>
      ))}
    </div>
    <div
      className={`grid grid-cols-1 md:grid-cols-${headers.length} gap-y-2 divide-y-2 divide-green-500 grid-flow-row auto-rows-max place-content-center`}
    >
      <>{children}</>
    </div>
  </div>
);

export default GridList;
