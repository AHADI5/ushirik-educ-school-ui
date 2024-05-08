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
                <ClassroomTable/>
              </PrivateRoute>
            }
          />

          
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
