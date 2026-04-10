import React, {
  useState,
  forwardRef,
  cloneElement,
  memo,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';

import { FixedSizeGrid as Grid } from 'react-window';
// import { DatabaseOff } from 'tabler-icons-react';
import { openConfirmModal } from '@mantine/modals';

import { useId, useElementSize } from '@mantine/hooks';
import {
  Box,
  Paper,
  createStyles,
  Text,
  ActionIcon,
  Center,
  HoverCard,
  SegmentedControl,
} from '@mantine/core';
import {
  Filter,
  ArrowMoveUp,
  ArrowMoveDown,
  User,
  Calendar,
} from 'tabler-icons-react';

import random from 'lodash/random';

import { toLower } from 'lodash';

import './styles_infinite.css';

// 1.25rem === p5
const GUTTER_SIZE = 16;
const ROW_HEIGHT = 70;

const useStyles = createStyles((theme, _params) => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.other.spacing.p4,
  },
  paperStatus: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    fontSize: '18px',
    fontWeight: 600,
    gap: theme.other.spacing.p4,
    padding: theme.other.spacing.p4,
    borderTop: `10px ${theme.colors[_params['color']][6]} solid`,
    '&:hover': {
      borderTop: `10px ${theme.colors[_params['color']][8]} solid`,
    },
    justifyContent: 'space-between',
  },
  noData: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    alignItems: 'center',
    padding: theme.other.spacing.p8,
  },
  boxDialog: {
    borderTop: `10px ${theme.colors[_params['color']][6]} solid`,
    borderRadius: '10px',
    padding: theme.other.spacing.p4,
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    h3: {
      fontSize: '18px',
      fontWeight: 600,
      margin: 0,
    },
    fontSize: '14px',
    fontWeight: 200,
    gap: theme.other.spacing.p4,
  },
}));

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      maxWidth: '100%',
    }}
    {...rest}
  />
));

const DEFAULT_SORT = {
  value: 'date',
  order: 'asc',
};

const PipelineColumnVirtual = (props) => {
  const { refetch, totalData, data, children, title, color } = props;

  const { classes } = useStyles({ color });

  const [filterBy, setFilterBy] = useState(DEFAULT_SORT);

  const {
    ref: refParentBox,
    width: widthParent,
    height: heightParent,
  } = useElementSize();

  const [idGrid] = useState(`${useId()}_${random(100, 10000)}`);

  const onScroll = (e) => {
    const { scrollTop } = e;
    const gridContainer =
      document.getElementsByClassName(idGrid)[0]?.firstChild?.clientHeight ||
      null;
    if (gridContainer && refetch && heightParent) {
      if (heightParent + scrollTop === gridContainer) {
        refetch();
      }
    }
  };

  const dataSort = useCallback(() => {
    if (filterBy) {
      const { value, order } = filterBy;
      if (value === 'firstName') {
        if (order === 'asc') {
          // Orden ascendente (ASC) [value] === 'firstName'
          return [...data].sort((a, b) => {
            if (toLower(a[value]) < toLower(b[value])) return -1;
            if (toLower(a[value]) > toLower(b[value])) return 1;
            return 0;
          });
        }

        // Orden descendente (DESC)
        return [...data].sort((a, b) => {
          if (toLower(a[value]) > toLower(b[value])) return -1;
          if (toLower(a[value]) < toLower(b[value])) return 1;
          return 0;
        });
      }

      // date order
      if (order === 'asc') {
        // Orden ascendente (ASC)
        return [...data].sort((a, b) => {
          if (a.date.isBefore(b.date)) return -1;
          if (a.date.isAfter(b.date)) return 1;
          return 0;
        });
      }

      // Orden descendente (DESC)
      return [...data].sort((a, b) => {
        if (a.date.isAfter(b.date)) return -1;
        if (a.date.isBefore(b.date)) return 1;
        return 0;
      });

    } else {
      return data;
    }
  }, [data, filterBy]);

  // containerInfinite class for css-scrollbar styles
  // idGrid class for get clientHeight in scroll function
  return (
    <Box className={classes.container}>
      <Paper className={classes.paperStatus}>
        <Text>{title}</Text>
        <HoverCard
          width={250}
          shadow='md'
          withArrow
          openDelay={200}
          closeDelay={400}
        >
          <HoverCard.Target>
            <ActionIcon>
              <Filter size={20} color='#5398ff' />
            </ActionIcon>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Box className={classes.boxDialog}>
              <Text>
                Sort by:
              </Text>
              <SegmentedControl
                value={filterBy?.value}
                onChange={(value) => setFilterBy({ ...filterBy, value })}
                data={[
                  {
                    label: (
                      <Center>
                        <Calendar size='1rem' />
                        <Box ml={10}>Date</Box>
                      </Center>
                    ),
                    value: 'date',
                  },
                  {
                    label: (
                      <Center>
                        <User size='1rem' />
                        <Box ml={10}>Name</Box>
                      </Center>
                    ),
                    value: 'firstName',
                  },
                ]}
              />
              <SegmentedControl
                value={filterBy?.order}
                onChange={(order) => setFilterBy({ ...filterBy, order })}
                data={[
                  {
                    label: (
                      <Center>
                        <ArrowMoveUp size='1rem' />
                        <Box ml={10}>Asc</Box>
                      </Center>
                    ),
                    value: 'asc',
                  },
                  {
                    label: (
                      <Center>
                        <ArrowMoveDown size='1rem' />
                        <Box ml={10}>Desc</Box>
                      </Center>
                    ),
                    value: 'desc',
                  }
                  
                ]}
              />
            </Box>
          </HoverCard.Dropdown>
        </HoverCard>
      </Paper>
      <Box ref={refParentBox} className='parentContainerInfinite'>
        <Grid
          itemData={dataSort()}
          className={`containerInfinite ${idGrid}`}
          onScroll={onScroll}
          columnCount={1}
          columnWidth={widthParent}
          height={heightParent}
          innerElementType={innerElementType}
          rowCount={totalData}
          rowHeight={ROW_HEIGHT + GUTTER_SIZE}
          width={widthParent}
        >
          {({ rowIndex, style }) => {
            return (
              <div
                key={rowIndex}
                style={{
                  ...style,
                  width: style.width,
                  maxWidth: '100%',
                  top: style.top,
                  height: style.height - GUTTER_SIZE,
                }}
              >
                {cloneElement(children, { ...dataSort()[rowIndex] }, null)}
              </div>
            );
          }}
        </Grid>
      </Box>
    </Box>
  );
};

PipelineColumnVirtual.defaultProps = {
  totalData: 0,
  refetch: null,
  data: [],
  children: null,
  color: 'primary',
  title: 'null',
};

PipelineColumnVirtual.propTypes = {
  data: PropTypes.array,
  refetch: PropTypes.func,
  totalData: PropTypes.number,
  children: PropTypes.element,
  color: PropTypes.oneOf(['primary', 'secondary', 'error', 'success', 'info']),
  title: PropTypes.string,
};

export default memo(PipelineColumnVirtual);
