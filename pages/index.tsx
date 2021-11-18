import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import Head from "next/head";
import LoadingButton from "@mui/lab/LoadingButton";
import { injected } from "../src/lib/connector";
import { useRouter } from "next/router";
import { useWeb3React } from "@web3-react/core";
import web3 from "web3";

export default function Index() {
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const router = useRouter();

  const { account, activate, deactivate } = useWeb3React();

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    if (account) {
      setAddress(account);
    } else {
      setAddress("");
    }
  }, [account]);

  function handleSubmit() {
    setIsLoading(true);
    const isValidAddress = web3.utils.isAddress(address);
    if (isValidAddress) {
      router.push(`/wallet?address=${address}`);
    } else {
      setErrorText("Invalid address");
      setIsLoading(false);
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
            <Grid
              container
              justifyContent="center"
              spacing={3}
              sx={{ mt: 4, mb: 4 }}
            >
              <Grid item>
                <Button variant="outlined" onClick={connect}>
                  Connect to Metamask
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" onClick={disconnect}>
                  Disconnect
                </Button>
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
