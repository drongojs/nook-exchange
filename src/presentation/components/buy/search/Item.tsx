import React from 'react';
import {
  Item as ItemType,
} from 'core/item';
import {
  Grid,
  Card,
  CardMedia,
  CardHeader,
  makeStyles,
  CardActionArea,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

interface Props extends ItemType {}

const useStyles = makeStyles({
  image: {
    height: 0,
    paddingTop: '56.25%',
  },
  title: {
    textAlign: 'center',
  },
});

const Item = ({
  id,
  image,
  name,
}: Props) => {
  const to = `/buy/item/${encodeURIComponent(id)}`;
  const styles = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardActionArea component={RouterLink} to={to}>
          <CardMedia
            image={image}
            className={styles.image}
          />
          <CardHeader
            title={name}
            className={styles.title}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default Item;
