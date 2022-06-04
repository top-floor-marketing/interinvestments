import { MantineProvider } from "@mantine/core";

// redux
import { useSelector } from "react-redux";

import LoadingFull from "../Component/LoadingFull";

const ThemeGlobalProvider = (props) => {
  const themeStore = useSelector((state) => state.theme);
  return (
    <MantineProvider
      theme={themeStore}
      emotionOptions={{ key: "wp" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <LoadingFull />
      {props.children}
    </MantineProvider>
  );
};

export default ThemeGlobalProvider;
