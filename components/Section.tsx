interface SectionProps {
  children: React.ReactNode;
}
const Section = ({ children }: SectionProps) => (
  <div className="mt-2 mb-4 border border-current shadow rounded-md p-2">
    {children}
  </div>
);

export default Section;
