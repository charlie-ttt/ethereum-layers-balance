import { Card } from "@mui/material";
import { Chart } from "./chart";
import PropTypes from "prop-types";

const OverallEthBalance = ({ balances }) => {
  if (!balances) return <></>;
  const { main, arbitrum, zksync, optimistic } = balances;

  const chartLabels = ["Mainnet", "Zksync", "Arbitrum", "Optimistic"];
  const chartSeries = [+main, +zksync, +arbitrum, +optimistic];

  const chartOptions = {
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
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex];
        return [name, val.toFixed(1) + "%"];
      },
    },
  };

  return (
    <Card>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="pie"
        width={380}
      />
    </Card>
  );
};

OverallEthBalance.propTypes = {
  balances: PropTypes.object,
};

export default OverallEthBalance;
