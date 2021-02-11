type ColorOptionsType = 'blue' | 'yellow';

const setColor = (color: ColorOptionsType) => {
  switch (color) {
    case 'blue':
      return 'border-blue-500';
    case 'yellow':
      return 'border-yellow-500';
    default:
      'border-current';
  }
};

const Pill = ({
  color,
  content,
}: {
  color: 'blue' | 'yellow';
  content: string;
}) => (
  <div
    className={`rounded-full py-1 px-2.5 border text-xs text-center ${setColor(
      color,
    )}`}
  >
    {content}
  </div>
);

export default Pill;
