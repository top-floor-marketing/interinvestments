import React from "react";
// mantine
import { Box, Text } from "@mantine/core";
// css
import styles from "./styles.dl.module.scss";
// react-spring
import { useSpring, animated } from "react-spring";
// utils
import { numFormatter } from "../../utils";

const CardData = (props) => {
  const {
    number = 0,
    type = "text",
    durationAnimation = "2000",
    description = "Lorem ipsum dolor sit amet, consectetuer adipiscing",
  } = props;

  const newNumber = type === "text" ? number : numFormatter(number);

  const propsSpring = useSpring({
    delay: 600,
    val: type === "number" ? newNumber.number : 0,
    from: { val: 0 },
    config: { duration: 1200 },
  });

  if (number) {
    return (
      <Box
        data-aos-once="true"
        data-aos-duration={durationAnimation}
        data-aos="zoom-in"
        className={styles.containerCard}
      >
        <Box className="flex gap-2">
          {type === "text" ? (
            <Text component="h2" className={styles.titleCard}>
              {number}
            </Text>
          ) : (
            <Text component="h2" className={styles.titleCard}>
              $
              <animated.span>
                {propsSpring.val.interpolate((val) => Math.floor(val))}
              </animated.span>
              {newNumber.tag ? newNumber.tag : null}
            </Text>
          )}
        </Box>
        <Text className={styles.descriptionCard} component="span">
          {description}
        </Text>
      </Box>
    );
  }

  return null;
};

export default CardData;
