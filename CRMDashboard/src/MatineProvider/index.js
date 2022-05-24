import { MantineProvider } from "@mantine/core";

// redux
import { useSelector } from "react-redux";

import LoadingFull from "../Component/LoadingFull";

const ThemeGlobalProvider = (props) => {
  const themeStore = useSelector((state) => state.theme);
  return (
    <MantineProvider theme={themeStore} withCSSVariables withNormalizeCSS>
      <LoadingFull />
      {props.children}
    </MantineProvider>
  );
};

export default ThemeGlobalProvider;
