import { useState, useEffect } from "react";
import { NavLink, Outlet, useParams, useNavigate } from "react-router-dom";
import { Sort, SearchOutlined, ChevronLeft, ChevronRight } from "@mui/icons-material";
import ClassroomService from "../../../../services/class_room_service";
import Avatar from "react-avatar";
import { Popover, Typography } from "@mui/material";

export default function ClassRoomsLayout() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [filteredClassrooms, setFilteredClassrooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showClassrooms, setShowClassrooms] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  // Fetch classrooms
  useEffect(() => {
    let isMounted = true;
    const fetchClassRooms = async () => {
      try {
        const response = await ClassroomService.getClassrooms(params.schoolID);
        if (isMounted) {
          setClassrooms(response);
          setFilteredClassrooms(response);
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

  const handleToggleClassrooms = (event) => {
    setShowClassrooms(!showClassrooms); // Toggle classrooms visibility
    setAnchorEl(event.currentTarget); // Set anchor element for popover
  };

  const handleClosePopover = () => {
    setAnchorEl(null); // Close the popover
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    filterClassrooms(e.target.value);
  };

  const filterClassrooms = (search) => {
    const filtered = classrooms.filter((classroom) =>
      `${classroom.level} ${classroom.letter} ${classroom.optionName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
    setFilteredClassrooms(filtered);
  };

  const popoverOpen = Boolean(anchorEl);
  const popoverId = popoverOpen ? 'toggle-popover' : undefined;

  return (
    <div className="ml-44 mx-auto mt-16 h-full">
      <div className="flex h-full">
        {/* Left side - Classroom tabs */}
        {showClassrooms && (
          <div className="flex-shrink-0 w-1/5 bg-white shadow-lg rounded-lg p-4 h-full overflow-hidden">
            {/* Classroom tabs */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4 gap-3">
                {/* Search icon */}
                {showSearchBar ? (
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
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
              <div className="fixed-size-classrooms-list overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {/* Render fetched classrooms */}
                {filteredClassrooms.map((classroom) => (
                  <NavLink
                    key={classroom.classRoomID}
                    to={`/schoolDirection/${params.schoolID}/classrooms/${classroom.classRoomID}`}
                    className={({ isActive }) => (isActive ? "selectedClassRoom" : null)}
                  >
                    <div className={`mb-2 p-3 rounded-lg flex gap-2 border-b border-gray-300`}>
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
          </div>
        )}

        {/* Toggle icon with popover */}
        <div className="flex-shrink-0 w-8 flex items-start mt-4">
          {showClassrooms ? (
            <ChevronLeft
              className="h-8 w-8 cursor-pointer text-gray-600"
              onClick={handleToggleClassrooms}
            />
          ) : (
            <ChevronRight
              className="h-8 w-8 cursor-pointer text-gray-600"
              onClick={handleToggleClassrooms}
            />
          )}
        </div>

        <Popover
          id={popoverId}
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography sx={{ p: 2 }}>Toggle classrooms list</Typography>
        </Popover>

        {/* Right side - Classroom information tabs */}
        <div className={`flex-grow bg-white shadow-lg rounded-lg p-6 ${showClassrooms ? 'ml-4' : ''} max-w-full`}>
          {/* Classroom information tabs */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
