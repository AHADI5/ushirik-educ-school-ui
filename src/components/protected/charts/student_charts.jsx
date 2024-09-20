import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StudentService from "../../../services/student_service";

export default function ChildrenChart() {
  // Register chart.js components
  ChartJS.register(ArcElement, Tooltip, Legend);
  const {schoolID} =  useParams()
 
  // Set up state for chart data
  const [chartData, setChartData] = useState({
    labels: [
      'Premiere', 
      'Deuxieme',
      'Troisieme',
      'Quatrieme' ,
      'Cinquieme',
      'Sixieme'
    ],
    datasets: [{
      label: 'students',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)'
      ],
      hoverOffset: 4
    }]
  });

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchStudentStats = async () => {
      try {
        const response = await StudentService.getStudentNumberPerLevel(schoolID);

        // Extract student numbers from the response (assuming the levels correspond to the static labels)
        const studentNumbers = response.map(stat => stat.studentNumber);

        // Update chart data while keeping the static labels
        setChartData(prevData => ({
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: studentNumbers
          }]
        }));
      } catch (error) {
        console.error('Error fetching student stats:', error);
      }
    };

    fetchStudentStats();
  }, [schoolID]); // Refetch when schoolID changes

  const options = {
    plugins: {
      legend: {
        position: 'left',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle'
        }
      }
    }
  };

  return (
    <>
      <Doughnut data={chartData} options={options} />
    </>
  );
}
