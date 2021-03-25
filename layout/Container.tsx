import { SidebarStatusType } from './Sidebar';

interface ContainerProps {
  status: SidebarStatusType;
  children: React.ReactNode;
}

export const Container = ({ children, status }: ContainerProps) => {
  return (
    <div
      className={`${
        status === 'flex' ? 'ml-16' : 'ml-0'
      } md:ml-16 min-h-screen`}
    >
      <main className="container container-extended p-4 md:px-8 lg:px-20">
        {children}
      </main>
    </div>
  );
};
