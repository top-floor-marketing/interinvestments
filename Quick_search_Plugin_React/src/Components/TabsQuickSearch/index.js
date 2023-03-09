import React, { useEffect } from "react";
// componest
import ButtonTabs from "./ButtonTabs";
import SelectTabs from "./SelectTabs";
import InputTabs from "./InputTabs";
import SkeletonQuickSearch from "../SkeletonQuickSearch";
import AlertError from "../AlertError";
// utils
import {
  SELECT_TABS_CATEGORY,
  SELECT_NEIGHBORHOODS,
  ENUM_NEIGHBORHOODS,
} from "../../utils/mapValueSelect";

// react-query
import { useQueryHelper } from "../../GraphqlClient/useRequest";
import { LISTINGS_CATEGORY, ALL_NEIGHBORHOODS } from "../../GraphqlClient/GQL";

// mantine
import { useMediaQuery } from "@mantine/hooks";

import { Box } from "@mantine/core";

// store
import useStore from "../../Store/useStore";
// css
import styles from "./styles.tqs.module.scss";

const TapsQuickSearch = () => {
  const matches = useMediaQuery("(min-width: 1280px)");
  const {
    state: {
      listCategories,
      activeCategory,
      searchListing,
      listNeighborhoods,
      activeNeighborhoods,
    },
    setCategories,
    setActiveCategory,
    setSearchListing,
    setNeighborhoods,
    setactiveNeighborhoods,
    setFocusMenu,
  } = useStore();

  const { isLoading, isError, data } = useQueryHelper({
    name: "LISTINGS_CATEGORY",
    gql: LISTINGS_CATEGORY,
    variables: {
      first: 3,
    },
    config: {
      onSuccess: (req) => {
        setCategories(req.listingCategories.nodes);
        setActiveCategory(req.listingCategories.nodes[0].databaseId.toString());
      },
    },
  });

  const {
    isFetching,
    isLoading: isLoadingNEIGHBORHOODS,
    isError: isErrorNEIGHBORHOODS,
    data: dataNEIGHBORHOODS,
    refetch: refetchNeighborhood,
  } = useQueryHelper({
    name: "ALL_NEIGHBORHOODS",
    gql: ALL_NEIGHBORHOODS,
    variables: {
      categorie: ENUM_NEIGHBORHOODS(activeCategory),
    },
    config: {
      enabled: false,
      onSuccess: (req) => {
        // console.log("neighborhoods", req);
        setNeighborhoods(SELECT_NEIGHBORHOODS(req.neighborhoodByCategorie));
        setactiveNeighborhoods(
          SELECT_NEIGHBORHOODS(req.neighborhoodByCategorie)[0].value
        );
      },
    },
  });

  useEffect(() => {
    if (activeCategory) {
      refetchNeighborhood();
    }
  }, [activeCategory, refetchNeighborhood]);

  if ((isLoading || isLoadingNEIGHBORHOODS) && (!data || !dataNEIGHBORHOODS)) {
    return (
      <Box className={styles.containerTabs}>
        <SkeletonQuickSearch />
      </Box>
    );
  }

  if (isError || isErrorNEIGHBORHOODS) {
    return (
      <AlertError
        label="Error!"
        description="Please wait a few minutes before you try again"
      />
    );
  }

  if (data && dataNEIGHBORHOODS) {
    return (
      <Box className={styles.containerTabs}>
        {matches ? (
          listCategories.map((val, index) => (
            <ButtonTabs
              onClick={() => setFocusMenu(true)}
              key={index}
              id={val.databaseId.toString()}
              onChageActive={setActiveCategory}
              active={val.databaseId.toString() === activeCategory}
              text={val.name}
            />
          ))
        ) : (
          <SelectTabs
            onClick={() => setFocusMenu(true)}
            placeholder="Select category"
            onChange={setActiveCategory}
            value={activeCategory}
            data={SELECT_TABS_CATEGORY(listCategories)}
            className={`${styles.SelectTabsCategory}`}
          />
        )}
        <SelectTabs
          isLoading={isFetching}
          onClick={() => setFocusMenu(true)}
          value={activeNeighborhoods}
          data={listNeighborhoods}
          onChange={setactiveNeighborhoods}
          placeholder="Select Neighborhoods"
          className={`${styles.SelectTabsNeighborhoods}`}
        />
        <InputTabs
          onChange={(value) => {
            setSearchListing(value);
            setFocusMenu(true);
          }}
          value={searchListing}
          className={`${styles.InputTabs}`}
        />
      </Box>
    );
  }
};

export default TapsQuickSearch;
