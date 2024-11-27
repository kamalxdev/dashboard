import { createContext, useEffect, useState } from "react";
import {
  IAppProvider,
  IFilterRoles,
  IFilterUsers,
  IToggleMenu,
} from "../types/context";
import { IRoles } from "../types/roles";
import { IUser } from "../types/user";
import axios from "axios";

export const AppContext = createContext<IAppProvider | {}>({});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [filterUsers, setFilterUsers] = useState<IFilterUsers>({
    roles: [],
    status: null,
  });
  const [filterRoles, setFilterRoles] = useState<IFilterRoles>({
    permission: [],
  });
  const [toggleMenu, setToggleMenu] = useState<IToggleMenu>("user");
  const [roles, setRoles] = useState<IRoles[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [toggleAddNew, setToggleAddNew] = useState(false);
  const [priorityfnRunning, setPriorityfnRunning] = useState(false);

  useEffect(() => {
    if (users.length == 0) {
      axios
        .get(`${import.meta.env.VITE_SERVER_API_URl}/user`)
        .then((data) => {
          setUsers(data?.data?.user);
        })
        .catch((err) => {
          console.log("Error on geting users : ", err);
        });
    }
    if (roles.length == 0) {
      axios
        .get(`${import.meta.env.VITE_SERVER_API_URl}/role`)
        .then((data) => {
          setRoles(data?.data?.role);
        })
        .catch((err) => {
          console.log("Error on geting roles : ", err);
        });
    }
  }, [users, roles]);

  return (
    <AppContext.Provider
      value={{
        toggleFilter,
        setToggleFilter,
        filterUsers,
        setFilterUsers,
        filterRoles,
        setFilterRoles,
        toggleMenu,
        setToggleMenu,
        roles,
        setRoles,
        users,
        setUsers,
        toggleAddNew,
        setToggleAddNew,
        priorityfnRunning,
        setPriorityfnRunning,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
