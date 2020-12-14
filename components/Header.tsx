interface HeaderProps {
  size: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  content: string;
  subheader?: string;
  noGutter?: boolean;
}
const Header = ({ size, content, subheader, noGutter }: HeaderProps) => (
  <div className={`${noGutter && subheader ? 'mb-0' : 'mb-2'}`}>
    <div className={`text-${size} ${noGutter || subheader ? 'mb-0' : 'mb-2'}`}>
      {content}
    </div>
    {subheader && <div className="text-gray-600 text-sm font-extralight">{subheader}</div>}
  </div>
);

export default Header;
