import React from "react";
import PropTypes from "prop-types";
import { Button, Text, Box } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";

import CarouselMobile from "../CarouselMobile";

import styles from "./styles_gd_ALV.module.scss";

const GridQuickView = ({
  data,
  openModalQuickView = (id) => { console.log('ModalId', id) },
  showOverlay = false,
  isMobileScreen = false,
  index
}) => {
  // @apply should not be used with the 'group' utility
  const allProps = {
    paperItem: {
      className: " group " + styles.paperItem,
    },
    imgCover: {
      className: styles.imgCover,
    },
    filter: {
      className: "group-hover:bg-white group-hover:opacity-[0.05] " + styles.filter,
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
        className: "btn-wp-primary btn-wp-primary-rounded " + styles.buttonQuickView,
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

  return (
    <Box
      key={index}
      classNames={{
        root: '!p-0'
      }}
      {...allProps.paperItem}
    >
      {isMobileScreen ? (
        <CarouselMobile photos={data.photos} />
      ) : (
        <img
          src={data.photos[0] ? data.photos[0].sourceUrl : ""}
          alt="Interinvestments img"
          {...allProps.imgCover}
        />
      )}

      <div {...allProps.filter}></div>
      <div {...allProps.infoContainer}>
        {isMobileScreen ? (
          <>
            <div className="flex flex-col gap-2">
              <Text {...allProps.textTitle}>{data.title}</Text>
              <Text {...allProps.textSubTitle}>{data.subTitle}</Text>
            </div>
            <Button {...allProps.buttonRedirect(data.uri)}>
              <ChevronRight size={18} color="#FFB839" />
            </Button>
          </>
        ) : (
          <>
            <Text {...allProps.textTitle}>{data.title}</Text>
            <Text {...allProps.textSubTitle}>{data.subTitle}</Text>
            <div {...allProps.gridButtons}>
              <Button {...allProps.buttonQuickView(data.id)}>
                Quick View
              </Button>
              <Button {...allProps.buttonRedirect(data.uri)}>
                <ChevronRight size={24} color="#FFB839" />
              </Button>
            </div>
          </>
        )}
      </div>
    </Box>
  );
};

GridQuickView.propTypes = {
  data: PropTypes.object,
  openModalQuickView: PropTypes.func,
  showOverlay: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
  index: PropTypes.number
};

export default GridQuickView;
