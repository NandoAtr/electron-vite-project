import { Navigate } from "react-router-dom";
import React from "react";
import { Layouts } from "../Layouts/Index";
import { axiosPrivate } from "../Common/http/axiosPrivate";
import { AuthContext } from "../Contexts/AuthContext";
const { ipcRenderer } = window.require("electron");

function ProtectedRoute({ children }: any) {
  const { setAuth, auth }: any = React.useContext(AuthContext);

  React.useEffect(() => {
    axiosPrivate
      .get("/users/me")
      .then(() => {
        setAuth(true);
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return <Layouts>{children}</Layouts>;
}

export default ProtectedRoute;
