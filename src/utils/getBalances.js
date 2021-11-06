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
      apikey: "CNK4S53H229FQ49811PKFZGGDF5AH7II7H",
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

function formatbalance(weibalance) {
  const etherbalance = web3.utils.fromWei(weibalance, "ether");
  const formattedbalance = etherbalance.substring(
    0,
    Math.min(etherbalance.length, 5)
  );
  return formattedbalance;
}
