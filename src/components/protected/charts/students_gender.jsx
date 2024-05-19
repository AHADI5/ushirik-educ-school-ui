import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
export default function StudentGenderChart(params) {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: [
          'Filles',
          'Garçons',
         
        ],
        datasets: [{
          label: 'Students By Genders',
          data: [50, 20],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
           
          ],
          hoverOffset: 4
        }]
      };
      const options = {
        plugins : {
            legend :{
                position : 'right',
                labels: {
                    usePointStyle :true ,
                    pointStyle : 'circle'
                }
            }
        }
    }
    return (
        <>
            <Doughnut data={
                data
                
            } options={options}/>
        </>

    )
    
}