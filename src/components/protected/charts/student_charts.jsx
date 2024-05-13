import { Chart as ChartJS, ArcElement, Tooltip, Legend, plugins } from "chart.js";
import { Doughnut } from "react-chartjs-2";
export default function ChildrenChart(schoolID) {
    //TODO make a request with schoolID  "sCHOOL"
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
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
          data: [20, 30 , 50 , 40 , 30, 45 ],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }] ,
        
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