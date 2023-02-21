import React from "react";
import PropTypes from "prop-types";
// redux
import { useDispatch } from "react-redux";
import { actionslices } from "../../components/store";
// mantine dev
import { Button, Text, Box, Paper, Tooltip } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";
// components
import CarouselMobile from "../CarouselMobile";
// utils
import get from "lodash/get";
// styles
import styles from "./styles_gd_ALV.module.scss";

const GridQuickView = (props) => {
  const dispatch = useDispatch();
  const { setSelectedListing } = actionslices;
  const {
    data,
    openModalQuickView = (id) => {},
    showOverlay = false,
    isMobileScreen = false,
  } = props;

  // @apply should not be used with the 'group' utility
  const allProps = {
    paperItem: {
      className: " group " + styles.paperItem,
    },
    imgCover: {
      className: styles.imgCover,
    },
    filter: {
      className:
        "group-hover:bg-white group-hover:opacity-[0.05] " + styles.filter,
    },
    infoContainer: {
      className:
        styles.infoContainer +
        "  " +
        (isMobileScreen ? "flex-row" : "flex-col"),
    },
    textTitle: {
      className: styles.textTitle,
    },
    textSubTitle: {
      className: styles.textSubTitle,
    },
    gridButtons: {
      className: styles.gridButtons,
    },
    buttonQuickView: (id) => {
      return {
        onClick: () => openModalQuickView(id),
        disabled: showOverlay,
        variant: "white",
        className:
          "btn-wp-primary btn-wp-primary-rounded " + styles.buttonQuickView,
      };
    },
    buttonRedirect: (uri) => {
      return {
        disabled: showOverlay,
        variant: "white",
        component: "a",
        href: uri,
        className: styles.buttonRedirect,
      };
    },
  };

  const handleMarkerMouseOver = () => {
    if (data.id) {
      dispatch(setSelectedListing(data.id));
    }
  };

  const handleMarkerMouseOut = () => {
    dispatch(setSelectedListing(null));
  };

  return (
    <Paper
      onMouseOver={handleMarkerMouseOver}
      onMouseOut={handleMarkerMouseOut}
      {...allProps.paperItem}
    >
      {isMobileScreen ? (
        <CarouselMobile photos={get(data, ["photos"], [])} />
      ) : (
        <img
          src={get(data, ["photos", "0", "sourceUrl"], "")}
          alt="Interinvestments img"
          {...allProps.imgCover}
        />
      )}

      <Box {...allProps.filter}></Box>
      <Box {...allProps.infoContainer}>
        {isMobileScreen ? (
          <>
            <Box className="flex flex-col gap-2">
              <Text {...allProps.textTitle}>{data.title}</Text>
              <Text {...allProps.textSubTitle}>{data.subTitle}</Text>
            </Box>
            <Tooltip label="View Full Property">
              <Button {...allProps.buttonRedirect(data.uri)}>
                <ChevronRight size={18} color="#FFB839" />
              </Button>
            </Tooltip>
          </>
        ) : (
          <>
            <Text {...allProps.textTitle}>{data.title}</Text>
            <Text {...allProps.textSubTitle}>{data.subTitle}</Text>
            <Box {...allProps.gridButtons}>
              <Button {...allProps.buttonQuickView(data.id)}>Quick View</Button>
              <Tooltip label="View Full Property">
                <Button {...allProps.buttonRedirect(data.uri)}>
                  <ChevronRight size={24} color="#FFB839" />
                </Button>
              </Tooltip>
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

GridQuickView.propTypes = {
  data: PropTypes.object,
  openModalQuickView: PropTypes.func,
  showOverlay: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
  index: PropTypes.number,
};

export default GridQuickView;
