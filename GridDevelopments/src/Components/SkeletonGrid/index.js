import { Skeleton } from "@mantine/core";

const SkeletonGrid = () => {
  const listItems = new Array(8).fill(0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-5">
      {listItems.map((val, index) => (
        <Skeleton visible key={index + val}>
          <div className="min-h-[300px] max-h-[350px] w-full shadow-[0px_4px_25px_4px_rgba(0,0,0,0.05)]"></div>
        </Skeleton>
      ))}
    </div>
  );
};

export default SkeletonGrid;
