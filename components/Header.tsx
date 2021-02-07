export interface HeaderProps {
  size:
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl'
    | 'text-5xl';
  content: string | React.ReactElement;
  subheader?: string | React.ReactElement;
  noGutter?: boolean;
}

const Header = ({ size, content, subheader, noGutter }: HeaderProps) => (
  <div className={`${noGutter && subheader ? 'mb-0' : 'mb-2'}`}>
    <div className={`${size} ${noGutter || subheader ? 'mb-0' : 'mb-2'}`}>
      {content}
    </div>
    {subheader && (
      <div className="text-gray-500 text-sm -mt-1 font-extralight">
        {subheader}
      </div>
    )}
  </div>
);

export default Header;
