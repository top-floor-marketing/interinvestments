import React from "react";
// components
import SegmentedTypeListing from "./SegmentedTypeListing";
import SkeletonFilters from "./SkeletonFilters";
// mantine dev
import { TextInput, Box, Select } from "@mantine/core";
import { Search } from "tabler-icons-react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { actionslices } from "../store";
// styles
import styles from "./styles_FL_.module.scss";

const FiltersListings = () => {
  const dispatch = useDispatch();
  const { search, neighborhood, categoy } = useSelector(
    (state) => state.filter
  );
  const { dataCategory, dataNei, isLoading } = useSelector(
    (state) => state.statusQuery
  );
  const { setSearch, setneighborhood, setcategoy, setEmptyData } = actionslices;

  if (isLoading) {
    return <SkeletonFilters />;
  }

  // console.log("dataNei", dataNei);

  return (
    <Box className={styles.ContainerFilters}>
      <TextInput
        className={styles.inputsearch}
        name="search"
        value={search}
        onChange={(valueInput) => {
          // set value input
          dispatch(setSearch(valueInput.target.value));
          // reset vaues listing
          dispatch(setEmptyData());
        }}
        classNames={{
          rightSection: "m-[10px] opacity-50",
          input: "!pr-[45px] !pl-[14px]",
        }}
        rightSection={<Search size={21} />}
        placeholder="Filter by name, condo or zip code"
        radius="xl"
        size="md"
      />
      <Select
        value={neighborhood}
        onChange={(value) => {
          // set value input
          dispatch(setneighborhood(value));
          // reset vaues listing
          dispatch(setEmptyData());
        }}
        className={styles.inputsearch}
        placeholder="Select Neighborhood"
        radius="xl"
        clearable
        size="md"
        data={dataNei.map((value) => ({
          value: `${value.databaseId}`,
          label: value.name,
        }))}
      />
      <SegmentedTypeListing
        value={categoy}
        onChange={(value) => {
          // set value input
          dispatch(setcategoy(value));
          // reset vaues listing
          dispatch(setEmptyData());
        }}
        dataCategory={dataCategory.map((value) => ({
          value: `${value.databaseId}`,
          label: value.name,
        }))}
      />
    </Box>
  );
};

export default FiltersListings;
