import React from "react";
// components
import ContactForm from "../ContactForm";
// mantine
import { Box } from "@mantine/core";
// styles
import style from "../../styles.form.module.scss";

const Main = () => {
  return (
    <Box className={style.containerMain}>
      <ContactForm />
    </Box>
  );
};

export default Main;
