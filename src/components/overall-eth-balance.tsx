import type { ApexOptions } from "apexcharts";
import { Card } from "@mui/material";
import { Chart } from "./chart";

type OverallEthBalance = {
  balances: {
    main: number;
    arbitrum: number;
    zksync: number;
    optimistic: number;
    polygon: number;
  };
};

const OverallEthBalance = ({ balances }: OverallEthBalance) => {
  const { main, arbitrum, zksync, optimistic, polygon } = balances;

  const chartLabels = [
    "Mainnet",
    "Zksync",
    "Arbitrum",
    "Optimistic",
    "Polygon",
  ];
  const chartSeries = [main, zksync, arbitrum, optimistic, polygon];

  const chartOptions: ApexOptions = {
    labels: chartLabels,
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      show: false,
    },
    dataLabels: {
      // @ts-ignore
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        // @ts-ignore
        return [name, val.toFixed(1) + "%"];
      },
    },
  };

  return (
    <>
      <Card>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          width={380 + Math.floor(Math.random() * 2) + 1} // alternative solution to fix bug graph disappear when resizing
        />
      </Card>
    </>
  );
};

export default OverallEthBalance;
