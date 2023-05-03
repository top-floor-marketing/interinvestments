// mantine
import { createStyles } from "@mantine/core";

import { INPUT_BORDER_BOTTOM } from "../../MatineProvider/stylesProvider";

const useStyles = createStyles((theme, _params) => ({
  dropdownSelect: {
    borderRadius: "10px",
    padding: theme.other.spacing.p4,
    cursor: "pointer !important",
  },
  select: {
    flex: 1,
    width: "100% !important",
    minWidth: "150px !important",
    backgroundColor: "transparent !important",
    ".mantine-Select-rightSection": {
      svg: {
        width: "24px !important",
        height: "24px !important",
        color: _params?.value ? "white !important" : theme.colors.dark[8],
      },
    },
  },
  primary: {
    "&[data-selected]": {
      backgroundColor: theme.colors.primary[6],
      color: theme.colors.white[0],
    },
    "&:hover": {
      backgroundColor: theme.colors.primary[8],
      color: theme.colors.white[0],
    },
  },
  error: {
    "&[data-selected]": {
      backgroundColor: theme.colors.error[6],
      color: theme.colors.white[0],
    },
    "&:hover": {
      borderColor: theme.colors.dark,
      color: theme.colors.white[0],
      backgroundColor: theme.colors.error[8],
    },
  },
  secondary: {
    "&[data-selected]": {
      backgroundColor: theme.colors.secondary[6],
      color: theme.colors.white[0],
    },
    "&:hover": {
      color: theme.colors.white[0],
      backgroundColor: theme.colors.secondary[8],
    },
  },
  success: {
    "&[data-selected]": {
      backgroundColor: theme.colors.success[6],
      color: theme.colors.white[0],
    },
    "&:hover": {
      color: theme.colors.white[0],
      backgroundColor: theme.colors.success[8],
    },
  },
  info: {
    "&[data-selected]": {
      backgroundColor: theme.colors.info[6],
      color: theme.colors.white[0],
    },
    "&:hover": {
      color: theme.colors.white[0],
      backgroundColor: theme.colors.info[8],
    },
  },
  gray: {
    "&[data-selected]": {
      backgroundColor: theme.colors.gray[8],
      color: theme.colors.white[0],
    },
    "&:hover": {
      color: theme.colors.white[0],
      backgroundColor: theme.colors.gray[9],
    },
  },
  placeholder: {
    textAlign: "center",
    padding: theme.other.spacing.p4,
    backgroundColor: "transparent !important",
    ...INPUT_BORDER_BOTTOM.input,
    "::placeholder": {
      color: theme.colors.black[0],
      opacity: 1,
    },
  },
  selectPrimary: {
    border: "0px",
    color: theme.colors.white[0],
    backgroundColor: theme.colors.primary[6],
    "&:hover": {
      backgroundColor: theme.colors.primary[8],
    },
  },
  selectError: {
    border: "0px",
    color: theme.colors.white[0],
    backgroundColor: theme.colors.error[6],
    "&:hover": {
      backgroundColor: theme.colors.error[8],
    },
  },
  selectSecondary: {
    border: "0px",
    color: theme.colors.white[0],
    backgroundColor: theme.colors.secondary[6],
    "&:hover": {
      backgroundColor: theme.colors.secondary[8],
    },
  },
  selectSuccess: {
    border: "0px",
    color: theme.colors.white[0],
    backgroundColor: theme.colors.success[6],
    "&:hover": {
      backgroundColor: theme.colors.success[8],
    },
  },
  selectInfo: {
    border: "0px",
    color: theme.colors.white[0],
    backgroundColor: theme.colors.info[6],
    "&:hover": {
      backgroundColor: theme.colors.info[8],
    },
  },
  selectGray: {
    border: "0px",
    color: theme.colors.white[0],
    backgroundColor: theme.colors.gray[8],
    "&:hover": {
      backgroundColor: theme.colors.gray[9],
    },
  },
}));

export default useStyles