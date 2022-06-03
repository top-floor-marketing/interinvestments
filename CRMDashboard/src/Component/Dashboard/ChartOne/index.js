import { Card, createStyles, Text } from "@mantine/core";
import { useSpring, animated } from "react-spring";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "100%",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    gap: theme.other.spacing.p5,
    boxShadow: theme.shadows.md,
  },
  titleCard: {
    fontSize: "20px",
    fontWeight: "700",
  },
}));

const ChartOne = (props) => {
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
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
      animation: true,
      margin: [0, 0, 0, 0],
      spacingTop: 0,
      height: 300,
    },
    legend: {
      enabled: true,
    },
    credits: {
      enabled: false,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxHeight: 300,
          },
          chartOptions: {
            legend: {
              enabled: false,
            },
          },
        },
      ],
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
        },
      },
    },
    series: [
      {
        name: "Leads Status",
        colorByPoint: true,
        data: [
          {
            name: "Open",
            y: 60,
            sliced: true,
            selected: true,
          },
          {
            name: "In progress",
            y: 10,
          },
          {
            name: "Paused",
            y: 5,
          },
          {
            name: "Cancelled",
            y: 15,
          },
          {
            name: "Completed",
            y: 10,
          },
        ],
      },
    ],
  };

  return (
    <animated.div style={{ ...animateProps, gridArea: props.gridArea }}>
      <Card className={classes.cardContainer}>
        <Text className={classes.titleCard}>Listing Stats</Text>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Card>
    </animated.div>
  );
};

export default ChartOne;
