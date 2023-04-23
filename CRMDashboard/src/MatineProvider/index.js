import { MantineProvider } from "@mantine/core";

// global store
import useClientGlobalStore from "../GlobalStore/useClientGlobalStore";

import stylesProvider from "./stylesProvider";
import { ModalsProvider } from '@mantine/modals';

import './overrideMantine.css';

const ThemeGlobalProvider = (props) => {
  const { state: { theme: themeStore } } = useClientGlobalStore();
  return (
    <MantineProvider
      inherit
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
      <ModalsProvider>
          {props.children}
      </ModalsProvider>
    </MantineProvider>
  );
};

export default ThemeGlobalProvider;
