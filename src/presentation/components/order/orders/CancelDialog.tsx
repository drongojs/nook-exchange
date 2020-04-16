import React, { useCallback, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { ModalRoutes } from 'domain/constants';
import useDialog from 'presentation/hooks/useDialog';
import { useCancelOrder } from 'application/actions/order';

const CancelDialog = () => {
  const {
    isOpen,
    close,
    payload: orderId,
  } = useDialog(ModalRoutes.CANCEL_ORDER);
  const [ submit, { status } ] = useCancelOrder();

  const onConfirm = useCallback(() => {
    submit(orderId);
  }, [ close, submit, orderId ]);

  useEffect(() => {
    if (status === 'success') {
      close();
    }
  }, [ status ]);

  return (
    <Dialog
      open={isOpen}
      onClose={close}
    >
      <DialogContent>
        <DialogContentText>
          Cancel this order?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={close}
          disabled={status === 'loading'}
        >
          No
        </Button>
        <Button
          color="primary"
          onClick={onConfirm}
          disabled={status === 'loading'}
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CancelDialog;
