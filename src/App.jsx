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
import SchoolYearsPage from "./components/protected/school/school_years"
import ClassroomsManagement from "./components/protected/class_room/class_rooms";

import DirectorSideBar from "./components/common/common_components/lay_outs/side_bar/dir_side_bar";
import DirectorDashBoard from "./components/protected/dash_board/direction/directorDashBoard";
import SchoolCommunications from "./components/protected/communique/communications_data";
import CommuniqueDetails from "./components/protected/communique/communique_details";

import ClassRoomsLayout from "./components/protected/class_room_management/layouts/class_room_layout";
import Overview from "./components/protected/class_room_management/overview";
import ClassroomStudentList from "./components/protected/class_room_management/new_version/students";
import ClassRoomsCourses from "./components/protected/class_room_management/courses";
import ClassRoomsTimeTable from "./components/protected/class_room_management/time_table";
import ClassRoomsStudentMax from "./components/protected/class_room_management/student_max";
import ClassRoomsDiscipline from "./components/protected/class_room_management/discipline";
import ClassRoomEvents from "./components/protected/class_room_management/events";
import TabLayout from "./components/protected/class_room_management/layouts/tabs_layout";
import StudentList from "./components/protected/class_room_management/new_version/students";

import StudentAttendance from "./components/protected/class_room_management/students/student_attendance";
import StudentDatabase from "./components/protected/class_room_management/students/all_students";
import StudentDiscipline from "./components/protected/class_room_management/students/student_discipline";
import TeachersManagment from "./components/protected/teachers/teachers_list";
import AllCoursesList from "./components/protected/courses/all_course_list";
import SchoolEvents from "./components/events/school_calendar";
import SchoolRules from "./components/protected/school_rules/school_rules";
import ClassroomList from "./components/protected/class_room_management/new_version/class_rooms_list";
import TabMenu from "./components/protected/class_room_management/new_version/classroom_tabs ";
import ClassroomOverview from "./components/protected/class_room_management/new_version/overview";

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
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="ADMIN"
              >
                <AdminDasBoard />
              </PrivateRoute>
            }
          />
          <Route
            path="users"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="ADMIN"
              >
                <AllUser />
              </PrivateRoute>
            }
          />
          <Route
            path="users/:userID"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="ADMIN"
              >
                <UserDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="informations"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="ADMIN"
              >
                <SchoolInformation />
              </PrivateRoute>
            }
          />
          <Route
            path="classrooms"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="ADMIN"
              >
                < ClassroomsManagement />
              </PrivateRoute>
            }
          />

          <Route
            path="schoolyears"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="ADMIN"
              >
                <SchoolYearsPage />
              </PrivateRoute>
            }
          />

        </Route>

        {/* Director routes */}
        <Route path="/schoolDirection/:schoolID" element={<DirectorSideBar />}>
          <Route
            index
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="DIRECTOR"
              >
                <DirectorDashBoard />
              </PrivateRoute>
            }
          />

          <Route
            path="events"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="DIRECTOR"
              >
                <SchoolEvents />
              </PrivateRoute>
            }
          />
          <Route
            path="enseignants"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="DIRECTOR"
              >
                <TeachersManagment />
              </PrivateRoute>
            }
          />
           <Route
            path="students"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="DIRECTOR"
              >
                <StudentDatabase />
              </PrivateRoute>
            }
          />
          <Route
            path="courses"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="DIRECTOR"
              >
                <AllCoursesList />
              </PrivateRoute>
            }
          />
          <Route
            path="communique-all"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="DIRECTOR"
              >
                <SchoolCommunications />
              </PrivateRoute>
            }
          />
          <Route
            path="communique-all/:communique"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="DIRECTOR"
              >
                <CommuniqueDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="rules"
            element={
              <PrivateRoute
                role={userRole}
                authed={authed}
                requiredRole="DIRECTOR"
              >
                <SchoolRules />
              </PrivateRoute>
            }
          />
          <Route path="classrooms" >
            <Route
              index
              element={
                <PrivateRoute
                  role={userRole}
                  authed={authed}
                  requiredRole="DIRECTOR"
                >
                  {/* <Overview /> */}
                  <ClassroomList />
                </PrivateRoute>
              }
            />
            <Route path=":classID" element={<TabMenu />}>
              <Route
                index
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <ClassroomOverview />
                  </PrivateRoute>
                }
              />

              <Route
                path="eleves"
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <StudentList/>
                  </PrivateRoute>
                }
              />

              <Route
                path="cours"
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <ClassRoomsCourses/>
                  </PrivateRoute>
                }
              />
              <Route
                path="horaires"
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <ClassroomOverview />
                  </PrivateRoute>
                }
              />

            </Route>
            {/* <Route path=":classID" element={<TabLayout />}>
              <Route
                index
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <Overview />
                  </PrivateRoute>
                }
              />
              <Route path="students" element={<ClassroomStudentList />}>
                <Route path=":studentID" element={<StudentTab />}>
                  <Route
                    path="attendance"
                    element={
                      <PrivateRoute
                        role={userRole}
                        authed={authed}
                        requiredRole="DIRECTOR"
                      >
                        <StudentAttendance />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="discipline"
                    element={
                      <PrivateRoute
                        role={userRole}
                        authed={authed}
                        requiredRole="DIRECTOR"
                      >
                        <StudentDiscipline />
                      </PrivateRoute>
                    }
                  />
                </Route>
              </Route>
              <Route
                path="events"
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <ClassRoomEvents />
                  </PrivateRoute>
                }
              />
              <Route
                path="courses"
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <ClassRoomsCourses />
                  </PrivateRoute>
                }
              />
              <Route
                path="time-table"
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <ClassRoomsTimeTable />
                  </PrivateRoute>
                }
              />
              <Route
                path="student-max"
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <ClassRoomsStudentMax />
                  </PrivateRoute>
                }
              />
              <Route
                path="discipline"
                element={
                  <PrivateRoute
                    role={userRole}
                    authed={authed}
                    requiredRole="DIRECTOR"
                  >
                    <ClassRoomsDiscipline />
                  </PrivateRoute>
                }
              /> */}
            {/* </Route> */}
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
