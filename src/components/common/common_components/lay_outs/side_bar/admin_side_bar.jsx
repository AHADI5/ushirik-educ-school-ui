import React from "react";
import { Outlet, useParams } from "react-router-dom";
import {
  Home as HomeIcon,
  Group as GroupIcon,
  School as SchoolIcon,
  Class as ClassIcon,
  CalendarToday as CalendarTodayIcon
} from "@mui/icons-material";
import AppMenu from "./app_side_bar";

export default function AdminSideBar() {
  const params = useParams();

  const menuComponents = [
    { menu: "Accueil", link: `/schoolAdmin/${params['schoolID']}`, icon: <HomeIcon /> },
    { menu: "Utilisateurs", link: `/schoolAdmin/${params['schoolID']}/users`, icon: <GroupIcon /> },
    { menu: "Ecole", link: `/schoolAdmin/${params['schoolID']}/informations`, icon: <SchoolIcon /> },
    { menu: "Classes", link: `/schoolAdmin/${params['schoolID']}/classrooms`, icon: <ClassIcon /> },
    { menu: "Années", link: `/schoolAdmin/${params['schoolID']}/schoolyears`, icon: <CalendarTodayIcon /> },
  ];

  return (
    <>
      <AppMenu menus={menuComponents} />
      <Outlet />
    </>
  );
}
