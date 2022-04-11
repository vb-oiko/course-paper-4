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
} from "chart.js";
import { Line } from "react-chartjs-2";

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

  const diagramData = React.useMemo(() => {
    return getExperimentSolutions(problem, {
      start: 0.5,
      end: 1.5,
      step: 0.1,
      transformProblem: getFactoryProductivityTransformProblem(4),
    });
  }, [problem]);

  return (
    <div>
      <Line options={options} data={diagramData} />
    </div>
  );
};
