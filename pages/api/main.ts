import type { NextApiRequest, NextApiResponse } from "next";

import Axios from "axios";
import { formatbalance } from "../../src/utils/formatter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(404);

  const address = req.query.address;
  if (!address) return res.status(400).end();

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
  res.status(200).json({ value: formatbalance(weibalance) });
}
