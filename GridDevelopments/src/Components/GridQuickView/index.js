import React from "react";
import PropTypes from "prop-types";
import { Button, Paper, Text, Tooltip } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";

import CarouselMobile from "../CarouselMobile";

import styles from "./styles_gd.module.scss";

const URL_QUERY_ID_NAME = "agent-id";
const ID_LOCALSTORAGE_NAME = "lead-agent";


const GridQuickView = ({
  data,
  openModalQuickView,
  showOverlay,
  isMobileScreen,
  idAgent
}) => {

  const getAgentIdUrl = (uri) => {
    const idInLocalStorage = parseInt(localStorage.getItem(ID_LOCALSTORAGE_NAME));
    if (idAgent || idInLocalStorage) {
      return `${uri}?${URL_QUERY_ID_NAME}=${idAgent || idInLocalStorage}&shared=true`;
    }
    return uri
  }

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
        " group-hover:bg-white  group-hover:opacity-[0.05] " + styles.filter,
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
        href: getAgentIdUrl(uri),
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
                  <Tooltip label="View Full Property">
                    <Button {...allProps.buttonRedirect(val.uri)}>
                      <ChevronRight size={18} color="#FFB839" />
                    </Button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Text {...allProps.textTitle}>{val.title}</Text>
                  <Text {...allProps.textSubTitle}>{val.subTitle}</Text>
                  <div {...allProps.gridButtons}>
                    <Button {...allProps.buttonQuickView(val.id)}>
                      Quick View
                    </Button>
                    <Tooltip label="View Full Property">
                      <Button {...allProps.buttonRedirect(val.uri)}>
                        <ChevronRight size={24} color="#FFB839" />
                      </Button>
                    </Tooltip>
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
