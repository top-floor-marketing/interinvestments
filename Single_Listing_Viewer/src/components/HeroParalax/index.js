import React from "react";
// css
import styles from "./styles.hp.module.scss";
// mantine
import { Box, Text, Button } from "@mantine/core";
import { ChevronDown } from "tabler-icons-react";
// utils
import { numFormatter } from "../../utils";
import get from "lodash/get";

const HeroParalax = (props) => {
  const { data, scrollIntoView } = props;

  const getBackgroundImage = () => {
    let url = get(data, ["featuredImage", "node", "sourceUrl"], null);
    if (!url) url = get(data, ["photos", "0", "sourceUrl"], null);
    return url;
  };

  return (
    <Box className="relative w-full h-full">
      <Box style={{ zIndex: 1 }} className={`${styles.ParallaxCroma}`} />
      <Box
        style={{ backgroundImage: `url(${getBackgroundImage()})` }}
        className={styles.BoxImagenParalax}
      >
        <Box style={{ zIndex: 1 }} className={styles.containerParalax}>
          <Text
            data-aos-once="true"
            data-aos-duration="2000"
            data-aos="zoom-out-up"
            component="h1"
          >
            {data.title}
            {data?.neighborhoods?.length ? (
              <>
                <br />
                <Text component="span">
                  {data.neighborhoods[0].name} &nbsp;&nbsp; • $
                  {numFormatter(data.priceMin).number +
                    numFormatter(data.priceMin).tag}{" "}
                  &nbsp;&nbsp; • $
                  {numFormatter(data.priceMax).number +
                    numFormatter(data.priceMax).tag}
                </Text>
              </>
            ) : null}
          </Text>
          <Text component="span" className={styles.icon}>
            <Button
              onClick={() => scrollIntoView({ alignment: "center" })}
              component="span"
              style={{ marginBottom: "20px" }}
              variant="outline"
              className={`group ${styles.ButtonHero}`}
              size="2xl"
              compact
            >
              <ChevronDown
                className={`group-hover:text-[#FFB839] ${styles.iconButtonHero}`}
                size={28}
                strokeWidth={1}
              />
            </Button>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroParalax;
