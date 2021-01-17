import Header from './Header';

interface PageTitleProps {
  title: string;
  subtitle: string | React.ReactElement;
}

const PageTitle = ({title, subtitle}: PageTitleProps) => (
  <div className="mb-5">
    <Header size="text-2xl" content={title} />
    <Header size="text-5xl" content={subtitle} noGutter />
  </div>
);

export default PageTitle;
