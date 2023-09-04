import { ReactNode } from "react";
import { Route} from "react-router-dom";

interface routeGuardProps {
  componentToRoute: ReactNode;
}

export function routeGuard({ componentToRoute }: routeGuardProps) {
  let flag = false;

  //check user has JWT token
  localStorage.getItem("token") ? (flag = true) : (flag = false);

  return <Route element={flag && componentToRoute} />;
}
