import Axios from "axios";
import web3 from "web3";

export async function getMainBalance(address) {
  const { data } = await Axios({
    method: "post",
    url: "https://api.etherscan.io/api",
    params: {
      module: "account",
      action: "balance",
      address: address,
      tag: "latest",
      // eslint-disable-next-line no-undef
      apikey: process.env.ETHERSCAN_API_KEY,
    },
  });
  const weibalance = data?.result || "0";
  return formatbalance(weibalance);
}

export async function getArbitrumBalance(address) {
  const { data } = await Axios({
    method: "post",
    url: "https://api.arbiscan.io/api",
    params: {
      module: "account",
      action: "balance",
      address: address,
      tag: "latest",
    },
  });
  const weibalance = data?.result || "0";
  return formatbalance(weibalance);
}

export async function getZksyncBalance(address) {
  const balance = await Axios({
    method: "get",
    url: `https://api.zksync.io/api/v0.2/accounts/${address}/finalized`,
  });
  const weibalance = balance.data?.result?.balances?.ETH || "0";

  return formatbalance(weibalance);
}

export async function getOptimisticBalance(address) {
  const balance = await Axios({
    method: "get",
    url: `https://api-optimistic.etherscan.io/api`,
    params: {
      module: "account",
      action: "balance",
      address: address,
      tag: "latest",
      // eslint-disable-next-line no-undef
      apikey: process.env.OPTIMISTIC_API_KEY,
    },
  });
  const weibalance = balance?.data?.result || "0";

  return formatbalance(weibalance);
}

export async function getPolygonBalance(address) {
  const { data } = await Axios({
    method: "get",
    url: "https://api.polygonscan.com/api",
    params: {
      module: "account",
      action: "tokenbalance",
      address: address,
      contractaddress: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
      tag: "latest",
      // eslint-disable-next-line no-undef
      apikey: process.env.POLYGON_API_KEY,
    },
  });
  const weibalance = data?.result || "0";
  return formatbalance(weibalance);
}

// utils function
function formatbalance(weibalance) {
  const etherbalance = web3.utils.fromWei(weibalance, "ether");
  const formattedbalance = etherbalance.substring(
    0,
    Math.min(etherbalance.length, 5)
  );
  return formattedbalance;
}
