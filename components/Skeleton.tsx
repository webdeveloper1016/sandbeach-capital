export const Title = () => (
  <div className="space-y-2 pb-1">
    <div className="h-4 bg-green-500 rounded w-1/4"></div>
    <div className="h-4 bg-green-500 rounded w-1/2"></div>
  </div>
);

export const Row = () => (
  <div className="space-y-2">
    <div className="h-4 bg-green-500 rounded"></div>
    <div className="h-4 bg-green-500 rounded w-5/6"></div>
  </div>
);

const Section = () => (
  <div className=" flex space-x-4">
    <div className="flex-1 space-y-4 py-1 mb-10">
      <Title />
      <Row />
      <Row />
      <Row />
      <Row />
    </div>
  </div>
);

const Skeleton = () => (
  <div className="w-full animate-pulse">
    <Section />
    <Section />
  </div>
);

export default Skeleton;
