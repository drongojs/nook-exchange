import React from 'react';
import {
  Typography,
  makeStyles,
  colors,
} from '@material-ui/core';
import {
  FiberManualRecord as CircleIcon,
} from '@material-ui/icons';

interface Props {
  value: boolean,
  compact?: boolean,
}

const useStyles = makeStyles({
  status: {
    display: 'flex',
    alignItems: 'center',
  },
  statusIcon: ({ value }: { value: boolean }) => ({
    color: value ? colors.green[500] : colors.red[500],
  }),
  statusText: {
    maginLeft: '0.5em',
  },
});

const Indicator = ({
  value = false,
  compact = false,
}: Props) => {
  const styles = useStyles({ value });

  return (
    <Typography
      variant="caption"
      className={styles.status}
    >
      <CircleIcon
        className={styles.statusIcon}
        fontSize="small"
      />
      <If condition={!compact}>
        <span className={styles.statusText}>
          {value ? 'Online' : 'Offline'}
        </span>
      </If>
    </Typography>
  );
};

export default Indicator;
