import UsersChart from '../charts/users_chart';
import StatBlock from './admin_stat_block';
import parent from '../../../assets/img/parents.png';
import student from '../../../assets/img/students.png';
import teacher from '../../../assets/img/teacher.png';
import userImg from '../../../assets/img/profile.png';
import Table from '../user/recent_user_table';
import useUserData from '../../../services/users_service';
// import { useLocation } from 'react-router-dom';


export default function AdminDashContent (schoolID) {
  //make a request to the backend to get school informations
  
  const {topUsers, allUsers, usersAddedToday, isLoading} = useUserData (
    schoolID['schoolID']
  );
  console.log (allUsers);
  return (
    <div className="flex flex-col w-full">
      {/* First row with four blocks */}
      <div className="flex flex-wrap gap-1">
        <StatBlock
          numberAdded={30}
          numberGone={0}
          date="aujourd'hui"
          category="Elèves"
          totalNumber={100}
          img={student}
          color={'blue'}
        />
        <StatBlock
          numberAdded={20}
          numberGone={0}
          date="aujourd'hui"
          category="Parents"
          totalNumber={200}
          img={parent}
          color={'red'}
        />
        <StatBlock
          numberAdded={10}
          numberGone={0}
          date="aujourd'hui"
          category="Enseignants"
          totalNumber={300}
          img={teacher}
          color={'green'}
        />
        <StatBlock
          numberAdded={usersAddedToday.length}
          numberGone={0}
          date="aujourd'hui"
          category="Total Utilisateur"
          totalNumber={allUsers.length}
          img={userImg}
          color={'yellow'}
        />
      </div>

      {/* Second row with two columns */}
      <div className="flex flex-wrap mt-4">
        <div className="w-3/4 bg-white shadow-md p-4">
          <p>Utilisateurs Récents</p>
          {/* Table goes here */}
          <Table users={topUsers} isLoading={isLoading} />
        </div>
        <div className="w-1/4 bg-white shadow-md p-4">
          <p>Catégories</p>
          <UsersChart schoolID = {schoolID['school']} />
        </div>
      </div>
    </div>
  );
}
