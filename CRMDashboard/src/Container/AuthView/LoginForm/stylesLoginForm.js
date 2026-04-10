import rosePetals from './assets/images/rosePetals.svg';
// mantine
import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params) => ({
  containerLogin: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    backgroundColor: theme.colors.gray[3],
    [`@media (max-width: 768px)`]: {
      flexDirection: 'column',
      backgroundImage: `url(${rosePetals})`,
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
  formCard: {
    padding: theme.other.spacing.p8,
    gap: theme.other.spacing.p4,
    height: "auto",
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    maxWidth: "400px",
    'h3': {
      margin: 0,
      marginTop: theme.other.spacing.p8,
      fontSize: "2rem",
      color: theme.colors.dark[9],
    }
  },
  formTag: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    gap: theme.other.spacing.p4,
  },
  logo: {
    alignSelf: 'center',
    minWidth: "200px",
    maxWidth: "300px",
    cursor: 'pointer',
     "&:hover": {
      transform: "scale(1.005)"
    }
  },
  buttonLogin: {
    width: "100%",
    fontSize: "20px",
    lineHeight: "1.7em",
    borderWidth: "1px",
    padding: "0.3em 1em",
  },
  groupBackHome: {
    marginTop: theme.other.spacing.p8,
    cursor: 'pointer',
    alignSelf: "flex-start",
    justifyItems: "center",
    'span': {
       "&:hover": {
        color: theme.colors.primary[6]
      }
    }
  },
  buttonForgot: {
    color: "black",
    [`&:hover`]: {
      color: theme.colors.primary[6],
    },
  },
}));

export default useStyles;
