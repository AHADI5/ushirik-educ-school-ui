import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
export default function UsersChart(params) {
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: [
          'Parents',
          'Enseignants',
          'Directeur'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [1, 0, 0],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      };
      const options = {
        plugins : {
            legend :{
                position : 'left',
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