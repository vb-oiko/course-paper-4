import React from "react";
import { useSelector } from "react-redux";
import { getExperimentSolutions } from "../../core/experiment";
import { getFactoryProductivityTransformProblem } from "../../core/experiment/problemTransformers";
import { selectProblem } from "../../rdx/selectors";
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
import { Line } from "react-chartjs-2";
import { getRandomColorProps } from "../../core/utils";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export const ExperimentTab: React.FC = () => {
  const problem = useSelector(selectProblem);

  const experimentData = React.useMemo(
    () =>
      getExperimentSolutions(problem, {
        start: 0.5,
        end: 1.5,
        step: 0.1,
        transformProblem: getFactoryProductivityTransformProblem(4),
        paramToLabelMapper: (value: number) => `${Math.round(value * 100)}%`,
        showX: false,
      }),
    [problem]
  );

  const chartData: ChartData<"line", number[], string> = React.useMemo(() => {
    const { labels, datasets } = experimentData;
    return {
      labels,
      datasets: datasets.map((dataset) => ({ ...dataset, ...getRandomColorProps() })),
    };
  }, [experimentData]);

  return (
    <div>
      <Line options={options} data={chartData} />
    </div>
  );
};
