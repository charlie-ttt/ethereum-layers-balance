import { Card } from '@mui/material';
import { Chart } from './chart';

const OverallEthBalance = ({ balances }) => {
  if (!balances) return <></>;

  const chartLabels = ['main', 'zksync', 'arbitrum'];
  const chartSeries = [+balances.main, +balances.zksync, +balances.arbitrum];

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
            position: 'bottom',
          },
        },
      },
    ],
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

export default OverallEthBalance;
