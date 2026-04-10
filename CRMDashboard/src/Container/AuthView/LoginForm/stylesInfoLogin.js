// mantine
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
  containerInfoLogin: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: "10px",
    img: {
        borderRadius: "10px",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    }
  },
}));

export default useStyles;
