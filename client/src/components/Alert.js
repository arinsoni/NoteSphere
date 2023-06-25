import * as React from 'react';
import Box from '@mui/joy/Box';
import Alert from '@mui/joy/Alert';

export default function MyAlert(props) {
  return (
    <>
    {props.alert &&  
    <Box sx={{ width: '100%' }}>
      <Alert>{props.alert.msg}</Alert>
    </Box>
}
    </>
  );
}