import { Button } from "@mantine/core";

import CustomIndicator from "../../CustomIndicator";

<<<<<<< HEAD
import styles from "./blog_grid_styles.module.scss";
=======
import styles from "./styles.cb.module.scss";
>>>>>>> e695d59bd466a9d4a55fa894ee3a3ee47ec9fc42

const CarouselScreenXl = (props) => {
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
    <div className={styles.container}>
      <div className="w-full flex flex-row">
        <div className="w-1/6">
          <CustomIndicator {...allProps.customIndicador} />
        </div>
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
        <div className="w-1/6"></div>
      </div>
      <div className={styles.containerImage}>
        <img src={urlImage} alt="alt" className={styles.image} />
      </div>
    </div>
  );
};

export default CarouselScreenXl;
