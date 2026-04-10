import { Card, Button, Box } from "@mantine/core";
import { ChevronRight } from "tabler-icons-react";
// componet
import LoadingMenu from "./LoadingMenu";
import CardListing from "./CardListing";
// store
import useStore from "../../Store/useStore";
//css
import styles from "./styles.mqs.module.scss";

const MenuQuickSearch = ({ isFetchingListing }) => {
  const {
    state: {
      searchListing,
      activeCategory,
      activeNeighborhoods,
      focusMenu,
      listListing,
    },
  } = useStore();

  const urlVaribles = () => {
    const URL_ALL_LISTING = "/all-listings/";
    let vars = [];
    let finalVars = "";
    if (searchListing) {
      vars.push(`search=${searchListing}`);
    }
    if (activeNeighborhoods) {
      vars.push(`nei=${activeNeighborhoods}`);
    }
    if (activeCategory) {
      vars.push(`cat=${activeCategory}`);
    }
    if (vars.length) {
      finalVars = vars.reduce((acc, val) => {
        return acc === "" ? val : "".concat(acc).concat("&").concat(val);
      }, "");
      finalVars = URL_ALL_LISTING.concat("?").concat(finalVars);
    }

    return finalVars;
  };

  if (focusMenu) {
    return (
      <div className={`z-1 ${styles.MenuQuickSearch}`}>
        <Card radius={10} className={styles.CardInputMenuMenuQuickSearch}>
          {isFetchingListing ? (
            <LoadingMenu />
          ) : (
            listListing && <CardListing data={listListing} />
          )}
          <Box className="flex flex-row w-full bg-[#ffff] py-2 mt-2">
            <Button
              component="a"
              href={urlVaribles()}
              variant="outline"
              className="mx-auto btn-wp-primary-icon"
            >
              View all results
              <ChevronRight />
            </Button>
          </Box>
        </Card>
      </div>
    );
  } else {
    return null;
  }
};

export default MenuQuickSearch;
