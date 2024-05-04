import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ authed, role, requiredRole, children }) {
  // If the user is not authenticated, redirect to the login page
  if (!authed) {
    return <Navigate to="/login" />;
  }

  // If the user's role does not match the required role, redirect to an unauthorized page or handle accordingly
  if (requiredRole && role !== requiredRole) {
    console.log("Required role from private route:", requiredRole, "and user role is:", role);
    // Redirect to an unauthorized access page or show an error message
    // Replace '/unauthorized' with the path to your unauthorized access page or component
    return <Navigate to="/unauthorized" />;
  }

  // Render the children components if the user is authenticated and has the required role
  return children ? children : <Outlet />;
}


// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './useAuth';

// const PrivateRoute = ({ role, children }) => {
//   const { isAuthenticated, userRole } = useAuth();

//   // Redirect unauthenticated users to the login page
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" replace />;
//   }

//   // Check if the user's role matches the required role for the route
//   if (userRole !== role) {
//     // Redirect users without permission to the home page
//     return <Navigate to="/" replace />;
//   }

//   // Render the children if the user is authenticated and has the correct role
//   return <>{children}</>;
// };

// export default PrivateRoute;


// import { Route, Navigate , Routes } from "react-router-dom";
// import { useAuth } from "./useAuth";

// const PrivateRoute = ({component : Component,role , ...rest}) =>{
//     const {authed} = useAuth();
//     return (
//         <Routes>
//         <Route
//         {...rest}
//         render = {(props) =>{
//             if (authed) {
//                 return <Component {...rest} {...props} />;
                
//             } else {
//                 return (
//                     <Navigate

//                     to = {
//                         {
//                             pathname : "/login",
//                             state : {
//                                 from: props.location,
//                             },
//                         }
                        
//                     }
//                     />
//                 );
                
//             }
//         }}
        
//         />
//         </Routes>
//     );

// };

// export default PrivateRoute
