import React, { useEffect } from "react";
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

  useEffect(() => {
    if (!renderSkeleton && !isLoading) {
      const getButtonOffSet =
        document.querySelector("#btnLoadMore_wp").offsetTop;
      window.scrollTo({
        top: getButtonOffSet,
        behavior: "smooth",
      });
    }
  }, [renderSkeleton, isLoading]);

  const allProps = {
    container: {
      className:
        "w-full min-h-[400px] bg-white mx-auto max-w-[1280px] py-12 flex flex-col gap-7 px-5 lg:px-0",
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
        "text-black my-3 min-w-[200px] max-w-[200px] mx-auto bg-white font-outfit hover:bg-gray-100 border border-solid border-black",
    },
    modalQuickView: {
      data: dataQuickView,
      onClose: onCloseModalQuickView,
    },
  };

  return (
    <div data-aos="fade-up" data-aos-duration="700" {...allProps.container}>
      <p {...allProps.className}>Featured Developments</p>
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
