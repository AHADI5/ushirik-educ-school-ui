import { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { Sort, SearchOutlined } from "@mui/icons-material";
import ClassroomService from "../../../../services/class_room_service";
import Avatar from "react-avatar";
import TabLayout from "./tabs_layout";

export default function ClassRoomsLayout() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const [position , setPosition ] = useState(false)
  
  // Fetch classrooms
  useEffect(() => {
    let isMounted = true;
    const fetchClassRooms = async () => {
      try {
        const response = await ClassroomService.getClassrooms(params.schoolID);
        if (isMounted) {
          setClassrooms(response);
          if (response.length > 0 && !params.classID) {
            // Redirect to the first classroom's overview if no classID is specified
            navigate(`/schoolDirection/${params.schoolID}/classrooms/${response[0].classRoomID}`);
          }
        }
      } catch (error) {
        console.log("Error fetching Classrooms", error);
      }
    };

    fetchClassRooms();
    return () => {
      isMounted = false;
    };
  }, [params.schoolID, navigate, params.classID]);

  const handleSearchIconClick = () => {
    setShowSearchBar(!showSearchBar); // Toggle search bar visibility
  };

  

  return (
    <div className="container ml-44 mx-auto mt-16 h-full">
      <div className="flex h-full">
        {/* Left side - Classroom tabs */}
        <div className="flex-shrink-0 w-1/5 bg-white shadow-lg rounded-lg p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Classroom tabs */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4 gap-3">
              {/* Search icon */}
              {showSearchBar ? (
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ) : (
                <h3 className="text-xl font-semibold">Classrooms</h3>
              )}
              <div className="flex space-x-4">
                <SearchOutlined
                  className="h-8 w-8 cursor-pointer text-gray-600"
                  onClick={handleSearchIconClick}
                />
                <Sort className="h-8 w-8 text-gray-600" />
              </div>
            </div>
            {/* Render fetched classrooms */}
            {classrooms.map((classroom) => (
              <NavLink
                key={classroom.classRoomID}
                to={`/schoolDirection/${params.schoolID}/classrooms/${classroom.classRoomID}`}
                className={({ isActive }) => (isActive ? "selectedClassRoom" : null)
                }
              >
                <div
                  className={`mb-2 p-3 rounded-lg flex gap-2 border-b border-gray-300  `}
                >
                  <Avatar
                    name={`${classroom.level} ${classroom.letter}`}
                    size="30"
                  />
                  <div className="classroom-info">
                    <p>ID{classroom.classRoomID}</p>
                    <p className="flex justify-center">
                      {classroom.optionName}
                    </p>
                  </div>
                </div>
              </NavLink>
              
            ))}
          </div>
        </div>

        {/* Right side - Classroom information tabs */}
        <div className="flex-grow bg-white shadow-lg rounded-lg p-6 ml-4 max-w-full">
          {/* Classroom information tabs */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
