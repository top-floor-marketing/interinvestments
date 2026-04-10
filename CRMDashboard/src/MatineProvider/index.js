import { MantineProvider } from '@mantine/core';

// global store
import useClientGlobalStore from '../GlobalStore/useClientGlobalStore';

import stylesProvider from './stylesProvider';

import './overrideMantine.css';

const ThemeGlobalProvider = (props) => {
  const {
    state: { theme: themeStore },
  } = useClientGlobalStore();
  return (
    <MantineProvider
      inherit
      theme={{
        ...themeStore,
        components: {
          ...stylesProvider(),
        },
      }}
      emotionOptions={{ key: 'wp' }}
      withGlobalStyles
      withNormalizeCSS
    >
      {props.children}
    </MantineProvider>
  );
};

export default ThemeGlobalProvider;
