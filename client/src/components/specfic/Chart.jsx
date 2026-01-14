const Colors = {
  primary: "#fea500",
  secondary: "#c44800",
};
import {Line, Doughnut} from "react-chartjs-2";
import {
  CategoryScale,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Chart as ChartJS,
} from "chart.js";
import {getLast7Days} from "../../lib/featurs";

ChartJS.register(
  CategoryScale,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {display: false},
    title: {display: false},
  },
  scales: {
    x: {grid: {display: false}},
    y: {grid: {display: false}},
  },
};

const LineChart = ({value = []}) => {
  console.log("LineChart value:", value);
  const data = {
    labels: labels,
    datasets: [
      {
        data: value,
        label: "Revenue 2",
        fill: true,
        borderColor: "purple",
        backgroundColor: "purple",
      },
    ],
  };
  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {display: false},
    title: {display: false},
  }, 
  cutout: '45%',
};

const DoughnutChart = ({value = [], labels = []}) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue 2",
        fill: true,
        borderColor: ["#F59E0B", "#3B82F6"],
        backgroundColor: ["#FDE68A", "#BFDBFE"],
        offset: 30,
      },
    ],
  };

  return <Doughnut data={data} options={doughnutChartOptions} />;
};

export {LineChart, DoughnutChart};
