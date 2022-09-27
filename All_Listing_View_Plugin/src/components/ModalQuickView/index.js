import PropTypes from "prop-types";
import { useRef, useState } from "react";
// mantine
import { Button, Divider, Box } from "@mantine/core";
import { ChevronRight, ChevronLeft } from "tabler-icons-react";
// componets
import CarouselQuickView from "./CarouselQuickView";
import OverlayLoading from '../OverlayLoading'
// hooks
import ModalHOC from "./ModalHOC";
// react-query
import { useQueryHelper } from '../../GraphqlClient/useRequest';
import { GET_SINGLE_LISTING_GQL } from '../../GraphqlClient/GQL'

//lodash
import toInteger from 'lodash/toInteger';

// styles
import styles from "./styles_alv.module.scss";

const URL_QUERY_ID_NAME = "agent-id";
// const ID_LOCALSTORAGE_NAME = "lead-agent";

const ModalQuickView = ({ onClose, idSingleListing }) => {
  const [content, setContent] = useState(null)

  const childRef = useRef(null);

  // Get Specific Listing
  const { isLoading, isFetching } = useQueryHelper({
    name: "GET_SINGLE_LISTING_GQL_By_",
    gql: GET_SINGLE_LISTING_GQL,
    config: {
      onSuccess: (response) => {
        const { listings } = response;
        let content = null;
        if (listings.nodes.length > 0) {
          const findListing = listings.nodes[0];
          content = {
            photos: findListing.listingData?.newDevelopment?.photos || [],
            ...findListing,
          };
        }
        setContent(content)
      },
      onError: () => {
        onClose()
      },
    },
    variables: {
      id: idSingleListing,
    },
  });

  const queryParams = new URLSearchParams(window.location.search);
  const idInUrl = toInteger(queryParams.get(URL_QUERY_ID_NAME));
  const finalUri = (idInUrl) ? `${content?.uri||""}?${URL_QUERY_ID_NAME}=${idInUrl}&shared=true` : (content?.uri || "")

  const allProps = {
    modalHoc: {
      onClose,
      opened: true,
    },
    buttonView: {
      variant: "white",
      component: "a",
      href: finalUri,
      className: "btn-wp-primary " + styles.buttonView,
    },
    buttonChangeCarousel: {
      variant: "white",
      className: "group " + styles.buttonChangeCarousel,
    }
  };

  const prevSlider = () => {
    if (childRef.current) {
      childRef.current.prev();
    }
  }

  const nextSlider = () => {
    if (childRef.current) {
      childRef.current.next();
    }
  }


  if (isFetching || isLoading) {
    return (
      <OverlayLoading />
    )
  }

  if (content) {
    const contentData = {
      priceMin: content.listingData?.newDevelopment?.priceMin || null,
      priceMax: content.listingData?.newDevelopment?.priceMax || null,
      views: content.listingData?.newDevelopment?.views || null,
      livingArea: content.listingData?.newDevelopment?.contentLivingArea?.livingArea || null
    }
    return (
      <ModalHOC {...allProps.modalHoc}>
        <Box className={styles.containerTopRow}>
          <Box className={styles.carouselDivContainer}>
            <CarouselQuickView ref={childRef} photos={content.photos} />
          </Box>
          <Box className={styles.contentDivContainer}>
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
          </Box>
        </Box>
        <Box className={styles.containerBottomRow}>
          <Box className={styles.nameOfDevelopmentContainer}>
            <Box className={styles.nameRowDevelopment}>
              <label className={styles.labelTitle}>{content.title}</label>
              <label className={styles.labelNameOfDevelopment}>
                {
                  content.neighborhoods?.nodes.length ? content.neighborhoods?.nodes[0]?.name || '' : ''
                }
              </label>
            </Box>
            <Box className={styles.externalButtonsDevelopment}>
              <Button {...allProps.buttonChangeCarousel} onClick={() => prevSlider()}>
                <ChevronLeft size={24} color="#000" className={"group-hover:stroke-[#FFB839]"} />
              </Button>
              <Button {...allProps.buttonChangeCarousel} onClick={() => nextSlider()}>
                <ChevronRight className={"group-hover:stroke-[#FFB839]"} size={24} color="#000" />
              </Button>
            </Box>
          </Box>
          <Box className={styles.containerButtonView}>
            <Button {...allProps.buttonView}>View Project</Button>
          </Box>
        </Box>
      </ModalHOC>
    );
  }
  return null
}

ModalQuickView.defaultProps = {
  data: {
    content: {}
  },
  onClose: () => { console.log('onClose') }
}

ModalQuickView.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};

export default ModalQuickView
