import rosePetals from './assets/images/rosePetals.svg';
// mantine
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => ({
  containerLogin: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    backgroundColor: theme.colors.gray[3],
    [`@media (max-width: 768px)`]: {
      flexDirection: 'column',
    },
  },
  loginBackground: {
    boxSizing: "border-box",
    backgroundImage: `url(${rosePetals})`,
    padding: theme.other.spacing.p12,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    flex: 1,
    maxWidth: "50%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: 768px)`]: {
      display: 'none',
    },
  },
  loginFormContainer: { 
    boxSizing: "border-box",
    padding: theme.other.spacing.p12,
    maxWidth: "50%",
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: 768px)`]: {
        maxWidth: "100%",
    },
  },
  logo: {
    minWidth: "200px",
    maxWidth: "300px",
    cursor: 'pointer',
     "&:hover": {
      transform: "scale(1.005)"
    }
  },
}));

export default useStyles;
