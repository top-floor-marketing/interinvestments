import CustomIndicator from "../../CustomIndicator";
import { Button } from "@mantine/core";

import styles from "./styles_bc.module.scss";

const CarouselMobile = (props) => {
  const {
    urlImage,
    description,
    id,
    title,
    totalData,
    nextBlog,
    prevBlog,
    specificBlog,
    activeBlog,
  } = props;
  const allProps = {
    customIndicador: {
      totalData,
      nextBlog,
      prevBlog,
      specificBlog,
      activeBlog,
    },
  };
  return (
    <div
      className="w-full min-h-[600px] bg-fixed bg-center bg-cover bg-no-repeat flex flex-col relative"
      style={{
        backgroundImage: `url(${urlImage})`,
      }}
    >
      <div className="bg-black absolute h-full w-full opacity-40 z-0" />
      <div className="w-full flex flex-row h-full absolute z-1">
        <div className="w-[10%] md:w-[6%] z-1">
          <CustomIndicator {...allProps.customIndicador} />
        </div>
        <div className="w-[90%] md:w-[88%] z-1">
          <div className={styles.content}>
            <label className={styles.labelFrom}>FROM OUR BLOG</label>
            <label className={styles.labelTitle}>{title}</label>
            <label className={styles.description}>{description}</label>
            <Button
              component="a"
              href={`/post?=${id}`}
              variant="white"
              className={styles.buttonReadMore}
            >
              Read More
            </Button>
          </div>
        </div>
        <div className="w-[0%] md:w-[6%] z-1"></div>
      </div>
    </div>
  );
};

export default CarouselMobile;
