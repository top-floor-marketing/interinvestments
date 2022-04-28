import React from "react";
import PropTypes from "prop-types";

const GridQuickView = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-max gap-7 bg-green-200">
      {data.map((val, index) => (
        <div
          key={index + val}
          className="min-h-[300px] max-h-[350px] bg-red-200 w-full"
        ></div>
      ))}
    </div>
  );
};

GridQuickView.propTypes = {
  data: PropTypes.array,
};

export default GridQuickView;
