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
      .get("/users/me", {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      })
      .then(() => {
        setAuth({
          auth: true,
          acessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        });
      })
      .catch(() => {
        setAuth({
          auth: false,
          acessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
        });
      });
  }, []);

  console.log(!auth.auth);

  if (!auth.auth) {
    return <Navigate to="/login" replace />;
  }

  return <Layouts>{children}</Layouts>;
}

export default ProtectedRoute;
