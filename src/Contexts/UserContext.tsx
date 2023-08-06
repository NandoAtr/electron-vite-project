import axios from "axios";
import React, { createContext } from "react";
import { axiosPrivate } from "../Common/http/axiosPrivate";
import { AuthContext } from "./AuthContext";

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext({});

function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = React.useState({});
  const { auth }: any = React.useContext(AuthContext);

  React.useEffect(() => {
    (async () => {
      const { data } = await axiosPrivate("users/me", {
        headers: {
          authorization: `Bearer ${auth.accessToken}`,
        },
      });
      console.log(data)

      setUser(data.user);
    })();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

export default UserProvider;
