import React from "react";
// mantine dev
import { Box, Skeleton } from "@mantine/core";

const LoaderMaps = () => {
  return (
    <Box className="flex items-center w-full h-full">
      <Skeleton className="w-full h-[640px]  lg:h-inherit" />
    </Box>
  );
};

export default LoaderMaps;
