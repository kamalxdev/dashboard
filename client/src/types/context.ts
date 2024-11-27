export interface IFilterUsers {
  roles: string[];
  status: "Active" | "Inactive" | null;
}

export interface IFilterRoles {
  permission: string[];
}
export type IToggleMenu = "user" | "role" | null

export interface IAppProvider {
  toggleMenu: IToggleMenu;
  setToggleMenu: (x: IToggleMenu) => void;
  toggleFilter: boolean;
  setToggleFilter: (x: boolean) => void;
  filterUsers: IFilterUsers;
  setFilterUsers: (x: IFilterUsers) => void;
  filterRoles: IFilterRoles;
  setFilterRoles: (x: IFilterRoles) => void;
  
}
