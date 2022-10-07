import PropTypes from "prop-types";
import { useRef } from "react";
import { Button, Divider, Box } from "@mantine/core";
import { ChevronRight, ChevronLeft } from "tabler-icons-react";

import ModalHOC from "./ModalHOC";
import CarouselQuickView from "./CarouselQuickView";

import styles from "./styles_gd.module.scss";

const ModalQuickView = ({ data, onClose }) => {
  const { content } = data;

  const childRef = useRef(null);

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
    buttonChangeCarousel: {
      variant: "white",
      className: "group " + styles.buttonChangeCarousel,
    }
  };

  const prevSlider = () => {
    if(childRef.current) {
      childRef.current.prev();
    }
  }

  const nextSlider = () => {
    if(childRef.current) {
      childRef.current.next();
    }
  }

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
          <CarouselQuickView ref={childRef} photos={content.photos} />
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
          <Box className={styles.disclaimer}>
          <Divider size="0px" color="dark" className="my-5" />
          <label>Prices, Terms and Availability are subject to changes without notice. Square footage is believed to be accurate, but may be revised.</label>

          </Box>
        
        </div>
      </div>
      <div className={styles.containerBottomRow}>
        <div className={styles.nameOfDevelopmentContainer}>
          <div className={styles.nameRowDevelopment}>
          <label className={styles.labelTitle}>{content.title}</label>
          <label className={styles.labelNameOfDevelopment}>
            {
              content.neighborhoods?.nodes.length ? content.neighborhoods?.nodes[0]?.name || '' : ''
            }
          </label>
          </div>
          <div className={styles.externalButtonsDevelopment}>
            <Button {...allProps.buttonChangeCarousel} onClick={() => prevSlider()}>
              <ChevronLeft size={24} color="#000" className={"group-hover:stroke-[#FFB839]"}/>
            </Button>
            <Button {...allProps.buttonChangeCarousel} onClick={() => nextSlider()}>
              <ChevronRight className={"group-hover:stroke-[#FFB839]"}  size={24} color="#000" />
            </Button>
          </div>
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
