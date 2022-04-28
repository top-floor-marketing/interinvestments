import React from "react";

import GridQuickView from "../Components/GridQuickView";
import SkeletonGrid from "../Components/SkeletonGrid";

import UseGetListing from "../Hooks/useGetListing";

const MainContainer = () => {
  const { data, loading } = UseGetListing();
  return (
    <div className="w-full min-h-[400px] bg-white mx-auto max-w-[1280px] py-12 flex flex-col gap-7">
      <p className="font-outfit font-[400] text-[36px]">
        Featured Developments
      </p>
      {loading ? <SkeletonGrid /> : <GridQuickView data={data} />}
    </div>
  );
};

export default MainContainer;
