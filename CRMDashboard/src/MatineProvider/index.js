import { MantineProvider  } from "@mantine/core";

// redux
import { useSelector } from "react-redux";

import LoadingFull from "../Component/LoadingFull";

import stylesProvider from "./stylesProvider";

const ThemeGlobalProvider = (props) => {
  const themeStore = useSelector((state) => state.theme);
  return (
    <MantineProvider
      theme={themeStore}
      emotionOptions={{ key: "wp" }}
      withGlobalStyles
      withNormalizeCSS
      styles={stylesProvider()}
    >
      <LoadingFull />
      {props.children}
    </MantineProvider>
  );
};

export default ThemeGlobalProvider;
