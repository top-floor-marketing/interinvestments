import React from "react";
import { Button, Overlay } from "@mantine/core";

import GridQuickView from "../Components/GridQuickView";
import SkeletonGrid from "../Components/SkeletonGrid";
import EmptyGrid from "../Components/EmptyGrid";

import UseGetListing from "../Hooks/useGetListing";

const MainContainer = () => {
  const {
    data,
    isLoading,
    isError,
    fetchListing,
    renderSkeleton,
    openQuickView,
    showOverlay,
  } = UseGetListing();

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="700"
      className="w-full min-h-[400px] bg-white mx-auto max-w-[1280px] py-12 flex flex-col gap-7"
    >
      <p className="font-outfit font-[400] text-[36px] text-center lg:text-left mb-0">
        Featured Developments
      </p>
      {!renderSkeleton && isError ? (
        <EmptyGrid />
      ) : renderSkeleton ? (
        <SkeletonGrid />
      ) : (
        <GridQuickView
          data={data}
          openQuickView={openQuickView}
          showOverlay={showOverlay}
        />
      )}
      <Button
        onClick={() => fetchListing()}
        variant="white"
        disabled={isLoading}
        loading={isLoading}
        className="text-black mt-2 max-w-[200px] mx-auto bg-white font-outfit hover:bg-gray-100 border border-solid border-black"
      >
        Load More
      </Button>
    </div>
  );
};

export default MainContainer;
