import React from 'react';
import { Container, Box, makeStyles } from '@material-ui/core';
import Header from './Header';

interface Props {
  background?: boolean,
  children?: React.ReactNode,
}

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
  },
  content: {
    flexGrow: 1,
    backgroundColor: ({ background = true }: Props) => background ? '#fff' : void 0,
    overflowY: 'auto',
  },
  footer: {
    minHeight: '5rem',
  },
});

const PageTemplate = (props: Props) => { 
  const styles = useStyles(props);

  return (
    <Box className={`${styles.root} high`}>
      <Header/>
      <Box className={styles.content}>
        <Container maxWidth="md" className="high">
          {props.children}
        </Container>
      </Box>
      <Box className={styles.footer}>Footer here</Box>
    </Box>
  );
};

export default PageTemplate;
