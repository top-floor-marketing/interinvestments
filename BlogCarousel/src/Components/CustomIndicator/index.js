import { useState } from "react";
import { Button } from "@mantine/core";
import { ChevronDown, ChevronUp } from "tabler-icons-react";
import PropTypes from "prop-types";

import styles from "./styles_bc.module.scss";

const CustomIndicator = ({
  totalData,
  activeBlog,
  nextBlog,
  prevBlog,
}) => {

  const [listArrows] = useState(new Array(totalData).fill(0));

  const getClassActive = (index) => {
    const activeColor = "bg-[#FFB839]";
    return " bg-gray-200";// index === activeBlog ? ` ${activeColor} ` : " bg-gray-200 ";
  };

  return (
    <div className={styles.container}>
      <Button
        variant="white"
        size={25}
        classNames={{
          root: "bg-transparent flex flex-row",
          label: "mr-0 text-black",
        }}
        ref={nextBlog}
      >
        <ChevronUp size={25} className="mr-auto" />
      </Button>
      {listArrows.map((val, index) => {
        return (
          <div
            onClick={() => prevBlog()}
            className={styles.itemIndicadorScreenXl + getClassActive(index)}
            key={val + index}
          />
        );
      })}
      <Button
        variant="white"
        size={25}
        ref={prevBlog}
        classNames={{
          root: "bg-transparent flex flex-row",
          label: "mr-0 text-black",
        }}
      >
        <ChevronDown size={25} />
      </Button>
    </div>
  );
};

CustomIndicator.protTypes = {
  totalData: PropTypes.number,
  activeBlog: PropTypes.activeBlog,
  nextBlog: PropTypes.function,
  prevBlog: PropTypes.function,
  specificBlog: PropTypes.function,
  isMobileScren: PropTypes.bool,
};

export default CustomIndicator;
