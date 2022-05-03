import React from "react";
import PropTypes from "prop-types";
import { Button, Paper, Text } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";

import CarouselMobile from "../CarouselMobile";

const GridQuickView = ({
  data,
  openModalQuickView,
  showOverlay,
  isMobileScreen,
}) => {
  const allProps = {
    container: {
      className:
        "relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-max gap-7 w-full",
    },
    paperItem: {
      className:
        "group relative flex  flex-col min-h-[320px] max-h-[370px] w-full rounded-[10px] shadow-[0px_4px_25px_4px_rgba(0,0,0,0.0.5)]",
    },
    imgCover: {
      className:
        "bg-cover	bg-fixed bg-center bg-no-repeat group-hover:backdrop-contrast-200 w-full h-full absolute rounded-[10px]",
    },
    filter: {
      className:
        "bg-gray-600 transition-all duration-500 ease-in-out group-hover:bg-white w-full h-full absolute opacity-[0.30] group-hover:opacity-[0.05] rounded-[10px]",
    },
    infoContainer: {
      className:
        "relative w-full mt-auto flex p-5 gap-2 " +
        (isMobileScreen ? "flex-row" : "flex-col"),
    },
    textTitle: {
      className:
        "font-outfit text-white text-[22px] break-words mb-0 leading-[27px]",
    },
    textSubTitle: {
      className:
        "font-outfit text-white text-[14px] break-words mb-0 leading-[17px]",
    },
    gridButtons: {
      className: "flex flex-row gap-5 pt-1",
    },
    buttonQuickView: (id) => {
      return {
        onClick: () => openModalQuickView(id),
        disabled: showOverlay,
        variant: "white",
        className:
          "text-black bg-white rounded-[32px] transition-all duration-500 ease-in-out font-outfit hover:bg-gray-200  ",
      };
    },
    buttonRedirect: (id) => {
      return {
        disabled: showOverlay,
        variant: "white",
        component: "a",
        href: `/project?id=${id}`,
        className:
          "bg-transparent transition-all duration-500 ease-in-out mt-auto hover:font-[500] font-outfit ml-auto rounded-full border-solid border-white hover:bg-gray-100",
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
                  <Button {...allProps.buttonRedirect}>
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
