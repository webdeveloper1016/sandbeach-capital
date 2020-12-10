interface SectionProps {
  children: React.ReactNode;
}
const Section = ({ children }: SectionProps) => {
  return <div className="mt-2 mb-4 border border-current rounded p-2">{children}</div>;
};

export default Section;
