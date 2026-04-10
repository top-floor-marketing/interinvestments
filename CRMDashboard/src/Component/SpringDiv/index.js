import { useSpring, animated } from '@react-spring/web';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './index.css';

const SpringDiv = (props) => {
  const { style, delay = 500, duration = 500, children, className } = props;
  const animateProps = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay,
    config: { duration },
  });

  return (
    <animated.div className={classNames({
      "springDivContainer": props.fullHeight, [className]: className
    })} style={{ ...animateProps, ...style }}>
      {children}
    </animated.div>
  );
};

SpringDiv.propTypes = {
  style: PropTypes.object,
  delay: PropTypes.number,
  duration: PropTypes.number,
  children: PropTypes.element,
  fullHeight: PropTypes.bool,
  className: PropTypes.string,
};


export default SpringDiv;
