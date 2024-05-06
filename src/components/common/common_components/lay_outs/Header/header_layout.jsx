import { Outlet } from "react-router-dom";
// import AppHeader from "../common_header";
import TopBar from "./app_header";
export default function CommonHeader() {
    return (
        <>
        
        
            {/* <AppHeader/> */}
            <TopBar/>
            <Outlet/>
        </>
    )
    
}