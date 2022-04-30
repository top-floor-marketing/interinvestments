/*  if (newVal)
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
      else document.getElementsByTagName("body")[0].style.overflow = "auto";
    }, */
import { useEffect } from "react";
import { Loader, Overlay, Center } from "@mantine/core";

const OverlayLoading = () => {
  useEffect(() => {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";
    return () => {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    };
  }, []);
  return (
    <div className="w-full min-h-screen h-full top-0 left-0 flex flex-col fixed">
      <Overlay opacity={0.6} color="#000" zIndex={999} />
      <Center className="mx-auto my-auto z-[9999]">
        <Loader size={70} />
      </Center>
    </div>
  );
};

export default OverlayLoading;
