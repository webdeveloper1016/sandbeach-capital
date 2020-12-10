interface HeaderProps {
  size: 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  content: string;
  noGutter?: boolean;
}
const Header = ({ size, content, noGutter }: HeaderProps) => (
  <div className={`text-${size} ${noGutter ? 'mb-0' : 'mb-2'}`}>{content}</div>
);

export default Header;
