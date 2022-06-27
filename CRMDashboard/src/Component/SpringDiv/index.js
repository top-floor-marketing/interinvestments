import { useSpring, animated } from "react-spring";
import PropTypes from 'prop-types';

const SpringDiv = (props) => {
  const { style, delay = 500, duration = 500, children } = props;
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay,
    config: { duration },
  });

  return (
    <animated.div style={{ ...animateProps, ...style }}>
      {children}
    </animated.div>
  );
};

SpringDiv.propTypes = {
  style: PropTypes.object,
  delay: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.element
};


export default SpringDiv;
