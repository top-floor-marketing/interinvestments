import React from "react";
import { Button } from "@mantine/core";

import GridQuickView from "../Components/GridQuickView";
import SkeletonGrid from "../Components/SkeletonGrid";
import EmptyGrid from "../Components/EmptyGrid";

import UseGetListing from "../Hooks/useGetListing";

const MainContainer = () => {
  const { data, isLoading, isError, fetchListing } = UseGetListing();

  return (
    <div className="w-full min-h-[400px] bg-white mx-auto max-w-[1280px] py-12 flex flex-col gap-7">
      <p className="font-outfit font-[400] text-[36px] text-center lg:text-left mb-0">
        Featured Developments
      </p>
      {!isLoading && isError ? (
        <EmptyGrid />
      ) : isLoading ? (
        <SkeletonGrid />
      ) : (
        <GridQuickView data={data} />
      )}
      <Button
        onClick={() => fetchListing()}
        variant="white"
        disabled={isLoading}
        loading={isLoading}
        className="text-black mt-2 bg-white font-outfit hover:bg-gray-100 border border-solid border-black"
      >
        Load More
      </Button>
    </div>
  );
};

export default MainContainer;
