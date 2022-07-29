import { MantineProvider  } from "@mantine/core";

// redux
import { useSelector } from "react-redux";

import LoadingFull from "../Component/LoadingFull";

import stylesProvider from "./stylesProvider";

import './overrideMantine.css';

const ThemeGlobalProvider = (props) => {
  const themeStore = useSelector((state) => state.theme);
  return (
    <MantineProvider
      theme={{
        ...themeStore,
        components: { 
          ...stylesProvider()
        }
      }}
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
