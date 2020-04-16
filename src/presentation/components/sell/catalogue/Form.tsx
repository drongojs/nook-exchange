import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { Item as ItemType } from 'core/item';
import { Entry as EntryType } from 'core/entries';
import {
  Grid,
  makeStyles,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import {
  Currency as Currencies,
} from 'domain/constants';
import Currency from 'presentation/components/common/Currency';
import useInput from 'presentation/hooks/useInput';
import { useDebounce } from 'use-debounce';
import { useSaveEntry, useDeleteEntry } from 'application/actions/entries';

interface Props {
  item: ItemType,
  entry: EntryType | undefined,
  onSave: ReturnType<typeof useSaveEntry>[0],
  onDelete: ReturnType<typeof useDeleteEntry>[0],
}

const useStyles = makeStyles({
  root: {
    padding: '1rem',
  },
  actions: {
    display: 'flex',
  },
  deleteButton: {
    marginLeft: 'auto',
  },
});

const useInputs = ({
  entry,
  item,
}: {
  entry?: EntryType,
  item: ItemType,
}) => {
  const [ currency, onCurrencyChange ] = useInput(entry?.currency ?? Currencies.BELLS);
  const [ price, onPriceChange ] = useInput(entry?.price ?? item.price, { parse: Number });

  return {
    currency,
    onCurrencyChange,
    price,
    onPriceChange,
  };
};

const useAutosave = ({
  entry,
  item,
  price,
  currency,
  onSave,
}: {
  entry?: EntryType,
  item: ItemType,
  price: number,
  currency: string,
  onSave: ReturnType<typeof useSaveEntry>[0],
}) => {
  const firstRender = useRef(true);
  const [ debouncedCurrency ] = useDebounce(currency, 1000);
  const [ debouncedPrice ] = useDebounce(price, 1000);

  const changed = useMemo(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return false;
    }
    if (debouncedCurrency !== entry?.currency) {
      return true;
    }
    if (debouncedPrice !== entry?.price) {
      return true;
    }
    return false;
  }, [ entry?.currency, entry?.price, debouncedCurrency, debouncedPrice ]);

  useEffect(() => {
    if (!changed) {
      return;
    }

    onSave({
      item: item.id,
      ...entry,
      currency: debouncedCurrency,
      price: debouncedPrice,
    });
  }, [ changed ]);
};

const Form = ({
  entry,
  item,
  onDelete,
  onSave,
}: Props) => {
  const styles = useStyles();
  const {
    currency,
    onCurrencyChange,
    onPriceChange,
    price,
  } = useInputs({
    entry,
    item,
  });

  useAutosave({
    currency,
    item,
    onSave,
    price,
    entry,
  });

  const handleDelete = useCallback(() => {
    onDelete(entry?.id ?? '');
  }, [ onDelete, entry?.id ]);

  return (
    <div className={styles.root}>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            id="price"
            label="Price"
            value={price}
            onChange={onPriceChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Select
                    value={currency}
                    label="Currency"
                    onChange={onCurrencyChange}
                  >
                    <MenuItem value={Currencies.BELLS}>
                      <Currency currency={Currencies.BELLS}/>
                    </MenuItem>
                  </Select>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} className={styles.actions}>
          <If condition={entry != null}>
            <IconButton
              color="inherit"
              className={styles.deleteButton}
              onClick={handleDelete}
            >
              <DeleteIcon/>
            </IconButton>
          </If>
        </Grid>
      </Grid>
    </div>
  );
};

export default Form;
