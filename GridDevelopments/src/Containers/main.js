import React from "react";
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import GridQuickView from "../Components/GridQuickView";
import SkeletonGrid from "../Components/SkeletonGrid";
import EmptyGrid from "../Components/EmptyGrid";
import ModalQuickView from "../Components/ModalQuickView";

import UseGetListing from "../Hooks/useGetListing";
import OverlayLoading from "../Components/OverlayLoading";

const MainContainer = () => {
  const {
    data,
    isLoading,
    isError,
    fetchListListing,
    renderSkeleton,
    openModalQuickView,
    showOverlay,
    dataQuickView,
    onCloseModalQuickView,
  } = UseGetListing();

  const isMobileScreen = useMediaQuery(
    "only screen and (max-width: 640px)",
    false
  );

  const allProps = {
    container: {
      className:
        "w-full min-h-[400px] bg-white mx-auto max-w-[1280px] py-8 flex flex-col gap-5 px-5 lg:px-0",
    },
    textFeatured: {
      className:
        "font-outfit font-[400] text-[36px] text-center lg:text-left mb-0",
    },
    gridQuickView: {
      isMobileScreen,
      data,
      openModalQuickView,
      showOverlay,
    },
    btnLoadMore: {
      id: "btnLoadMore_wp",
      onClick: () => fetchListListing(),
      variant: "white",
      disabled: isLoading,
      loading: isLoading,
      className:
        "text-black transition-all duration-500 ease-in-out my-3 min-w-[200px] max-w-[200px] mx-auto bg-white font-outfit hover:bg-gray-200 border border-solid border-black",
    },
    modalQuickView: {
      data: dataQuickView,
      onClose: onCloseModalQuickView,
    },
  };

  return (
    <div data-aos="fade-up" data-aos-duration="700" {...allProps.container}>
      <p {...allProps.textFeatured}>Featured Developments</p>
      {!renderSkeleton && isError ? (
        <EmptyGrid />
      ) : renderSkeleton ? (
        <SkeletonGrid />
      ) : (
        <GridQuickView {...allProps.gridQuickView} />
      )}
      <Button {...allProps.btnLoadMore}>Load More</Button>
      {showOverlay && <OverlayLoading />}
      {!showOverlay && dataQuickView.content && (
        <ModalQuickView {...allProps.modalQuickView} />
      )}
    </div>
  );
};

export default MainContainer;
