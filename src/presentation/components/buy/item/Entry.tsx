import React, { useCallback } from 'react';
import {
  ListItem,
  ListItemText,
  Paper,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  Check as CheckIcon,
} from '@material-ui/icons';
import { getIsland, isIslandOnline } from 'domain/selectors/island';
import useRefreshDate from 'presentation/hooks/useRefreshDate';
import {
  Item,
} from 'core/item';
import {
  Entry as EntryType,
} from 'core/entries';
import Price from '../../common/Price';
import { getOrderByExact, isOrderOpen } from 'domain/selectors/order';
import Indicator from '../../common/Indicator';
import useDialog from 'presentation/hooks/useDialog';
import { ModalRoutes, Currency } from 'domain/constants';

const getData = (entry: EntryType) => {
  const island = getIsland(entry.island).data;
  const online = isIslandOnline(entry.island);
  const order = getOrderByExact(entry.item, entry.island).data;
  const date = useRefreshDate(island?.utcTimeOffset);
  const hasOrdered = order != null && isOrderOpen(order.id);

  return {
    island,
    online,
    order,
    date,
    hasOrdered,
  };
};

interface Props {
  entry: EntryType,
  item: Item,
}

const Entry = ({
  entry,
  item,
}: Props) => {
  const {
    date,
    hasOrdered,
    island,
    online,
  } = getData(entry);

  const { open } = useDialog(ModalRoutes.REQUEST_ORDER);

  const handleClick = useCallback(() => {
    if (!hasOrdered) {
      open(entry.id);
    }
  }, [ hasOrdered, open, entry.id ]);

  if (island == null || item == null) {
    return null;
  }

  return (
    <>
      <Paper>
        <ListItem dense button={!hasOrdered as false} onClick={handleClick}>
          <ListItemText>
            <Price
              currency={entry.currency ?? Currency.BELLS}
              amount={entry.price ?? item.price}
            />
          </ListItemText>
          <ListItemText>{island.user}</ListItemText>
          <ListItemText secondary={date.toLocaleString()}/>
          <ListItemText>
            <Indicator value={online} compact/>
          </ListItemText>
          <If condition={hasOrdered}>
            <ListItemSecondaryAction>
              <CheckIcon color="primary"/>
            </ListItemSecondaryAction>
          </If>
        </ListItem>
      </Paper>
    </>
  );
};

export default Entry;
