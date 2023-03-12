import React from "react";
// componest
import ButtonTabs from "./ButtonTabs";
import SelectTabs from "./SelectTabs";
import InputTabs from "./InputTabs";
import SkeletonQuickSearch from "../SkeletonQuickSearch";
import AlertError from "../AlertError";
// utils
import { SELECT_TABS_CATEGORY } from "../../utils/mapValueSelect";
// mantine
import { useMediaQuery } from "@mantine/hooks";
import { Box } from "@mantine/core";
// store
import useStore from "../../Store/useStore";
// css
import styles from "./styles.tqs.module.scss";

const TapsQuickSearch = ({ isError, isSkeleton, isFetchingNeighborhoods }) => {
  const matches = useMediaQuery("(min-width: 1280px)");
  const {
    state: {
      listCategories,
      activeCategory,
      searchListing,
      listNeighborhoods,
      activeNeighborhoods,
    },
    setActiveCategory,
    setSearchListing,
    setactiveNeighborhoods,
    setFocusMenu,
  } = useStore();

  if (isSkeleton) {
    return (
      <Box className={styles.containerTabs}>
        <SkeletonQuickSearch />
      </Box>
    );
  }

  if (isError) {
    return (
      <AlertError
        label="Error!"
        description="Please wait a few minutes before you try again"
      />
    );
  }

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
        isLoading={isFetchingNeighborhoods}
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
};

export default TapsQuickSearch;
