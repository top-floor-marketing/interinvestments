import { Skeleton } from "@mantine/core";

const SkeletonBlog = () => {
  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-7">
      <div className="grid grid-cols-1 justify-center content-center px-7 py-36 lg:p-48 gap-7">
        <Skeleton visible className="w-2/3">
          <div className="h-[25px]"></div>
        </Skeleton>
        <Skeleton visible>
          <div className="w-full h-[90px]"></div>
        </Skeleton>
        <Skeleton visible>
          <div className="w-full h-[120px]"></div>
        </Skeleton>
        <Skeleton visible className="w-[125px]">
          <div className="w-full h-[45px]"></div>
        </Skeleton>
      </div>
      <div className="hidden absolute lg:static lg:block z-0">
        <Skeleton visible>
          <div className="w-full min-h-screen max-h-[1200px]"></div>
        </Skeleton>
      </div>
    </div>
  );
};

export default SkeletonBlog;
