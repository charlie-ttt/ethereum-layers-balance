import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Axios from "axios";
import Head from "next/head";
import OverallEthBalance from "../src/components/overall-eth-balance";
import SingleEthBalance from "../src/components/single-eth-balance";
import { toNumber } from "../src/utils/formatter";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const { data } = await Axios({ method: "get", url });
  return data?.value || 0;
};

function Wallet() {
  const router = useRouter();
  const { address } = router.query;

  const [sumValue, setSumValue] = useState<number>(0);

  const { data: mainValue } = useSWR<number>(
    () => (address ? `/api/main?address=${address}` : null),
    fetcher
  );
  const { data: arbitrumValue } = useSWR(
    () => (address ? `/api/arbitrum?address=${address}` : null),
    fetcher
  );
  const { data: optimisticValue } = useSWR(
    () => (address ? `/api/optimistic?address=${address}` : null),
    fetcher
  );
  const { data: polygonValue } = useSWR(
    () => (address ? `/api/polygon?address=${address}` : null),
    fetcher
  );
  const { data: zksyncValue } = useSWR(
    () => (address ? `/api/zksync?address=${address}` : null),
    fetcher
  );

  useEffect(() => {
    setSumValue(
      toNumber(mainValue) +
        toNumber(arbitrumValue) +
        toNumber(optimisticValue) +
        toNumber(polygonValue) +
        toNumber(zksyncValue)
    );
  }, [mainValue, arbitrumValue, optimisticValue, polygonValue, zksyncValue]);

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
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">Your ETH Balances</Typography>
              </Grid>
            </Grid>
          </Box>
          <Grid container spacing={4}>
            <Grid container xs={12} justifyContent="center">
              <OverallEthBalance
                balances={{
                  main: toNumber(mainValue),
                  arbitrum: toNumber(arbitrumValue),
                  optimistic: toNumber(optimisticValue),
                  polygon: toNumber(polygonValue),
                  zksync: toNumber(zksyncValue),
                }}
              />
            </Grid>
            <Grid container xs={12} justifyContent="center" sx={{ margin: 5 }}>
              <Card>
                <Box sx={{ padding: 3 }}>
                  Combined Eth Balance: {sumValue} ETH
                </Box>
              </Card>
            </Grid>
            <Grid item md={6} xs={12}>
              <SingleEthBalance
                label="Main (Layer 1)"
                value={toNumber(mainValue)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SingleEthBalance
                label="Arbitrum (Layer 2)"
                value={toNumber(arbitrumValue)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SingleEthBalance
                label="Zksync (Layer 2)"
                value={toNumber(zksyncValue)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SingleEthBalance
                label="Optimistic (Layer 2)"
                value={toNumber(optimisticValue)}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <SingleEthBalance
                label="Polygon (Layer 2)"
                value={toNumber(polygonValue)}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Wallet;
