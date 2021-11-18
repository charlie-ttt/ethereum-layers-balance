import type { NextApiRequest, NextApiResponse } from "next";

import Axios from "axios";
import { formatbalance } from "../../src/utils/formatter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(404);

  const address = req.query.address;
  if (!address) return res.status(400);

  const balance = await Axios({
    method: "get",
    url: `https://api.zksync.io/api/v0.2/accounts/${address}/finalized`,
  });
  const weibalance = balance.data?.result?.balances?.ETH || "0";
  return res.status(200).json({ value: formatbalance(weibalance) });
}
