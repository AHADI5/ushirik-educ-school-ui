import { useState, useEffect } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import {
  EventOutlined,
  FileOpenOutlined,
  LibraryBooksOutlined,
  PersonOutlineSharp,
  ScheduleOutlined,
  SearchOutlined,
  Sort,
  SummarizeOutlined,
  TrackChangesOutlined
} from '@mui/icons-material';
import { red, green, blue, orange, purple, pink, teal } from '@mui/material/colors';
import ClassroomService from '../../../services/class_room_service';

export default function ClassRoomsLayout() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const params = useParams();

  useEffect(async () => {
    // Fetch classrooms data when component mounts
   const response =  await ClassroomService.getClassrooms(params.schoolID)
  setClassrooms(response)
   
  }, [params.schoolID]);

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar); // Toggle search bar visibility
  };

  return (
    <><div className="container ml-44 mx-auto mt-16">
      <div className="flex">
        {/* Left side - Classroom tabs */}
        <div className="w-1/5 bg-white shadow-lg rounded-lg p-6">
          {/* Classroom tabs */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {/* Search icon */}
              {showSearchBar ? (
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              ) : (
                <h3 className="text-xl font-semibold">Classrooms</h3>
              )}
              <div className="flex space-x-4">
                <SearchOutlined
                  className="h-8 w-8 cursor-pointer text-gray-600"
                  onClick={handleSearchIconClick} />
                <Sort className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            {/* Render fetched classrooms */}
            {classrooms.map(classroom => (
              <div key={classroom.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                <h4 className="text-lg font-semibold">{classroom.level}  {classroom.letter}</h4>
                <p className="text-sm text-gray-600">Risk: {classroom.risk}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Classroom information tabs */}
        <div className="flex-grow bg-white shadow-lg rounded-lg p-6 ml-4">
          {/* Classroom information tabs */}
          <div className="mb-8">
            {/* Replace this with your actual tabs */}
            <div className="tab-block flex gap-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
              <NavLink
                to={`/schoolDirection/${params.schoolID}/classrooms/overview`}
                end
                className={({ isActive }) => isActive ? "link" : null}
              >
                <div className='tab'>
                  <span className='link-element text-sm items-center'><SummarizeOutlined sx={{ fontSize: 20, color: red[500] }} /></span>
                  <span className='link-element items-center'> Aperçu</span>
                </div>
              </NavLink>

              <NavLink
                to={`/schoolDirection/${params.schoolID}/classrooms/students`}
              className={({ isActive }) => isActive ? "link" : null}
              >
              <div className='tab'>
                <span className='link-element items-center'><PersonOutlineSharp sx={{ fontSize: 20, color: green[500] }} /></span>
                <span className='link-element items-center'>Elèves</span>
              </div>
            </NavLink>

            <NavLink
              to={`/schoolDirection/${params.schoolID}/classrooms/courses`}
            className={({ isActive }) => isActive ? "link" : null}
            >
            <div className='tab'>
              <span className='link-element items-center'><LibraryBooksOutlined sx={{ fontSize: 20, color: blue[500] }} /></span>
              <span className='link-element items-center'>Cours</span>
            </div>
          </NavLink>

          <NavLink
            to={`/schoolDirection/${params.schoolID}/classrooms/time-table`}
          className={({ isActive }) => isActive ? "link" : null}
          >
          <div className='tab'>
            <span className='link-element items-center'><ScheduleOutlined sx={{ fontSize: 20, color: orange[500] }} /></span>
            <span className='link-element items-center'>Horaire</span>
          </div>
        </NavLink>

        <NavLink
          to={`/schoolDirection/${params.schoolID}/classrooms/student-max`}
        className={({ isActive }) => isActive ? "link" : null}
        >
        <div className='tab'>
          <span className='link-element items-center'><FileOpenOutlined sx={{ fontSize: 20, color: purple[500] }} /></span>
          <span className='link-element items-center'>Cotes</span>
        </div>
      </NavLink>

      <NavLink
        to={`/schoolDirection/${params.schoolID}/classrooms/events`}
      className={({ isActive }) => isActive ? "link" : null}
      >
      <div className='tab'>
        <span className='link-element items-center'><EventOutlined sx={{ fontSize: 20, color: pink[500] }} /></span>
        <span className='link-element items-center'>Evénèments</span>
      </div>
    </NavLink><NavLink
        to={`/schoolDirection/${params.schoolID}/classrooms/discipline`}
                className={({ isActive }) => isActive ? "link" : null}
              >
                <div className='tab'>
                  <span className='link-element items-center'><TrackChangesOutlined sx={{ fontSize: 20, color: teal[500] }} /></span>
                  <span className='link-element items-center'>Discipline</span>
                </div>
              </NavLink>
            </div>
          </div>

          {/* Display content for selected tab */}
          <div className="content p-6 rounded-lg">
            {/* Outlet to display content based on selected tab */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
