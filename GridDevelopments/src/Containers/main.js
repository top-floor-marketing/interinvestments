import React from "react";
import { Button } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import GridQuickView from "../Components/GridQuickView";
import SkeletonGrid from "../Components/SkeletonGrid";
import EmptyGrid from "../Components/EmptyGrid";
import ModalQuickView from "../Components/ModalQuickView";

import useGetFeaturedDevelopments from '../Hooks/useGetFeaturedDevelopments';
import OverlayLoading from "../Components/OverlayLoading";

import styles from "./styles_gd.module.scss";

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
    hasNextPage
  } = useGetFeaturedDevelopments();

  const isMobileScreen = useMediaQuery(
    "only screen and (max-width: 640px)",
    false
  );

  const allProps = {
    container: {
      className: styles.container,
    },
    textFeatured: {
      className: styles.textFeatured,
    },
    gridQuickView: {
      isMobileScreen,
      data,
      openModalQuickView,
      showOverlay,
    },
    btnLoadMore: {
      onClick: () => fetchListListing(),
      variant: "outline",
      disabled: isLoading,
      loading: isLoading,
      className: "btn-wp-primary mx-auto mt-3",
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
      {
        (true) && <Button {...allProps.btnLoadMore}>Load More</Button>
      }
      {showOverlay && <OverlayLoading />}
      {!showOverlay && dataQuickView.content && (
        <ModalQuickView {...allProps.modalQuickView} />
      )}
    </div>
  );
};

export default MainContainer;
