import PropTypes from "prop-types";
import { Button } from "@mantine/core";

import ModalHOC from "./ModalHOC";
import CarouselQuickView from "./CarouselQuickView";

import styles from "./styles.module.scss";

const ModalQuickView = ({ data, onClose }) => {
  const { id, content } = data;
  const allProps = {
    modalHoc: {
      onClose,
      opened: true,
    },
    buttonView: {
      variant: "white",
      component: "a",
      href: `/property?id=${id}`,
      className: styles.buttonView,
    },
  };
  return (
    <ModalHOC {...allProps.modalHoc}>
      <div className={styles.containerTopRow}>
        <div className={styles.carouselDivContainer}>
          <CarouselQuickView photos={content.photos} />
        </div>
        <div className={styles.contentDivContainer}></div>
      </div>
      <div className={styles.containerBottomRow}>
        <div className={styles.nameOfDevelopmentContainer}>
          <label className={styles.labelTitle}>{content.title}</label>
          <label className={styles.labelNameOfDevelopment}>
            {content.listingData.newDevelopment.nameOfDevelopment}
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
