import React, { useState, forwardRef, cloneElement, memo } from 'react';
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
  Tooltip,
  ActionIcon,
  SegmentedControl,
  Center
} from '@mantine/core';
import { Filter, FilterOff, User, Calendar } from 'tabler-icons-react';

import random from 'lodash/random';

import { capitalize } from 'lodash';

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
    marginBottom: theme.other.spacing.p8,
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

const PipelineColumnVirtual = (props) => {
  const { refetch, totalData, data, children, title, color } = props;

  const { classes } = useStyles({ color });

  const [filterBy, setFilterBy] = useState({
    value: 'date',
    order: 'desc',
  });

  console.log("PipelineColumnVirtual -> filterBy", filterBy)

  const openSortModal = () =>
    openConfirmModal({
      title: null,
      header: 'Add Property',
      centered: true,
      withCloseButton: false,
      children: (
        <Box className={classes.boxDialog}>
          <Text component='h3'>{title}</Text>
          <Text>Sort by: {capitalize(filterBy?.value) +' - '+ capitalize(filterBy?.order)}</Text>
          <SegmentedControl
            value={filterBy?.value}
            onChange={(value) => setFilterBy({ ...filterBy, value })}
            data={[
              { label: (
                <Center>
                  <User size="1rem" />
                  <Box ml={10}>Name</Box>
                </Center>
              ),
               value: 'name' 
              },
              { label: (
                <Center>
                  <Calendar size="1rem" />
                  <Box ml={10}>Date</Box>
                </Center>
              ), value: 'date' },
            ]}
          />
        </Box>
      ),
      labels: { confirm: 'Apply', cancel: 'close' },
      confirmProps: { color: 'primary' },
      onCancel: () => console.log('Cancel'),
      onConfirm: () => console.log('Cancel'),
      zIndex: 9999,
    });

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

  // containerInfinite class for css-scrollbar styles
  // idGrid class for get clientHeight in scroll function
  return (
    <Box className={classes.container}>
      <Paper className={classes.paperStatus}>
        <Text>{title}</Text>
        <Tooltip multiline color={'dark'} label={`Sort by ${title}`}>
          <ActionIcon onClick={() => openSortModal()}>
            <Filter size={20} color='#5398ff' />
          </ActionIcon>
        </Tooltip>
      </Paper>
      <Box ref={refParentBox} className='parentContainerInfinite'>
        <Grid
          itemData={data}
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
                {cloneElement(children, { ...data[rowIndex] }, null)}
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
