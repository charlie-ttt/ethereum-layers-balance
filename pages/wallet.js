import { Box, Container, Grid, Typography } from "@mui/material";
import {
  getArbitrumBalance,
  getMainBalance,
  getZksyncBalance,
} from "../src/utils/getBalances";

import OverallEthBalance from "../src/components/overall-eth-balance";
import PropTypes from "prop-types";
import SingleEthBalance from "../src/components/single-eth-balance";

function Wallet({ balanceData }) {
  console.log("balanceData", balanceData);
  const { main, arbitrum, zksync } = balanceData;

  return (
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
          <Grid item xs={12}>
            <OverallEthBalance balances={balanceData} />
          </Grid>
          <Grid item md={6} xs={12}>
            <SingleEthBalance label="Main (Layer 1)" value={main} />
          </Grid>
          <Grid item md={6} xs={12}>
            <SingleEthBalance label="Arbitrum (Layer 2)" value={arbitrum} />
          </Grid>
          <Grid item md={6} xs={12}>
            <SingleEthBalance label="Zksync (Layer 2)" value={zksync} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const balanceData = {
    main: "0",
    zksync: "0",
    arbitrum: "0",
  };
  const { address } = context.query;
  if (!address) {
    return { props: { balanceData } };
  }

  const mainBalance = await getMainBalance(address);
  const zksyncBalance = await getZksyncBalance(address);
  const arbitrumBalance = await getArbitrumBalance(address);
  balanceData.main = mainBalance;
  balanceData.arbitrum = arbitrumBalance;
  balanceData.zksync = zksyncBalance;

  return {
    props: { balanceData },
  };
}

Wallet.propTypes = {
  balanceData: PropTypes.object,
};

export default Wallet;
