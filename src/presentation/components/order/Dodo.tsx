import React, { useState, useCallback } from 'react';
import { useRouteMatch } from 'react-router';
import PageTemplate from '../common/PageTemplate';
import { Typography, Box, IconButton } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import {
  FileCopy as FileCopyIcon,
  Check as CheckIcon,
} from '@material-ui/icons';
import copy from 'copy-to-clipboard';
import { getDodoCode } from 'domain/selectors/island';

const Dodo = () => {
  const orderId = useRouteMatch<{ order: string }>().params.order;
  const code = getDodoCode(orderId).data ?? '';
  const [ copied, setCopied ] = useState(false);
  const handleCopy = useCallback(() => {
    copy(code);
    setTimeout(() => {
      setCopied(true);
    }, 250);
  }, [ setCopied ]);

  return (
    <PageTemplate>
      <Box style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <Alert
          variant="standard"
          severity="info"
          icon={false}
          action={(
            <IconButton
              color="inherit"
              onClick={handleCopy}
            >
              <Choose>
                <When condition={copied}>
                  <CheckIcon/>
                </When>
                <Otherwise>
                  <FileCopyIcon/>
                </Otherwise>
              </Choose>
            </IconButton>
          )}
        >
          <AlertTitle>
            Your Dodo code is:
          </AlertTitle>
          <Typography variant="h4">
            {code}
          </Typography>
        </Alert>
      </Box>
    </PageTemplate>
  );
};

export default Dodo;
