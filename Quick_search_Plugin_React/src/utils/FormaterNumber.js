const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    // convert to K for number from > 1000 < 1 million
    return {
      number: parseInt((num / 1000).toFixed(1)),
      tag: "K",
    };
  } else if (num > 999999) {
    // convert to M for number from > 1 million
    return {
      number: parseInt((num / 1000000).toFixed(1)),
      tag: "M",
    };
  }
  return {
    number: num,
    tag: "",
  };
};

export default numFormatter;
