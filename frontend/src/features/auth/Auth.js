import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useMeQuery } from "api/authApi";

function Auth({ allowedRoles }) {
  const location = useLocation();
  const { data: me = null, isSuccess } = useMeQuery();

  if (isSuccess) {
    // Check if the current logged user authorized
    const authorized = me.roles.find(role => allowedRoles.includes(role.role));
    if (authorized) {
      return <Outlet />;
    }
  }
}

export default Auth;