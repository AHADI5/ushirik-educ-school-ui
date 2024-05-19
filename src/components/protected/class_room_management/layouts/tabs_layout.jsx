import { Outlet, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  EventOutlined,
  FileOpenOutlined,
  LibraryBooksOutlined,
  PersonOutlineSharp,
  ScheduleOutlined,
  SummarizeOutlined,
  TrackChangesOutlined,
} from "@mui/icons-material";
import {
  red,
  green,
  blue,
  orange,
  purple,
  pink,
  teal,
} from "@mui/material/colors";

export default function TabLayout() {
  const params = useParams();

  return (
    <>
      <div>
        {/* Replace this with your actual tabs */}
        <div className="tab-block flex gap-4 p-2 bg-gray-200">
          <NavLink
            to=""
            end
            className={({ isActive }) => (isActive ? "link" : null)}
          >
            <div className="tab flex items-center border-r border-gray-300 pr-4">
              <span className="link-element text-sm items-center">
                <SummarizeOutlined sx={{ fontSize: 20, color: red[500] }} />
              </span>
              <span className="link-element items-center ml-2"> Aperçu</span>
            </div>
          </NavLink>

          <NavLink
            to="students"
            className={({ isActive }) => (isActive ? "link" : null)}
          >
            <div className="tab flex items-center border-r border-gray-300 pr-4">
              <span className="link-element items-center">
                <PersonOutlineSharp sx={{ fontSize: 20, color: green[500] }} />
              </span>
              <span className="link-element items-center ml-2">Elèves</span>
            </div>
          </NavLink>

          <NavLink
            to="courses"
            className={({ isActive }) => (isActive ? "link" : null)}
          >
            <div className="tab flex items-center border-r border-gray-300 pr-4">
              <span className="link-element items-center">
                <LibraryBooksOutlined sx={{ fontSize: 20, color: blue[500] }} />
              </span>
              <span className="link-element items-center ml-2">Cours</span>
            </div>
          </NavLink>

          <NavLink
            to="time-table"
            className={({ isActive }) => (isActive ? "link" : null)}
          >
            <div className="tab flex items-center border-r border-gray-300 pr-4">
              <span className="link-element items-center">
                <ScheduleOutlined sx={{ fontSize: 20, color: orange[500] }} />
              </span>
              <span className="link-element items-center ml-2">Horaire</span>
            </div>
          </NavLink>

          <NavLink
            to="student-max"
            className={({ isActive }) => (isActive ? "link" : null)}
          >
            <div className="tab flex items-center border-r border-gray-300 pr-4">
              <span className="link-element items-center">
                <FileOpenOutlined sx={{ fontSize: 20, color: purple[500] }} />
              </span>
              <span className="link-element items-center ml-2">Cotes</span>
            </div>
          </NavLink>

          <NavLink
            to="events"
            className={({ isActive }) => (isActive ? "link" : null)}
          >
            <div className="tab flex items-center border-r border-gray-300 pr-4">
              <span className="link-element items-center">
                <EventOutlined sx={{ fontSize: 20, color: pink[500] }} />
              </span>
              <span className="link-element items-center ml-2">Evénèments</span>
            </div>
          </NavLink>

          <NavLink
            to="discipline"
            className={({ isActive }) => (isActive ? "link" : null)}
          >
            <div className="tab flex items-center">
              <span className="link-element items-center">
                <TrackChangesOutlined sx={{ fontSize: 20, color: teal[500] }} />
              </span>
              <span className="link-element items-center ml-2">Discipline</span>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="content p-6 rounded-lg">
        {/* Outlet to display content based on selected tab */}
        <Outlet />
      </div>
    </>
  );
}
