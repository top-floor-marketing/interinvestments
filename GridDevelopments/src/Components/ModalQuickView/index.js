import PropTypes from "prop-types";
import { Button, Divider } from "@mantine/core";

import ModalHOC from "./ModalHOC";
import CarouselQuickView from "./CarouselQuickView";

import styles from "./styles_gd.module.scss";

const ModalQuickView = ({ data, onClose }) => {
  const { content } = data;
  const allProps = {
    modalHoc: {
      onClose,
      opened: true,
    },
    buttonView: {
      variant: "white",
      component: "a",
      href: content?.uri || "",
      className: "btn-wp-primary " + styles.buttonView,
    },
  };

  const contentData = {
    priceMin: content.listingData?.newDevelopment?.priceMin || null,
    priceMax: content.listingData?.newDevelopment?.priceMax || null,
    views: content.listingData?.newDevelopment?.views || null,
    livingArea: content.listingData?.newDevelopment?.livingArea || null
  }

  return (
    <ModalHOC {...allProps.modalHoc}>
      <div className={styles.containerTopRow}>
        <div className={styles.carouselDivContainer}>
          <CarouselQuickView photos={content.photos} />
        </div>
        <div className={styles.contentDivContainer}>
          {
            (contentData.priceMin) &&
            <>
              <Divider size="xs" color="dark" className="my-5" />
              <label className={styles.labelContentTittle}>Price Ranges:</label>
              <label className={styles.labelContentValue}>${contentData.priceMin} - ${contentData.priceMax}</label>
            </>
          }
          {
            (contentData.livingArea) &&
            <>
              <Divider size="xs" color="dark" className="my-5" />
              <label className={styles.labelContentTittle}>Living Area:</label>
              <label className={styles.labelContentValue}>{contentData.livingArea}</label>
            </>
          }
           {
            (contentData.views) &&
            <>
              <Divider size="xs" color="dark" className="my-5" />
              <label className={styles.labelContentTittle}>Views:</label>
              <label className={styles.labelContentValue}>{contentData.views}</label>
            </>
          }
        </div>
      </div>
      <div className={styles.containerBottomRow}>
        <div className={styles.nameOfDevelopmentContainer}>
          <label className={styles.labelTitle}>{content.title}</label>
          <label className={styles.labelNameOfDevelopment}>
            {
              content.neighborhoods?.nodes.length ? content.neighborhoods?.nodes[0]?.name || '' : ''
            }
          </label>
        </div>
        <div className={styles.containerButtonView}>
          <Button {...allProps.buttonView}>View Project</Button>
        </div>
      </div>
    </ModalHOC>
  );
};

ModalQuickView.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

export default ModalQuickView;
