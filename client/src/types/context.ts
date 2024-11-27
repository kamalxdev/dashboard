import { IRoles } from "./roles";
import { IUser } from "./user";

export interface IFilterUsers {
  roles: string[];
  status: "Active" | "Inactive" | null;
}

export interface IFilterRoles {
  permission: string[];
}
export type IToggleMenu = "user" | "role" | null;

export interface IAppProvider {
  toggleMenu: IToggleMenu;
  setToggleMenu: (x: IToggleMenu) => void;
  toggleFilter: boolean;
  setToggleFilter: (x: boolean) => void;
  filterUsers: IFilterUsers;
  setFilterUsers: (x: IFilterUsers) => void;
  filterRoles: IFilterRoles;
  setFilterRoles: (x: IFilterRoles) => void;
  roles: IRoles[];
  setRoles: (x: IRoles[]) => void;
  users: IUser[];
  setUsers: (x: IUser[]) => void;
}
