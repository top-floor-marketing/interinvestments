import React, { useRef, useEffect } from "react";
// mantine
import { Box } from "@mantine/core";
// componets
import QuickSearch from "../Components/QuickSearch";
import MenuQuickSearch from "../Components/MenuQuickSearch";
// store
import useStore from "../Store/useStore";
import useGetData from "../hook/useGetData";
// utils
import { useWindowScroll, useHotkeys } from "@mantine/hooks";

const PLUGIN_ID_NAME = "#quickSearchParent";

const ContainerComponts = () => {
  const {
    isError,
    isSkeleton,
    dataNeighborhoods,
    dataCategory,
    isFetchedCategory,
    isFetchingNeighborhoods,
    isFetchingListing,
  } = useGetData();
  const containerRef = useRef(null);
  const [{ y }] = useWindowScroll();
  const { state, setFocusMenu } = useStore();
  const { focusMenu } = state;

  // et_pb_section_1 home
  // id sectionsearch
  useEffect(() => {
    if (focusMenu) {
      const boxContainer = document.querySelector(PLUGIN_ID_NAME);
      if (
        boxContainer &&
        focusMenu &&
        y > boxContainer?.offsetTop + boxContainer?.clientHeight / 1.5
      ) {
        setFocusMenu(false);
      }
    }
  }, [y, focusMenu, setFocusMenu]);

  useHotkeys([
    [
      "Escape",
      () => {
        if (focusMenu) {
          setFocusMenu(false);
        }
      },
    ],
  ]);

  const propsHookGetData = {
    isError,
    isSkeleton,
    dataNeighborhoods,
    dataCategory,
    isFetchedCategory,
    isFetchingNeighborhoods,
    isFetchingListing,
  };

  // console.log("stateStore", state);

  return (
    <Box style={{ width: "100%" }} id="boxContainerSearch" ref={containerRef}>
      <QuickSearch {...propsHookGetData} />
      <MenuQuickSearch {...propsHookGetData} />
    </Box>
  );
};

export default ContainerComponts;
