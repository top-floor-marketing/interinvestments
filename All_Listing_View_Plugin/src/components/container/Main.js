import React from "react";
// components
import FiltersListings from "../FiltersListings";
import { SkeletonGrid, LoaderMaps } from "../LoadingListing";
import ModalQuickView from "../ModalQuickView";
import MapListing from "../MapListing";
import GridListing from "../GridListing";
import AlertError from "../AlertError";
import OverlayLoading from "../OverlayLoading";
// Hooks
import { useGetFeaturedDev } from "../../Hooks";
// mantine
import { Box, Header, AppShell, LoadingOverlay } from "@mantine/core";
// styles
import style from "../../styles.ALV.module.scss";

const Main = () => {
  const {
    isError,
    showOverlay,
    singleListing,
    onChangeSingleListing,
    isSkeletonListing,
    isFetchingNeightborhoods,
    loadingListing,
    refetchListing,
    dataListing,
    totalData,
  } = useGetFeaturedDev();

  if (isError) {
    return (
      <Box className="flex items-center justify-center w-full h-screen">
        <AlertError
          label="Error!"
          description="Please wait a few minutes before you try again"
        />
      </Box>
    );
  }
  return (
    <>
      {showOverlay && <OverlayLoading />}
      {!showOverlay && singleListing && (
        <ModalQuickView
          data={singleListing}
          onClose={() => onChangeSingleListing(null)}
        />
      )}
      <AppShell
        className={style.containerMain}
        classNames={{
          main: "p-[20px] pb-0 lg:pl-[0px] lg:pr-0 lg:pt-0",
        }}
        header={
          <Header
            fixed
            classNames={{
              root: "!sticky",
            }}
          >
            <FiltersListings
              isFetchingNeightborhoods={isFetchingNeightborhoods}
            />
          </Header>
        }
      >
        <Box className="relative">
          <Box className={style.containerContend}>
            {isSkeletonListing ? (
              <>
                <Box
                  className={`${style.allListingFadeInFwd} ${style.sectionGridListing}`}
                  style={{
                    animationDuration: "0.5s",
                  }}
                >
                  <SkeletonGrid />
                </Box>
                <Box
                  className={`${style.allListingFadeInFwd} ${style.containerMap}`}
                  style={{
                    animationDuration: "0.5s",
                    animationDelay: "0.2s",
                  }}
                >
                  <LoaderMaps />
                </Box>
              </>
            ) : (
              <>
                <Box
                  className={`${style.allListingFadeInFwd} ${style.sectionGridListing}`}
                  style={{
                    animationDuration: "0.5s",
                  }}
                >
                  <LoadingOverlay
                    className={style.overlayGridListing}
                    loaderProps={{
                      size: "sm",
                      color: "#FFB839",
                      variant: "bars",
                    }}
                    visible={loadingListing}
                    overlayOpacity={0.2}
                    overlayColor="#c5c5c5"
                    transitionDuration={500}
                    overlayBlur={0.5}
                  />
                  <GridListing
                    openModalQuickView={onChangeSingleListing}
                    refetch={refetchListing}
                    data={dataListing}
                    totalData={totalData}
                    name="grid"
                    isLoading={loadingListing || showOverlay}
                    parentClassname={style.containerGridInfinite}
                  />
                </Box>
                <Box
                  className={`${style.allListingFadeInFwd} ${style.containerMap}`}
                  style={{
                    animationDuration: "0.5s",
                    animationDelay: "0.2s",
                  }}
                >
                  <MapListing isLoading={loadingListing} />
                </Box>
              </>
            )}
          </Box>
        </Box>
      </AppShell>
    </>
  );
};

export default Main;
