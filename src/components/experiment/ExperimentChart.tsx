import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { ExperimentData } from "../../core/experiment";
import { getRandomColorProps } from "../../core/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export interface ExperimentChartProps {
  experimentData: ExperimentData;
  className?: string;
  title?: string;
  fontSize?: number;
}

export const ExperimentChart: React.FC<ExperimentChartProps> = ({
  experimentData,
  className,
  title,
  fontSize = 16,
}) => {
  const options = React.useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
          labels: {
            font: {
              size: fontSize,
            },
          },
        },
        ...(title && {
          title: {
            display: true,
            text: title,
          },
        }),
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: fontSize,
            },
          },
        },
        y: {
          ticks: {
            font: {
              size: fontSize,
            },
          },
        },
      },
    }),
    [title]
  );

  const chartData: ChartData<"line", number[], string> = React.useMemo(() => {
    const { labels, datasets } = experimentData;
    return {
      labels,
      datasets: datasets.map((dataset) => ({ ...dataset, ...getRandomColorProps() })),
    };
  }, [experimentData]);

  const chartRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (chartRef.current) {
      chartRef.current.getDatasetMeta(0).hidden = chartRef.current.getDatasetMeta(0).label === "x";
      chartRef.current.update();
    }
  }, [experimentData]);

  return <Line options={options} data={chartData} className={className} ref={chartRef} />;
};
