import React from "react";
import PropTypes from "prop-types";
import { Button, Paper, Text } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";

const GridQuickView = ({ data }) => {
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-7 w-full">
      {data.map((val, index) => (
        <Paper
          data-aos="zoom-in"
          data-aos-delay={index * 100 + 300}
          data-aos-duration="700"
          data-aos-once={true}
          key={index}
          /*  style={{
            backgroundImage: `url(${val.photos[0] ? val.photos[0].src : ""})`,
          }} */
          className=" group relative flex  flex-col min-h-[300px] max-h-[350px] w-full
           rounded-[10px] shadow-[0px_4px_25px_4px_rgba(0,0,0,0.0.5)]
           "
        >
          <img
            class="bg-cover	
          bg-fixed bg-center bg-no-repeat group-hover:backdrop-contrast-200
          w-full h-full absolute rounded-[10px]"
            src={val.photos[0] ? val.photos[0].sourceUrl : ""}
            alt="Interinvestments img"
          />
          <div
            class="bg-gray-500 group-hover:bg-white 
          w-full h-full absolute opacity-[0.20] 
          group-hover:opacity-[0.05] rounded-[10px]"
          ></div>
          <div className="relative w-full mt-auto flex flex-col p-5 gap-2">
            <Text className="font-outfit text-white text-[22px] break-words mb-0 leading-[27px]">
              {val.title}
            </Text>
            <Text className="font-outfit text-white text-[14px] break-words mb-0 leading-[17px]">
              {val.subTitle}
            </Text>
            <div className="flex flex-row gap-5 pt-1">
              <Button
                variant="white"
                loading={false}
                className="text-black bg-white rounded-[32px] font-outfit hover:bg-gray-100"
              >
                Quick View
              </Button>
              <Button
                variant="white"
                loading={false}
                className="bg-transparent hover:font-semibold font-outfit ml-auto rounded-full border-solid border-white hover:bg-gray-100"
              >
                <ChevronRight size={18} color="#FFB839" />
              </Button>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

GridQuickView.propTypes = {
  data: PropTypes.array,
};

export default GridQuickView;
