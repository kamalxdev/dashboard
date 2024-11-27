import { createContext, useState } from "react";
import { IAppProvider, IFilterRoles, IFilterUsers, IToggleMenu } from "./types/context";

export const AppContext = createContext<IAppProvider | {}>({});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [toggleFilter, setToggleFilter] = useState(false);
  const [filterUsers, setFilterUsers] = useState<IFilterUsers>({roles:[],status:null});
  const [filterRoles, setFilterRoles] = useState<IFilterRoles>({permission:[]});
  const [toggleMenu, setToggleMenu] = useState<IToggleMenu>("user");


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
        setToggleMenu
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
