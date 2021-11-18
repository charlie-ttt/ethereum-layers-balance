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
  return res.status(200).json({ value: formatbalance(weibalance) });
}
