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
}

export const ExperimentChart: React.FC<ExperimentChartProps> = ({ experimentData, className, title }) => {
  const options = React.useMemo(
    () => ({
      responsive: true,
      plugins: {
        legend: {
          position: "top" as const,
        },
        ...(title && {
          title: {
            display: true,
            text: title,
          },
        }),
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
  return <Line options={options} data={chartData} className={className} />;
};
