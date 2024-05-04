import { Route, Routes } from "react-router-dom";
import { useAuth } from "./components/common/auth/auth";
import LoginRegisterLayout from "./components/common/common_components/lay_outs/login_layout";
import LoginForm from "./components/common/common_components/login_register/login_page";

import PrivateRoute from "./components/common/auth/protected_component";
import MultiSchools from "./components/protected/school/multischool_page";
import MultiStepsFromRegistration from "./components/protected/school/mutisteps_page";

function App() {
  const { authed, userRole } = useAuth();
  return (
    <Routes>
      {/* Authentification process */}
      <Route element={<LoginRegisterLayout />}>
        <Route path="/" element={<LoginForm />} />
        {/* Sign up goes here */}
        <Route
          path="/schools"
          element={
            <PrivateRoute
              role={userRole}
              authed={authed}
              requiredRole={"ADMIN"}
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
              requiredRole={"ADMIN"}
            >
              <MultiStepsFromRegistration/>
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
