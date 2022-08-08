import { MantineProvider  } from "@mantine/core";

// global store
import useClientGlobalStore from "../GlobalStore/useClientGlobalStore";
import LoadingFull from "../Component/LoadingFull";

import stylesProvider from "./stylesProvider";

import './overrideMantine.css';

const ThemeGlobalProvider = (props) => {
  const { state: { theme: themeStore } } = useClientGlobalStore();
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
