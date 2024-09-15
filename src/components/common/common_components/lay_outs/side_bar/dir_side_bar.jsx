import React from "react";
import { Outlet, useParams } from "react-router-dom";
import AppMenu from "./app_side_bar";

// Import MUI icons
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";
import EventIcon from "@mui/icons-material/Event";
import RuleIcon from "@mui/icons-material/Gavel"; // for regulations

export default function DirectorSideBar() {
  const params = useParams();

  // Ensure you're only using JSX components (MUI icons)
  const menuComponents = [
    { menu: "Accueil", link: `/schoolDirection/${params['schoolID']}`, icon: <HomeIcon /> },
    { menu: "Classes", link: `/schoolDirection/${params['schoolID']}/classrooms/`, icon: <GroupIcon /> },
    { menu: "Communiqués", link: `/schoolDirection/${params['schoolID']}/communique-all`, icon: <ArticleIcon /> },
    { menu: "Elèves", link: `/schoolDirection/${params['schoolID']}/students`, icon: <GroupIcon /> },
    { menu: "Evénéments", link: `/schoolDirection/${params['schoolID']}/events`, icon: <EventIcon /> },
    { menu: "Cours", link: `/schoolDirection/${params['schoolID']}/courses`, icon: <SchoolIcon /> },
    { menu: "Enseigants", link: `/schoolDirection/${params['schoolID']}/enseignants`, icon: <SchoolIcon /> },
    { menu: "Reglememnts", link: `/schoolDirection/${params['schoolID']}/rules`, icon: <RuleIcon /> },
  ];

  return (
    <>
      <AppMenu menus={menuComponents} />
      <Outlet />
    </>
  );
}
