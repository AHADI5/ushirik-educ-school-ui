import {Route, Routes} from 'react-router-dom';
import {useAuth} from './components/common/auth/auth';
import LoginRegisterLayout
  from './components/common/common_components/lay_outs/login_layout';
import LoginForm
  from './components/common/common_components/login_register/login_page';

import PrivateRoute from './components/common/auth/protected_component';
import MultiSchools from './components/protected/school/multischool_page';
import MultiStepsFromRegistration
  from './components/protected/school/mutisteps_page';

import SignUpPage
  from './components/common/common_components/login_register/register_page';

import AdminSideBar
  from './components/common/common_components/lay_outs/side_bar/admin_side_bar';
import AdminDasBoard from './components/protected/dash_board/admin_dashboard';
import CommonHeader
  from './components/common/common_components/lay_outs/Header/header_layout';
import AllUser from './components/protected/user/all_user_table';
import UserDetails from './components/protected/user/user_details';
import SchoolInformation from './components/protected/school/school_details';
import ClassroomTable from './components/protected/class_room/class_room_table';
import ClassRooms from './components/protected/class_room/class_room_data';
import DirectorSideBar from './components/common/common_components/lay_outs/side_bar/dir_side_bar';
import DirectorDashBoard from './components/protected/dash_board/direction/directorDashBoard';
import CommunicationList from './components/protected/communique/communique_list';
import SchoolCommunications from './components/protected/communique/communications_data';
import CommuniqueDetails from './components/protected/communique/communique_details';
import ClassRoomsLayout from './components/protected/class_room_management/class_room_layout';
import Overview from './components/protected/class_room_management/overview';
import ClassroomStudentList from './components/protected/class_room_management/students';
import ClassRoomsCourses from './components/protected/class_room_management/courses';
import ClassRoomsTimeTable from './components/protected/class_room_management/time_table';
import ClassRoomsStudentMax from './components/protected/class_room_management/student_max';
import ClassRoomsDiscipline from './components/protected/class_room_management/discipline';
import ClassRoomEvents from './components/protected/class_room_management/events';
function App () {
  const {authed, userRole} = useAuth ();
  return (
    <Routes>
      {/* Authentification process */}
      <Route element={<LoginRegisterLayout />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/schools"
          element={
            <PrivateRoute
              role={userRole}
              authed={authed}
              requiredRole={'ADMIN'}
            >
              <MultiSchools />
            </PrivateRoute>
          }
        />

        <Route
          path="/register-school"
          element={
            <PrivateRoute
              role={userRole}
              authed={authed}
              requiredRole={'ADMIN'}
            >
              <MultiStepsFromRegistration />
            </PrivateRoute>
          }
        />
      </Route>
      <Route element={<CommonHeader />}>
        <Route path="/schoolAdmin/:schoolID" element={<AdminSideBar />}>
          <Route
            path="/schoolAdmin/:schoolID"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole={'ADMIN'}
              >
                <AdminDasBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="/schoolAdmin/:schoolID/users"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole={'ADMIN'}
              >
                <AllUser />
              </PrivateRoute>
            }
          />
          <Route
            path="/schoolAdmin/:schoolID/users/:userID"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole={'ADMIN'}
              >
                <UserDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/schoolAdmin/:schoolID/informations/"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                // requiredRole={'ADMIN'}
              >
                <SchoolInformation />
              </PrivateRoute>
            }
          />
          <Route
            path="/schoolAdmin/:schoolID/classrooms/"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                // requiredRole={'ADMIN'}
              >
                <ClassRooms/>
              </PrivateRoute>
            }
          />       
        </Route>
        <Route
            path="/schoolDirection/:schoolID/"
            element={<DirectorSideBar/>}
        >
          <Route
            path="/schoolDirection/:schoolID/"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole={'DIRECTOR'}
              >
                <DirectorDashBoard/>
              </PrivateRoute>
            }
          /> 
          <Route
            path="/schoolDirection/:schoolID/communique-all"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole={'DIRECTOR'}
              >
                <SchoolCommunications/>
              </PrivateRoute>
            }
          /> 

          <Route
            path="/schoolDirection/:schoolID/communique-all/:communique"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole={'DIRECTOR'}
              >
                <CommuniqueDetails/>
              </PrivateRoute>
            }
          /> 
          <Route
            path="/schoolDirection/:schoolID/classrooms/"
            element={<ClassRoomsLayout/>}
          > 
            <Route
              path="/schoolDirection/:schoolID/classrooms/overview"
              element = {
                <PrivateRoute
                  role={userRole}
                  authed={authed}
                  requiredRole={'DIRECTOR'}
                >
                  <Overview/>
                </PrivateRoute>
              }
            />
            <Route
              path="/schoolDirection/:schoolID/classrooms/students"
              element = {
                <PrivateRoute
                  role={userRole}
                  authed={authed}
                  requiredRole={'DIRECTOR'}
                >
                  <ClassroomStudentList/>
                </PrivateRoute>
              }
            />
            <Route
              path="/schoolDirection/:schoolID/classrooms/events"
              element = {
                <PrivateRoute
                  role={userRole}
                  authed={authed}
                  requiredRole={'DIRECTOR'}
                >
                  <ClassRoomEvents/>
                </PrivateRoute>
              }
            />
            <Route
              path="/schoolDirection/:schoolID/classrooms/courses"
              element = {
                <PrivateRoute
                  role={userRole}
                  authed={authed}
                  requiredRole={'DIRECTOR'}
                >
                  <ClassRoomsCourses/>
                </PrivateRoute>
              }
            />
            <Route
              path="/schoolDirection/:schoolID/classrooms/time-table"
              element = {
                <PrivateRoute
                  role={userRole}
                  authed={authed}
                  requiredRole={'DIRECTOR'}
                >
                  <ClassRoomsTimeTable/>
                </PrivateRoute>
              }
            />
            <Route
              path="/schoolDirection/:schoolID/classrooms/student-max"
              element = {
                <PrivateRoute
                  role={userRole}
                  authed={authed}
                  requiredRole={'DIRECTOR'}
                >
                  <ClassRoomsStudentMax/>
                </PrivateRoute>
              }
            />
            <Route
              path="/schoolDirection/:schoolID/classrooms/discipline"
              element = {
                <PrivateRoute
                  role={userRole}
                  authed={authed}
                  requiredRole={'DIRECTOR'}
                >
                  <ClassRoomsDiscipline/>
                </PrivateRoute>
              }
            />
            
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
