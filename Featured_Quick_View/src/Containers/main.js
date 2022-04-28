import React from "react";

import GridQuickView from "../Components/GridQuickView";

import UseGetListing from "../Hooks/useGetListing";

const MainContainer = () => {
  const { data, loading } = UseGetListing();
  return (
    <div
      data-aos="fade-right"
      data-aos-duration="400"
      data-aos-easing="ease-in-sine"
      className="w-full min-h-[400px] bg-white mx-auto max-w-[1280px] py-12 flex flex-col gap-7"
    >
      <label className="font-outfit font-[400] text-[36px]">
        Featured Developments
      </label>
      <GridQuickView data={new Array(10).fill(0)} />
    </div>
  );
};

export default MainContainer;
