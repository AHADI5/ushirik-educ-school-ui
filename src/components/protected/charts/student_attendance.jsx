// Import necessary components from Chart.js and react-chartjs-2
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Define the data and options for the Bar Chart
const data = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Attendance Rate',
      data: [90, 85, 88, 92],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: 'Attendance Rate (%)',
      },
    },
    x: {
      title: {
        display: true,
        text: 'Weeks',
      },
    },
  },
};

// Create the Bar Chart component
export default function AttendanceBarChart() {
  return <Bar data={data} options={options} />;
}
