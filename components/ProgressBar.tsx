export const ProgressBar = ({ progress, title }: { progress: number, title: string }) => {
  return (
    <div className="relative pt-1">
      <div>{title}</div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
        <div
          style={{ width: `${progress}%` }}
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"
        ></div>
      </div>
    </div>
  );
};
