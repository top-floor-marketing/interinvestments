import { Card, createStyles, Text, Select } from "@mantine/core";
import { useSpring, animated } from "react-spring";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const useStyles = createStyles((theme, _params) => ({
  cardContainer: {
    width: "100%",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p4,
    boxShadow: theme.shadows.md,
  },
  titleCard: {
    fontSize: "20px",
    fontWeight: "700",
  },
  select: {
    maxWidth: "250px",
    marginLeft: "auto",
  },
}));

const ChartTwo = (props) => {
  const { classes } = useStyles();
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    delay: 100,
    config: { duration: 500 },
  });
  const options = {
    chart: {
      type: "line",
      margin: [0, 0, 0, 0],
      spacingTop: 0,
      height: 250,
    },
    title: {
      text: null,
    },
    subtitle: {
      text: null,
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    plotOptions: {
      line: {
        dataLabels: {
          enabled: true,
        },
        enableMouseTracking: true,
      },
    },
    series: [
      {
        name: "Leads",
        data: [
          7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6,
        ],
      },
    ],
  };

  return (
    <animated.div style={{ ...animateProps, gridArea: props.gridArea }}>
       <Card className={classes.cardContainer}>
        <Text className={classes.titleCard}>Lead Timeline</Text>
        <Select
          placeholder="Select a filter type"
          className={classes.select}
          data={[
            { value: "year", label: "Year" },
            { value: "day", label: "Day" },
            { value: "month", label: "Month" },
            { value: "week", label: "Week" },
          ]}
          value={"year"}
        />
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Card>
    </animated.div>
  );
};

export default ChartTwo;
