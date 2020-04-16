import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  makeStyles,
  Paper,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  getOrder,
  isOrderReady,
} from 'domain/selectors/order';
import {
  getItem,
} from 'domain/selectors/item';
import Indicator from '../../common/Indicator';
import { ModalRoutes, Currency } from 'domain/constants';
import { getIsland, isIslandOnline } from 'domain/selectors/island';
import { getEntry } from 'domain/selectors/entries';
import Price from '../../common/Price';
import useDialog from 'presentation/hooks/useDialog';

interface Props {
  id: string,
}

const Order = ({ id }: Props) => {
  const order = getOrder(id).data;
  const item = getItem(order?.item ?? '').data;
  const island = getIsland(order?.island ?? '').data;
  const ready = isOrderReady(id);
  const online = isIslandOnline(order?.island ?? '');
  const { open } = useDialog(ModalRoutes.CANCEL_ORDER);
  const entry = getEntry({
    islandId: order?.island ?? '',
    itemId: order?. item ?? '',
  }).data;

  if (order == null) {
    return null;
  }
  if (item == null) {
    return null;
  }
  if (island == null) {
    return null;
  }
  if (entry == null) {
    return null;
  }

  return (
    <Paper>
      <ListItem dense>
        <ListItemText>{item.name}</ListItemText>
        <ListItemText>
          <Price
            currency={entry.currency ?? Currency.BELLS}
            amount={entry.price ?? item.price}
          />
        </ListItemText>
        <ListItemText>{order.status}</ListItemText>
        <ListItemText>
          <Indicator value={online}/>
        </ListItemText>
        <ListItemSecondaryAction>
          <If condition={ready}>
            <Button
              size="small"
              color="primary"
              disabled={!online}
              component={RouterLink}
              to={`/order/${id}`}
            >
              Collect!
            </Button>
          </If>
          <Button
            size="small"
            color="secondary"
            onClick={() => open(id)}
          >
            Cancel
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    </Paper>
  );
};

export default Order;
