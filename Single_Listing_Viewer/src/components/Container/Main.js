import React, { useState } from "react";
// components
import HeroParalax from "../HeroParalax";
import DescriptionListing from "../DescriptionListing";
import DataLIsting from "../DataLIsting";
import CarucelListing from "../CarucelListing";
import CollapseListing from "../CollapseListing";
// import DisclaimerListing from "../DisclaimerListing";
import MapListing from "../MapListing";
import VideoListing from "../VideoListing";
// Hoc
import ListingWrapper from "../Hoc/ListingWrapper";
// mantine
import { useScrollIntoView } from "@mantine/hooks";
import get from "lodash/get";

const Main = () => {
  const [valueListing, setValueListing] = useState(null);
  const [optionTheme, setOptionTheme] = useState(null);
  const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 60 });

  const getSlugFromUri = () => {
    const uri = window.location.pathname;
    return uri.split("/")[2];
  };

  return (
    <ListingWrapper
      valueListing={valueListing}
      setValueListing={setValueListing}
      setOptionTheme={setOptionTheme}
      slugLIsting={getSlugFromUri()}
    >
      {valueListing ? (
        <>
          <HeroParalax
            scrollIntoView={scrollIntoView}
            data={{
              ...valueListing?.listingData.newDevelopment,
              featuredImage: valueListing?.featuredImage,
              title: valueListing?.title,
              neighborhoods: valueListing?.neighborhoods?.nodes,
            }}
          />
          <DescriptionListing
            targetRef={targetRef}
            data={{
              ...valueListing?.listingData.newDevelopment,
            }}
          />
          <DataLIsting
            data={{
              ...valueListing?.listingData.newDevelopment,
            }}
          />
          <CarucelListing
            data={{
              ...valueListing?.listingData.newDevelopment,
            }}
          />
          <CollapseListing
            idListing={get(valueListing, ["databaseId"], null)}
            data={{
              specs: valueListing?.listingData?.newDevelopment.specs,
              finishes: valueListing?.listingData?.newDevelopment.finishes,
              // address: valueListing?.address.address,
              floorplans: valueListing?.floorplans?.allFloorplans,
              team: valueListing?.team.team,
            }}
          />

          {
            // <DisclaimerListing data={optionTheme} />
          }

          <VideoListing
            data={{
              ...valueListing?.listingData.newDevelopment,
            }}
          />

          {valueListing ? (
            <MapListing
              data={{
                ...valueListing?.listingData.newDevelopment,
                uri: valueListing?.uri,
                title: valueListing?.title,
                neighborhoods: valueListing?.neighborhoods.nodes,
              }}
              optionTheme={optionTheme}
            />
          ) : null}
        </>
      ) : null}
    </ListingWrapper>
  );
};

export default Main;
