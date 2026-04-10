import React, { useState } from "react";
// mantine
import { Button, Collapse, Box, Text, Divider } from "@mantine/core";
// assets
import imgArrowNarrowRight from "../../assets/ArrowCollapse.svg";
// import { ArrowNarrowRight } from "tabler-icons-react";
// css
import styles from "./styles.cl.module.scss";

const defaultChildren = (
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quo, voluptas,
    officia natus perferendis veritatis voluptatum est quia eligendi nisi
    excepturi earum dolores expedita. Ad enim distinctio modi incidunt aliquam!
  </p>
);

const CollapseContainer = (props) => {
  const {
    title = "text title",
    children = defaultChildren,
    delayAnimatio = "300",
    index = "01",
    defaultOpen = false,
  } = props;

  const [opened, setOpen] = useState(defaultOpen);

  return (
    <>
      <Box
        data-aos-once="true"
        data-aos-delay={delayAnimatio}
        data-aos-duration="1000"
        data-aos="fade-right"
        className={styles.container}
      >
        <Box className="flex items-center gap-[10vw]">
          <Text component="span" className={styles.textIndex}>
            {index}
          </Text>
          <Text
            onClick={() => setOpen(!opened)}
            component="h2"
            className={styles.titleCollapse}
          >
            {title}
          </Text>
        </Box>
        <Button
          radius="xl"
          color="yellow"
          className="border-0 bg-transparent hover:bg-transparent"
          classNames={{
            label: "h-[50px]",
          }}
          size="2xl"
          compact
          variant="outline"
          onClick={() => setOpen(!opened)}
        >
          {
            //  <ArrowNarrowRight
            //   className={`${styles.ArrowRight} ${
            //     opened ? styles.ArrowRight_active : ""
            //   }`}
            //   size={69}
            //   strokeWidth={1.5}
            //   color={"#FFB839"}
            // />
          }
          <img
            className={`${styles.ArrowRight} ${
              opened ? styles.ArrowRight_active : ""
            }`}
            src={imgArrowNarrowRight}
            alt="ArrowNarrowRight"
          />
        </Button>
      </Box>
      <Collapse
        in={opened}
        transitionDuration={500}
        transitionTimingFunction="linear"
      >
        <Box className={styles.collapseListing}>{children}</Box>
      </Collapse>
      <Divider
        data-aos-once="true"
        data-aos-delay={delayAnimatio}
        data-aos-duration="2000"
        data-aos="zoom-in"
        className={styles.dividerListing}
        my="sm"
      />
    </>
  );
};

export default CollapseContainer;
