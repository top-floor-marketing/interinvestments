import React from "react";
import PropTypes from "prop-types";
import { Button, Paper, Text } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";

import CarouselMobile from "../CarouselMobile";

import styles from "./styles.gd.module.scss";

const GridQuickView = ({
  data,
  openModalQuickView,
  showOverlay,
  isMobileScreen,
}) => {
  // @apply should not be used with the 'group' utility
  const allProps = {
    container: {
      className: styles.container,
    },
    paperItem: {
      className: " group " + styles.paperItem,
    },
    imgCover: {
      className: styles.imgCover,
    },
    filter: {
      className:
        " group-hover:bg-white  group-hover:opacity-[0.08] " + styles.filter,
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
        className: styles.buttonQuickView,
      };
    },
    buttonRedirect: (id) => {
      return {
        disabled: showOverlay,
        variant: "white",
        component: "a",
        href: `/project?id=${id}`,
        className: styles.buttonRedirect,
      };
    },
  };

  const calcDelay = (index) => {
    if (index < 9) {
      return index * 50 + 300;
    } else {
      return index * 30 + 150;
    }
  };

  const calcDuration = (index) => {
    if (index < 9) {
      return 700;
    } else {
      return 500;
    }
  };

  return (
    <>
      <div {...allProps.container}>
        {data.map((val, index) => (
          <Paper
            data-aos="zoom-in"
            data-aos-delay={calcDelay(index)}
            data-aos-duration={calcDuration(index)}
            data-aos-once={true}
            key={index}
            {...allProps.paperItem}
          >
            {isMobileScreen ? (
              <CarouselMobile photos={val.photos} />
            ) : (
              <img
                src={val.photos[0] ? val.photos[0].sourceUrl : ""}
                alt="Interinvestments img"
                {...allProps.imgCover}
              />
            )}

            <div {...allProps.filter}></div>
            <div {...allProps.infoContainer}>
              {isMobileScreen ? (
                <>
                  <div className="flex flex-col gap-2">
                    <Text {...allProps.textTitle}>{val.title}</Text>
                    <Text {...allProps.textSubTitle}>{val.subTitle}</Text>
                  </div>
                  <Button {...allProps.buttonRedirect(val.id)}>
                    <ChevronRight size={18} color="#FFB839" />
                  </Button>
                </>
              ) : (
                <>
                  <Text {...allProps.textTitle}>{val.title}</Text>
                  <Text {...allProps.textSubTitle}>{val.subTitle}</Text>
                  <div {...allProps.gridButtons}>
                    <Button {...allProps.buttonQuickView(val.id)}>
                      Quick View
                    </Button>
                    <Button {...allProps.buttonRedirect(val.id)}>
                      <ChevronRight size={18} color="#FFB839" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Paper>
        ))}
      </div>
    </>
  );
};

GridQuickView.propTypes = {
  data: PropTypes.array,
  openModalQuickView: PropTypes.func,
  showOverlay: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
};

export default GridQuickView;
