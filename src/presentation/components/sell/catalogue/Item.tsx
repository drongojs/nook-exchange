import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Item as ItemType } from 'core/item';
import { Entry as EntryType } from 'core/entries';
import {
  Grid,
  Card,
  CardMedia,
  makeStyles,
  CardHeader,
  CardActions,
  IconButton,
  Switch,
  Collapse,
  CircularProgress,
} from '@material-ui/core';
import {
  Edit as EditIcon,
} from '@material-ui/icons';
import Form from './Form';
import { useSaveEntry, useDeleteEntry } from 'application/actions/entries';
import useToggle from 'presentation/hooks/useToggle';

interface Props {
  item: ItemType,
  entry: EntryType | undefined,
}

const useStyles = makeStyles({
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  inlineLoader: {
    marginLeft: 'auto',
  },
  editButton: {
    marginLeft: 'auto !important',
  },
  image: {
    height: 0,
    paddingTop: '56.25%',
  },
});

const useActions = () => {
  const [ onSave, { status: saveStatus } ] = useSaveEntry();
  const [ onDelete, { status: deleteStatus } ] = useDeleteEntry();
  const loading = useMemo(() => {
    return saveStatus === 'loading' || deleteStatus === 'loading';
  }, [ saveStatus, deleteStatus ]);
  
  return {
    onSave,
    onDelete,
    loading,
  };
};

const useActive = ({
  onSave,
  item,
  entry,
}: {
  onSave: ReturnType<typeof useSaveEntry>[0],
  item: ItemType,
  entry?: EntryType
}) => {
  const [ active, toggleActive ] = useToggle(entry?.active ?? false);

  const toggle = useCallback(() => {
    toggleActive();
    onSave({
      ...entry,
      item: item.id,
      active: !active,
    });
  }, [ active, toggleActive, entry, item ]);

  useEffect(() => {
    const newValue = entry?.active ?? false;
    if (active !== newValue) {
      toggleActive();
    }
  }, [ entry?.active ]);

  return [ active, toggle ] as [ boolean, typeof toggle ];
};

const Item = ({ item, entry }: Props) => {
  const styles = useStyles();
  const [ editing, toggleEditing ] = useToggle();
  const {
    loading,
    onDelete,
    onSave,
  } = useActions();
  const [ active, handleToggleActive ] = useActive({
    item,
    onSave,
    entry,
  });

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card>
        <CardMedia
          image={item.image}
          className={styles.image}
        />
        <CardHeader
          title={(
            <div className={styles.headerTitle}>
              <span>{item.name}</span>
              <If condition={loading}>
                <CircularProgress
                  color="primary"
                  size="1rem"
                  className={styles.inlineLoader}
                />
              </If>
            </div>
          )}
        />
        <CardActions>
          <Switch
            checked={active}
            onClick={handleToggleActive}
          />
          <IconButton className={styles.editButton} onClick={() => toggleEditing()}>
            <EditIcon/>
          </IconButton>
        </CardActions>
        <Collapse
          in={editing}
          unmountOnExit
          timeout="auto"
        >
          <Form
            item={item}
            entry={entry}
            onSave={onSave}
            onDelete={onDelete}
          />
        </Collapse>
      </Card>
    </Grid>
  );
};

export default Item;
