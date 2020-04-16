import React, { useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import useDialog from 'presentation/hooks/useDialog';
import { useHistory } from 'react-router';
import { usePlaceOrder } from 'application/actions/order';
import { ModalRoutes } from 'domain/constants';

const RequestDialog = () => {
  const history = useHistory();
  const {
    isOpen,
    close,
    payload: entryId,
  } = useDialog(ModalRoutes.REQUEST_ORDER);
  const [ submit, { status } ] = usePlaceOrder();
  
  const onConfirm = useCallback(() => {
    submit(entryId);
  }, [ submit, entryId ]);
  const onCancel = close;

  useEffect(() => {
    if (status === 'success') {
      close();
      history.push('/');
    }
  }, [ status ]);

  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
    >
      <DialogContent>
        <DialogContentText>
          Are you sure you want to request this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={status === 'loading'}
          onClick={onCancel}
        >
          No
        </Button>
        <Button
          color="primary"
          disabled={status === 'loading'}
          onClick={onConfirm}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestDialog;
