import web3 from "web3";

export function formatbalance(weibalance: string): number {
  const etherbalance = web3.utils.fromWei(weibalance, "ether");
  const formattedbalance = etherbalance.substring(
    0,
    Math.min(etherbalance.length, 5)
  );
  return toNumber(formattedbalance);
}

export function toNumber(anything: any): number {
  if (typeof anything === "number") return anything;
  if (typeof anything === "string") return +anything;
  return 0;
}
