import * as React from 'react';

import {
  Box,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import Head from 'next/head';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/router';
import web3 from 'web3';

export default function Index() {
  const [address, setAddress] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [errorText, setErrorText] = React.useState(null);
  const router = useRouter();

  function handleSubmit() {
    setIsLoading(true);
    const isValidAddress = web3.utils.isAddress(address);
    if (isValidAddress) {
      router.push(`/wallet?address=${address}`);
    } else {
      setErrorText('Invalid address');
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard: ETH Balances</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item>
                <Typography variant="h4">
                  Your ETH Balances (L1 & L2)
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <TextField
                    label="Wallet Address"
                    variant="outlined"
                    id="address"
                    margin="normal"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    error={!!errorText}
                    helperText={errorText}
                    fullWidth
                  />
                  <LoadingButton
                    variant="contained"
                    onClick={handleSubmit}
                    loading={!!isLoading}
                  >
                    Submit
                  </LoadingButton>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
