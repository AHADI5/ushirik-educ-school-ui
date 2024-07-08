import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import useUserData from "../../../services/users_service";
export default function UsersChart() {
  const params = useParams()

 
  //make request to get an array of numbers 
  const {userStat} = useUserData(params['schoolID']);

  console.log("the data set is" , userStat)
  
    ChartJS.register(ArcElement, Tooltip, Legend);
    const data = {
        labels: [
          'Direteurs',
          'Enseignants',
          'Parents'
        ],
        datasets: [{
          label: 'User Data Set',
          data: [userStat.directors, userStat.teachers, userStat.parents],
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