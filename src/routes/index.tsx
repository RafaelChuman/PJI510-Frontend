import HomePage from "@/pages";


import { Routes, Route} from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import UserComponent from "@/pages/User";
import ActivitiesComponent from "@/pages/activities";
import LubrificationSystemsComponent from "@/pages/lubrificationSystem";
import ERsComponent from "@/pages/ers";
import EditERsComponent from "@/pages/ers/editERs";
import GroupComponent from "@/pages/Group";

function AppRoutes (){
  
  return (
    <Routes>
        <Route element={<HomePage/>} path="/"></Route>
        <Route element={<Dashboard/>} path="/dashboard"></Route>
        <Route element={<UserComponent/>} path="/user"></Route>
        <Route element={<GroupComponent/>} path="/group"></Route>
        <Route element={<ActivitiesComponent/>} path="/activities"></Route>
        <Route element={<ERsComponent/>} path="/ers"></Route>
        {/* <Route element={ (props) => <EditERsComponent createdAt={props.}/>} path="/editer"></Route> */}
    </Routes>
  );
};

export default AppRoutes;