import { Button } from "@mantine/core";
import { ChevronDown, ChevronUp } from "tabler-icons-react";

const CarouselScreenXl = (props) => {
  const { urlImage, description, id, title, totalData } = props;
  const listArrows = new Array(totalData).fill(0);
  return (
    <div className="w-full h-full grid grid-cols-2">
      <div className="w-full flex flex-row">
        <div className="w-1/6 flex flex-col gap-5 content-center justify-center px-7">
          <Button
            variant="white"
            size={25}
            classNames={{
              root: "bg-transparent flex flex-row",
              label: "mr-0 text-black",
            }}
          >
            <ChevronUp size={25} className="mr-auto" />
          </Button>
          {listArrows.map((val) => {
            return (
              <div
                className="bg-[#FFB839] min-h-[40px] w-[5px] ml-[10px]"
                key={val}
              />
            );
          })}
          <Button
            variant="white"
            size={25}
            classNames={{
              root: "bg-transparent flex flex-row",
              label: "mr-0 text-black",
            }}
          >
            <ChevronDown size={25} />
          </Button>
        </div>
        <div className="w-4/6 flex flex-col content-center justify-center px-24">
          <label className="text-left mb-7 font-wp-semibold uppercase text-[16px] font-outfit">
            FROM OUR BLOG
          </label>
          <label className="text-left mb-7 font-wp-semibold text-[36px] font-outfit break-words leading-[45px]">
            {title}
          </label>
          <label className="text-left max-h-[200px] overflow-auto mb-16 font-wp-semibold text-[20px] font-outfit break-words leading-[25px]">
            {description}
          </label>
          <Button
            variant="white"
            className="max-w-[140px] text-black font-[400] font-outfit bg-white border-solid border-black border-[2px] hover:bg-black hover:text-white transition-all duration-500 ease-in-out"
          >
            Read More
          </Button>
        </div>
        <div className="w-1/6"></div>
      </div>
      <div className="w-full bg-green-500 min-h-screen">
        <img
          src={urlImage}
          alt="alt"
          className="w-full bg-cover h-full bg-no-repeat my-auto mx-auto"
        />
      </div>
    </div>
  );
};

export default CarouselScreenXl;
