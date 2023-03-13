//mantine
import { ScrollArea } from "@mantine/core";
import { DatabaseOff } from "tabler-icons-react";
// components
import ItemCardListing from "./ItemCardListing";
//css
import styles from "./styles.mqs.module.scss";

const CardListing = ({ data }) => {
  if (data.length) {
    return (
      <ScrollArea
        className={data.length >= 3 ? styles.containerMenu : "h-full"}
        offsetScrollbars
      >
        {data.map((val, index) => {
          const { newDevelopment } = val.listingData;
          const { featuredImage, uri, title } = val;
          return (
            <ItemCardListing
              featuredImage={featuredImage}
              uri={uri}
              title={title}
              newDevelopment={newDevelopment}
              index={index}
              lengthData={data.length}
            />
          );
        })}
      </ScrollArea>
    );
  }

  return <NoDataCard />;
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
