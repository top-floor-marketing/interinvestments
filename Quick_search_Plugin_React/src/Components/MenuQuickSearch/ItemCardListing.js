//mantine
import { Divider, Box, Text, Button } from "@mantine/core";
import { Building, ChevronRight } from "tabler-icons-react";
// components
import NoImagen from "./NoImagen";
// utils
import FormaterNumber from "../../utils/FormaterNumber";
import get from "lodash/get";
//css
import styles from "./styles.mqs.module.scss";

const ItemCardListing = (props) => {
  const { featuredImage, uri, title, newDevelopment, index, lengthData } =
    props;
  const urlParams = new URLSearchParams(window.location.search);
  const AgentId = parseInt(urlParams.get("agent-id"));
  const sharedCrm = urlParams.get("shared");

  const urlCardListing = (uriListing) => {
    if (AgentId && Boolean(sharedCrm)) {
      const LISTING_URI = `${uriListing}`;
      let vars = [];
      let finalVars = "";

      if (AgentId) {
        vars.push(`agent-id=${AgentId}`);
      }

      if (sharedCrm) {
        vars.push(`shared=${sharedCrm}`);
      }

      if (vars.length) {
        finalVars = vars.reduce((acc, val) => {
          return acc === "" ? val : "".concat(acc).concat("&").concat(val);
        }, "");
        finalVars = LISTING_URI.concat("?").concat(finalVars);
      }

      return finalVars;
    } else {
      return uriListing;
    }
  };

  return (
    <Box
      onClick={() => {
        window.location.href = urlCardListing(uri);
      }}
      className={`${styles.cardListing} ${styles.fadeInBottom}`}
      style={{
        animationDelay: `${index * 0.2}s`,
      }}
      key={index}
    >
      <Box className={styles.contendCardListing}>
        {get(newDevelopment, ["photos", "0", "sourceUrl"], null) ||
        get(featuredImage, ["node", "sourceUrl"], null) ? (
          <img
            className={`${styles.imagenMenu} ${styles.imageListing}`}
            src={
              get(newDevelopment, ["photos", "0", "sourceUrl"], null) ||
              get(featuredImage, ["node", "sourceUrl"], null)
            }
            alt={`ImageListing_${index}`}
          />
        ) : (
          <NoImagen />
        )}

        <Box className={styles.containerInfoListing}>
          <Box style={{ height: "inherit" }} className={styles.dataListing}>
            <Text component="h4" className={styles.titleListing}>
              {title}
            </Text>
            <Box className="flex flex-col gap-[0px]">
              <Text
                component="h3"
                className={`font-medium ${styles.decriptionListing}`}
              >
                {newDevelopment.nameOfDevelopment}
              </Text>

              <span className={`font-light ${styles.decriptionListing}`}>
                {`Price $ ${FormaterNumber(newDevelopment.priceMin).number}${
                  FormaterNumber(newDevelopment.priceMin).tag
                }`}{" "}
                |{" "}
                {`$ ${FormaterNumber(newDevelopment.priceMax).number}${
                  FormaterNumber(newDevelopment.priceMax).tag
                }`}
              </span>
            </Box>
          </Box>
          <Button
            className="btn-wp-primary-icon lg:mr-6 mx-auto md:mx-0"
            component="a"
            href={urlCardListing(uri)}
            variant="outline"
            leftIcon={<Building color="#ffb839" size={16} />}
          >
            View property
            <ChevronRight />
          </Button>
        </Box>
      </Box>

      {index === lengthData - 1 ? <Box className="mt-5" /> : <Divider />}
    </Box>
  );
};

export default ItemCardListing;
