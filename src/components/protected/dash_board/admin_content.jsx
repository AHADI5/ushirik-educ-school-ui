// import {
  //   faArrowDown,
  //   faArrowUp,
  //   faBabyCarriage,
  //   faChalkboardUser,
  //   faGraduationCap,
  // } from '@fortawesome/free-solid-svg-icons';
  // import {faUserGroup} from '@fortawesome/free-solid-svg-icons/faUserGroup';
  // import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
  import UsersChart from '../charts/users_chart';
    import instance from '../../../services/axios';
  import {useEffect, useState} from 'react';
  import StatBlock from './admin_stat_block';
  
import parent from '../../../assets/img/parents.png'
import student from '../../../assets/img/students.png'
import teacher from '../../../assets/img/teacher.png'
import userImg from '../../../assets/img/profile.png'
import Table from '../user/recent_user_table';
import { users ,recentUsers , addedToday} from '../../../services/users_service';
  // import Scheduler from '@aldabil/react-scheduler'
  import {Link} from 'react-router-dom';
  import {TailSpin} from 'react-loader-spinner';

  
  export default function AdminDashContent (schoolID) {
    //make a request to the backend to get school informations
    console.log (' the school id is' + schoolID['schoolID']);
  
    //Set user state variable to an empty array
    const [recentUser, setRecentUsers] = useState ([]);

    //Set recently added to an empty value 
    const [addedNumber ,setAddedNumber] = useState();
    const [addedTodayNumber ,setAddedTodayNumber] = useState();
    const [totalUsers ,setTotalUsers] = useState();
  
    //Set is loading state for loaders and spiners
  
    const [isloading, setIsLoading] = useState (false);
  
    //1. Get users
    useEffect(() => {
      async function fetchData() {
        setIsLoading(true);
        try {
          const allUser = await users(schoolID['schoolID']);
          setTotalUsers(allUser.length)
          const recentUser = await recentUsers(schoolID['schoolID'])
          const addToday = await addedToday(schoolID['schoolID'])
          setAddedTodayNumber(addToday.length)
          setRecentUsers(recentUser)
          setAddedNumber(addToday.length);
        } catch (error) {
          console.error('Error in fetching recent users:', error);
        }
        setIsLoading(false);
      }
  
      fetchData();
    }, [schoolID]);
  
    return (
      <div className="flex flex-col w-full">
      {/* First row with four blocks */}
      <div className="flex flex-wrap gap-3">
        <StatBlock numberAdded={30} numberGone={0} date="aujourd'hui" category="Elèves" totalNumber={100} img={student} color={'blue'} />
        <StatBlock numberAdded={20} numberGone={0} date="aujourd'hui" category="Parents" totalNumber={200}  img={parent} color={'red'}/>
        <StatBlock numberAdded={10} numberGone={0} date="aujourd'hui" category="Enseignants" totalNumber={300} img={teacher}color={'green'}/>
        <StatBlock numberAdded={addedTodayNumber} numberGone={0} date="aujourd'hui" category="Total Utilisateur" totalNumber={totalUsers} img={userImg} color={'yellow'} />
      </div>
    
      {/* Second row with two columns */}
      <div className="flex flex-wrap mt-4">
        <div className="w-3/4 bg-white shadow-md p-4">
          <p>Utilisateurs Récents</p>
          {/* Table goes here */}
          <Table users={recentUser} isLoading={isloading}/>
        </div>
        <div className="w-1/4 bg-white shadow-md p-4">
          <p>Catégories</p>
          <UsersChart/>
        </div>
      </div>
    </div>
    );
  }
  
  