import * as React from 'react';

import { Box, Container, Grid, Typography } from '@mui/material';

import EthBalance from '../src/components/eth-balance';
import Head from 'next/head';

export default function Index() {
  return (
    <>
      <Head>
        <title>Dashboard: Overview</title>
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
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Your ETH Balances</Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <EthBalance label="Main (Layer 1)" value="200" />
            </Grid>
            <Grid item md={6} xs={12}>
              <EthBalance label="Arbitrum (Layer 2)" value="2000" />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
