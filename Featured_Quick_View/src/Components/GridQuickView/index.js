import React from "react";
import PropTypes from "prop-types";
import { Button, Paper, Text, Overlay } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";

import CarouselMobile from "../CarouselMobile";

const GridQuickView = ({
  data,
  openQuickView,
  showOverlay,
  isMobileScreen,
}) => {
  const allProps = {
    container: {
      className:
        "relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-7 w-full",
    },
    paperItem: {
      className:
        "group relative flex  flex-col min-h-[300px] max-h-[350px] w-full rounded-[10px] shadow-[0px_4px_25px_4px_rgba(0,0,0,0.0.5)]",
    },
    imgCover: {
      class:
        "bg-cover	bg-fixed bg-center bg-no-repeat group-hover:backdrop-contrast-200 w-full h-full absolute rounded-[10px]",
    },
    filter: {
      class:
        "bg-gray-500 group-hover:bg-white w-full h-full absolute opacity-[0.20] group-hover:opacity-[0.05] rounded-[10px]",
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
    buttonQuickView: {
      onClick: () => openQuickView(),
      disabled: showOverlay,
      loading: showOverlay,
      variant: "white",
      className:
        "text-black bg-white rounded-[32px] font-outfit hover:bg-gray-100 ",
    },
    buttonRedirect: {
      disabled: showOverlay,
      loading: showOverlay,
      variant: "white",
      className:
        "bg-transparent mt-auto hover:font-semibold font-outfit ml-auto rounded-full border-solid border-white hover:bg-gray-100",
    },
  };

  const calcDelay = (index) => {
    if (index < 9) {
      return index * 50 + 300;
    } else {
      return index * 40 + 100;
    }
  };

  return (
    <>
      <div {...allProps.container}>
        {data.map((val, index) => (
          <Paper
            data-aos="zoom-in"
            data-aos-delay={calcDelay(index)}
            data-aos-duration="700"
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
                    <Button {...allProps.buttonQuickView}>Quick View</Button>
                    <Button {...allProps.buttonRedirect}>
                      <ChevronRight size={18} color="#FFB839" />
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Paper>
        ))}
      </div>
      {showOverlay && <Overlay opacity={0.7} color="#000" zIndex={999} />}
    </>
  );
};

GridQuickView.propTypes = {
  data: PropTypes.array,
  openQuickView: PropTypes.func,
  showOverlay: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
};

export default GridQuickView;
