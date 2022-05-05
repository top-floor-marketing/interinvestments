const CarouselMobile = (props) => {
  const { urlImage } = props;
  return (
    <div className="w-full h-full grid grid-cols-2 gap-7">
      <div className="w-full bg-red-500"></div>
      <div className="w-full bg-green-500 min-h-screen">
        <img
          src={urlImage}
          alt="alt"
          className="w-full bg-contain h-full bg-no-repeat"
        />
      </div>
    </div>
  );
};

export default CarouselMobile;
