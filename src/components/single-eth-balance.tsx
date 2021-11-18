import { Box, Card, Typography } from "@mui/material";

import { Chart } from "./chart";
import { useTheme } from "@mui/material/styles";

type SingleEthBalanceProps = {
  value: number;
  label: string;
};

const SingleEthBalance = ({ value, label }: SingleEthBalanceProps) => {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.light],
    fill: {
      opacity: 1,
    },
    labels: [],
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false,
        },
        hollow: {
          size: "40%",
        },
        track: {
          background: theme.palette.primary.dark,
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = [100];

  return (
    <Card>
      <Box
        sx={{
          alignItems: {
            sm: "center",
          },
          display: "flex",
          flexWrap: "wrap",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        <Chart
          height={160}
          options={chartOptions}
          series={chartSeries}
          type="radialBar"
          width={160}
        />
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            pt: {
              sm: 3,
            },
            pb: 3,
            pr: 4,
            pl: {
              xs: 4,
              sm: 0,
            },
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              mr: 3,
            }}
          >
            <Typography color="primary" variant="h4">
              {value || 0} ETH
            </Typography>
            <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
              {label || ""}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default SingleEthBalance;
