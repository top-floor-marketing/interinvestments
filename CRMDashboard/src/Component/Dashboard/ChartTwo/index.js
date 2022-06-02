import { Box, Card, createStyles } from "@mantine/core";
import { useSpring, animated } from "react-spring";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardContainer: {
    width: "100%",
    height: "100%",
    minHeight: "400px",
    boxShadow: theme.shadows.md,
  },
}));

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ChartTwo = (props) => {
  const { classes } = useStyles();
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    reset: false,
    delay: 200,
    config: { duration: 400 },
  });
  return (
    <animated.div style={{ ...animateProps, gridArea: props.gridArea }}>
      <Card className={classes.cardContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={400} height={400} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </animated.div>
  );
};

export default ChartTwo;
