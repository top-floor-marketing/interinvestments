import React, { useRef } from "react";
// mantine
import { Text, Box, Image } from "@mantine/core";
import { Mail, Phone } from 'tabler-icons-react';
import DOMPurify from "dompurify";
// styles
import styles from "./styles.ca.module.scss";
// Icons
import facebookIcon from "../../assets/faceIcon.svg";
import twitterIcon from "../../assets/twitterIcon.svg";
import instagramIcon from "../../assets/instagramIcon.svg";
import linkedinIcon from "../../assets/linkedinIcon.svg";
import tiktokIcon from "../../assets/tiktokIcon.svg";
import youtubeIcon from "../../assets/youtubeIcon.svg";
import rumbleIcon from "../../assets/rumbleIcon.svg";
// utils
import startsWith from "lodash/startsWith";

const InfoCard = (props) => {
  const { dataAgent } = props;

  const refEmail = useRef(null);
  const refPhone = useRef(null);
  const sanitizedContentData = () => ({
    __html: DOMPurify.sanitize(dataAgent?.content),
  });

  const openExternalApp = (type) => {
    if(type === 'email' && refEmail?.current) {
      refEmail.current.click();
    } else if(refPhone?.current) {
      refPhone.current.click();
    }
  }

  return (
    <>
      <Text
        data-aos-once="true"
        data-aos-duration="900"
        data-aos-delay="700"
        data-aos="fade-left"
        component="h1"
        className={styles.titleNameAgent}
      >
        {`${dataAgent?.firstName} ${dataAgent?.lastName}`}
      </Text>
      <Text
        data-aos-once="true"
        data-aos-duration="900"
        data-aos-delay="900"
        data-aos="fade-left"
        component="span"
        className={styles.PositionAgent}
      >
        {dataAgent?.position}
      </Text>
      <Box
        data-aos-once="true"
        data-aos-duration="900"
        data-aos-delay="1100"
        data-aos="fade-left"
        dangerouslySetInnerHTML={sanitizedContentData()}
        className={styles.contentCArdAgent}
      ></Box>
      <Box className={styles.contactAgent}>
        <Box className="flex flex-row gap-2 mb-4 items-center cursor-pointer" onClick={() => openExternalApp('email')} >
          <Mail />
          <Text
            ref={refEmail}
            data-aos-once="true"
            data-aos-duration="900"
            data-aos-delay="1300"
            data-aos="fade-left"
            component="a"
            href={`mailto:${dataAgent?.email}`}
          >
            {dataAgent?.email}
          </Text>
        </Box>

        <Box className="flex flex-row gap-2 items-center cursor-pointer" onClick={() => openExternalApp('phone')}>
          {dataAgent?.phone && (
            <>
              <Phone />
              <Text
                ref={refPhone}
                data-aos-once="true"
                data-aos-duration="900"
                data-aos-delay="1500"
                data-aos="fade-left"
                component="a"
                href={`tel:${dataAgent?.phone}`}
              >
                {dataAgent?.phone}
              </Text>
            </>
          )}
        </Box>

      </Box>
      <Box className={styles.containerSocialMedia}>
        {startsWith(dataAgent.facebook, "https") && (
          <Image
            data-aos-once="true"
            data-aos-duration="900"
            data-aos-delay="1700"
            data-aos="fade-left"
            component="a"
            target="_blank"
            href={dataAgent?.facebook}
            className={styles.imageIcon}
            src={facebookIcon}
            alt="facebookIcon"
          />
        )}
        {startsWith(dataAgent.twitter, "https") && (
          <Image
            data-aos-once="true"
            data-aos-duration="900"
            data-aos-delay="1900"
            data-aos="fade-left"
            component="a"
            target="_blank"
            href={dataAgent?.twitter}
            className={styles.imageIcon}
            src={twitterIcon}
            alt="twitterIcon"
          />
        )}

        {startsWith(dataAgent?.instagram, "https") && (
          <Image
            data-aos-once="true"
            data-aos-duration="900"
            data-aos-delay="2100"
            data-aos="fade-left"
            component="a"
            target="_blank"
            href={dataAgent?.instagram}
            className={styles.imageIcon}
            src={instagramIcon}
            alt="instagramIcon"
          />
        )}
        {startsWith(dataAgent?.linkedin, "https") && (
          <Image
            data-aos-once="true"
            data-aos-duration="900"
            data-aos-delay="2300"
            data-aos="fade-left"
            component="a"
            target="_blank"
            href={dataAgent?.linkedin}
            className={styles.imageIcon}
            src={linkedinIcon}
            alt="linkedinIcon"
          />
        )}

        {startsWith(dataAgent?.tiktok, "https") && (
          <Image
            data-aos-once="true"
            data-aos-duration="900"
            data-aos-delay="2500"
            data-aos="fade-left"
            component="a"
            target="_blank"
            href={dataAgent?.tiktok}
            className={styles.imageIcon}
            src={tiktokIcon}
            alt="tiktokIcon"
          />
        )}

        {startsWith(dataAgent?.youtube, "https") && (
          <Image
            data-aos-once="true"
            data-aos-duration="900"
            data-aos-delay="2700"
            data-aos="fade-left"
            component="a"
            target="_blank"
            href={dataAgent?.youtube}
            className={styles.imageIcon}
            src={youtubeIcon}
            alt="youtubeIcon"
          />
        )}

        {startsWith(dataAgent?.rumble, "https") && (
          <Image
            data-aos-once="true"
            data-aos-duration="900"
            data-aos-delay="2900"
            data-aos="fade-left"
            component="a"
            target="_blank"
            href={dataAgent?.rumble}
            className={styles.imageIcon}
            src={rumbleIcon}
            alt="rumbleIcon"
          />
        )}
      </Box>
    </>
  );
};

export default InfoCard;
