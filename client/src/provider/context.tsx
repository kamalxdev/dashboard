import { createContext, useState } from "react";
import { IAppProvider, IFilterRoles, IFilterUsers, IToggleMenu } from "../types/context";
import { IRoles } from "../types/roles";
import { IUser } from "../types/user";

export const AppContext = createContext<IAppProvider | {}>({});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [filterUsers, setFilterUsers] = useState<IFilterUsers>({roles:[],status:null});
  const [filterRoles, setFilterRoles] = useState<IFilterRoles>({permission:[]});
  const [toggleMenu, setToggleMenu] = useState<IToggleMenu>("user");
  const [roles,setRoles] = useState<IRoles[]>([])
  const [users,setUsers] = useState<IUser[]>([])



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
        setUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
