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
  // status 0 refers to error/incorrect address input
  if (data.status === "0") {
    return res.status(200).json({ value: 0 });
  }
  const weibalance = data?.result || "0";
  return res.status(200).json({ value: formatbalance(weibalance) });
}
