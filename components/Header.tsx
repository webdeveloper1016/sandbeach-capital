export interface HeaderProps {
  size: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  content: string | React.ReactElement;
  subheader?: string | React.ReactElement;
  noGutter?: boolean;
}

const Header = ({ size, content, subheader, noGutter }: HeaderProps) => (
  <div className={`${noGutter && subheader ? 'mb-0' : 'mb-2'}`}>
    <div className={`text-${size} ${noGutter || subheader ? 'mb-0' : 'mb-2'}`}>
      {content}
    </div>
    {subheader && <div className="text-gray-500 text-sm -mt-1 font-extralight">{subheader}</div>}
  </div>
);

export default Header;
