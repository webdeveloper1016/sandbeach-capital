interface SectionProps {
  noBorder?: boolean;
  children: React.ReactNode;
}
const Section = ({ children, noBorder }: SectionProps) => (
  <div
    className={`mt-2 mb-4 p-2 ${
      !noBorder && 'border border-current shadow rounded-md'
    }`}
  >
    {children}
  </div>
);

export default Section;
