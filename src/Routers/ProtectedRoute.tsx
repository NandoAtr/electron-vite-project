import { Navigate } from "react-router-dom";
import React from "react";
import { Layouts } from "../Layouts/Index";
import { axiosPrivate } from "../Common/http/axiosPrivate";
import { AuthContext } from "../Contexts/AuthContext";

function ProtectedRoute({ children }: any) {
  const { setAuth, auth }: any = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      const { data }: any = await axiosPrivate
        .get("/users/me", {
          headers: {
            authorization: `Bearer ${auth.accessToken}`,
          },
        })
        .catch(() => {
          setAuth({
            auth: false,
            acessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            user: auth.user,
          });
        });

      setAuth({
        auth: true,
        acessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        user: data.user,
      });
    })();
  }, []);

  if (!auth.auth) {
    return <Navigate to="/login" replace />;
  }

  return <Layouts>{children}</Layouts>;
}

export default ProtectedRoute;
