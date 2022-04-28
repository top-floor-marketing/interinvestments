import React from "react";
import PropTypes from "prop-types";
import { ScrollArea, Paper, Image } from "@mantine/core";

const GridQuickView = ({ data }) => {
  console.log("GridQuickView data ", data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-7">
      {data.map((val, index) => (
        <div
          data-aos="zoom-in"
          data-aos-delay={index * 100 + 300}
          data-aos-duration="700"
          key={index + val}
          style={{
            backgroundImage: `url(${val.photos[0] ? val.photos[0].src : ""})`,
          }}
          className="bg-cover bg-fixed bg-center min-h-[300px] max-h-[350px] w-full rounded-[10px] shadow-[0px_4px_25px_4px_rgba(0,0,0,0.0.5)]"
        ></div>
      ))}
    </div>
  );
};

GridQuickView.propTypes = {
  data: PropTypes.array,
};

export default GridQuickView;
