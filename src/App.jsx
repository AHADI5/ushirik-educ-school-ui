import { Route, Routes } from "react-router-dom";
import { useAuth } from "./components/common/auth/auth";
import LoginRegisterLayout from "./components/common/common_components/lay_outs/login_layout";
import LoginForm from "./components/common/common_components/login_register/login_page";
import SignUpPage from "./components/common/common_components/login_register/register_page";

import PrivateRoute from "./components/common/auth/protected_component";
import MultiSchools from "./components/protected/school/multischool_page";
import MultiStepsFromRegistration from "./components/protected/school/mutisteps_page";

import AdminSideBar from "./components/common/common_components/lay_outs/side_bar/admin_side_bar";
import AdminDasBoard from "./components/protected/dash_board/admin_dashboard";
import CommonHeader from "./components/common/common_components/lay_outs/Header/header_layout";
import AllUser from "./components/protected/user/all_user_table";
import UserDetails from "./components/protected/user/user_details";
import SchoolInformation from "./components/protected/school/school_details";
import ClassRooms from "./components/protected/class_room/class_room_data";

import DirectorSideBar from "./components/common/common_components/lay_outs/side_bar/dir_side_bar";
import DirectorDashBoard from "./components/protected/dash_board/direction/directorDashBoard";
import SchoolCommunications from "./components/protected/communique/communications_data";
import CommuniqueDetails from "./components/protected/communique/communique_details";

import ClassRoomsLayout from "./components/protected/class_room_management/layouts/class_room_layout";
import Overview from "./components/protected/class_room_management/overview";
import ClassroomStudentList from "./components/protected/class_room_management/students";
import ClassRoomsCourses from "./components/protected/class_room_management/courses";
import ClassRoomsTimeTable from "./components/protected/class_room_management/time_table";
import ClassRoomsStudentMax from "./components/protected/class_room_management/student_max";
import ClassRoomsDiscipline from "./components/protected/class_room_management/discipline";
import ClassRoomEvents from "./components/protected/class_room_management/events";
import TabLayout from "./components/protected/class_room_management/layouts/tabs_layout";
import StudentTab from "./components/protected/class_room_management/students/student_tab";
import StudentAttendance from "./components/protected/class_room_management/students/student_attendance";
import StudentDiscipline from "./components/protected/class_room_management/students/student_discipline";

function App() {
  const { authed, userRole } = useAuth();

  return (
    <Routes>
      {/* Authentication process */}
      <Route element={<LoginRegisterLayout />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      <Route element={<CommonHeader />}>
        {/* Admin routes */}
        <Route path="/schoolAdmin/:schoolID" element={<AdminSideBar />}>
          <Route
            index
            element={
              <PrivateRoute role={userRole} authed={authed} requiredRole="ADMIN">
                <AdminDasBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute role={userRole} authed={authed} requiredRole="ADMIN">
                <AllUser />
              </PrivateRoute>
            }
          />
          <Route
            path="users/:userID"
            element={
              <PrivateRoute role={userRole} authed={authed} requiredRole="ADMIN">
                <UserDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="informations"
            element={
              <PrivateRoute role={userRole} authed={authed} requiredRole="ADMIN">
                <SchoolInformation />
              </PrivateRoute>
            }
          />
          <Route
            path="classrooms"
            element={
              <PrivateRoute role={userRole} authed={authed} requiredRole="ADMIN">
                <ClassRooms />
              </PrivateRoute>
            }
          />
        </Route>

        {/* Director routes */}
        <Route path="/schoolDirection/:schoolID" element={<DirectorSideBar />}>
          <Route
            index
            element={
              <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                <DirectorDashBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="communique-all"
            element={
              <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                <SchoolCommunications />
              </PrivateRoute>
            }
          />
          <Route
            path="communique-all/:communique"
            element={
              <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                <CommuniqueDetails />
              </PrivateRoute>
            }
          />
          <Route path="classrooms" element={<ClassRoomsLayout />}>
            <Route path=":classID" element={<TabLayout />}>
              <Route
                index
                element={
                  <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                    <Overview />
                  </PrivateRoute>
                }
              />
              <Route
                path="students"
                element={ <ClassroomStudentList />}
              >
                <Route path=":studentID" element = {<StudentTab/>}>
                  <Route path="attendance"  
                      element = {
                      <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                          <StudentAttendance/>
                      </PrivateRoute>
                    }
                  />
                  <Route path="discipline"  
                      element = {
                      <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR" >
                          <StudentDiscipline/>
                      </PrivateRoute>
                      
                      }/>
                </Route>

              </Route>
              <Route
                path="events"
                element={
                  <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                    <ClassRoomEvents />
                  </PrivateRoute>
                }
              />
              <Route
                path="courses"
                element={
                  <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                    <ClassRoomsCourses />
                  </PrivateRoute>
                }
              />
              <Route
                path="time-table"
                element={
                  <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                    <ClassRoomsTimeTable />
                  </PrivateRoute>
                }
              />
              <Route
                path="student-max"
                element={
                  <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                    <ClassRoomsStudentMax />
                  </PrivateRoute>
                }
              />
              <Route
                path="discipline"
                element={
                  <PrivateRoute role={userRole} authed={authed} requiredRole="DIRECTOR">
                    <ClassRoomsDiscipline />
                  </PrivateRoute>
                }
              />
            </Route>
          </Route>
        </Route>
      </Route>

      {/* Additional Routes for MultiSchools and Registration */}
      <Route
        path="/schools"
        element={
          <PrivateRoute role={userRole} authed={authed} requiredRole="ADMIN">
            <MultiSchools />
          </PrivateRoute>
        }
      />
      <Route
        path="/register-school"
        element={
          <PrivateRoute role={userRole} authed={authed} requiredRole="ADMIN">
            <MultiStepsFromRegistration />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
