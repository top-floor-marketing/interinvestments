import React from "react";
//mantine
import { Box } from "@mantine/core";
import AlertError from "../AlertError";

const ErrorMaps = () => {
  return (
    <Box className="h-full w-full flex justify-center items-center">
      <AlertError
        label="Error Map!"
        description="Please wait a few minutes before you try again"
      />
    </Box>
  );
};

export default ErrorMaps;
