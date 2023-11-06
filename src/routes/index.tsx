import HomePage from "@/pages";


import { Routes, Route} from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import UserComponent from "@/pages/User";
import GroupComponent from "@/pages/Group";
import IoTComponent from "@/pages/IoT";

function AppRoutes (){
  
  return (
    <Routes>
        <Route element={<HomePage/>} path="/"></Route>
        <Route element={<Dashboard/>} path="/dashboard"></Route>
        <Route element={<UserComponent/>} path="/User"></Route>
        <Route element={<GroupComponent/>} path="/Group"></Route>
        <Route element={<IoTComponent/>} path="/IoT"></Route>
        {/* <Route element={ (props) => <EditERsComponent createdAt={props.}/>} path="/editer"></Route> */}
    </Routes>
  );
};

export default AppRoutes;