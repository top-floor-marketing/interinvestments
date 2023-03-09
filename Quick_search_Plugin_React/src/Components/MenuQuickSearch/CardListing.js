import React from "react";
//mantine
import { Divider, Box, Text, Button } from "@mantine/core";
import { DatabaseOff, Building, ChevronRight } from "tabler-icons-react";
// utils
import FormaterNumber from "../../utils/FormaterNumber";
import get from "lodash/get";

//css
import styles from "./styles.mqs.module.scss";

const CardListing = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const AgentId = parseInt(urlParams.get("agent-id"));
  const sharedCrm = urlParams.get("shared");
  const { data, isLoading } = props;

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

  console.log("data.length", data.length);

  if (data.length && !isLoading) {
    return (
      <Box className={data.length >= 3 ? styles.containerMenu : "h-full"}>
        {data.map((val, index) => {
          const { newDevelopment } = val.listingData;
          const { featuredImage } = val;
          return (
            <Box
              component="div"
              onClick={() => {
                window.location.href = urlCardListing(val.uri);
              }}
              className={styles.cardListing}
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

                <Box className="flex w-full h-[120px] flex-row justify-between items-end">
                  <Box
                    style={{ height: "inherit" }}
                    className={styles.dataListing}
                  >
                    <Text component="h4" className={styles.titleListing}>
                      {val.title}
                    </Text>
                    <Box className="flex flex-col gap-[0px]">
                      <Text
                        component="h3"
                        className={`font-medium ${styles.decriptionListing}`}
                      >
                        {newDevelopment.nameOfDevelopment}
                      </Text>

                      <span
                        className={`font-light ${styles.decriptionListing}`}
                      >
                        {`Price $ ${
                          FormaterNumber(newDevelopment.priceMin).number
                        }${FormaterNumber(newDevelopment.priceMin).tag}`}{" "}
                        |{" "}
                        {`$ ${FormaterNumber(newDevelopment.priceMax).number}${
                          FormaterNumber(newDevelopment.priceMax).tag
                        }`}
                      </span>
                    </Box>
                  </Box>
                  <Button
                    className="btn-wp-primary-icon mr-6"
                    component="a"
                    href={urlCardListing(val.uri)}
                    variant="outline"
                    leftIcon={<Building color="#ffb839" size={16} />}
                  >
                    View property
                    <ChevronRight />
                  </Button>
                </Box>
              </Box>

              {index === data.length - 1 ? (
                <Box className="mt-5" />
              ) : (
                <Divider />
              )}
            </Box>
          );
        })}
      </Box>
    );
  }

  return <NoDataCard />;
};

const NoImagen = () => {
  return (
    <Box className={`${styles.NoImageBox} ${styles.imageListing}`}>
      <Text component="p">No Image</Text>
    </Box>
  );
};

const NoDataCard = () => {
  return (
    <div className={styles.nodata}>
      <DatabaseOff size={48} strokeWidth={2} color={"black"} />
      <p>No data</p>
    </div>
  );
};

export default CardListing;
