import { useEffect, useState } from "react";
import users from "../data/users.json";
import useAppProvider from "../provider/hook";
import UserRow from "./userRow";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { IUser } from "../types/user";
import { LiaRandomSolid } from "react-icons/lia";

export default function Users() {
  const uAppProvider = useAppProvider();
  const [sort, setSort] = useState({
    name: "random",
    role: "random",
  });

  const [filteredAndSortedUsers, setFilteredAndSortedUsers] = useState<IUser[]>(
    []
  );

  function handleSortName() {
    if (sort?.name == "descending" || sort?.name == "random") {
      setSort({ role: "random", name: "ascending" });
      setFilteredAndSortedUsers(
        [...filteredAndSortedUsers]?.sort((a, b) =>
          a?.name.localeCompare(b?.name, undefined, { sensitivity: "base" })
        )
      );
    } else if (sort?.name == "ascending") {
      setSort({ role: "random", name: "descending" });
      setFilteredAndSortedUsers(
        [...filteredAndSortedUsers]
          ?.sort((a, b) =>
            a?.name.localeCompare(b?.name, undefined, { sensitivity: "base" })
          )
          .reverse()
      );
    } else {
      setSort({ ...sort, name: "random" });
    }
  }

  function handleSortRole() {
    if (sort?.role == "descending" || sort?.role == "random") {
      setSort({ name: "random", role: "ascending" });
      setFilteredAndSortedUsers(
        [...filteredAndSortedUsers]?.sort((a, b) =>
          a?.role.localeCompare(b?.role, undefined, { sensitivity: "base" })
        )
      );
    } else if (sort?.role == "ascending") {
      setSort({ name: "random", role: "descending" });
      setFilteredAndSortedUsers(
        [...filteredAndSortedUsers]
          ?.sort((a, b) =>
            a?.role.localeCompare(b?.role, undefined, { sensitivity: "base" })
          )
          .reverse()
      );
    } else {
      setSort({ ...sort, name: "random" });
    }
  }

  useEffect(() => {
    uAppProvider?.setToggleMenu("user");
  }, []);

  useEffect(() => {
    const filteredUsers = users.filter((u) => {
      const userFilter = uAppProvider?.filterUsers;
      const userFilterRoles = userFilter?.roles;
      const userFilterStatus = userFilter?.status
        ? userFilter?.status == u?.status
        : true;

      if (userFilterStatus) {
        if (userFilterRoles?.length != 0) {
          if (userFilterRoles?.includes(u?.role)) {
            return u;
          }
        } else {
          return u;
        }
      }
    });

    if (filteredUsers != filteredAndSortedUsers) {
      setFilteredAndSortedUsers(filteredUsers);
    }
  }, [uAppProvider?.filterUsers]);

  return (
    <div className=" w-full h-full">
      <div className="  w-full overflow-hidden overflow-x-visible">
        <table className=" w-full text-left text-sm lg:text-lg">
          <thead>
            <tr className="bg-white text-black rounded-md ">
              <th className="p-2 ">
                <button
                  className="flex items-center gap-1 transition-all p-1 border border-white rounded-sm hover:border-zinc-300"
                  onClick={handleSortName}
                >
                  <p className=" md:hidden table-cell">User</p>
                  <p className="hidden md:table-cell">Name</p>

                  {sort?.name == "random" ? (
                    <LiaRandomSolid />
                  ) : sort?.name == "descending" ? (
                    <BsSortAlphaDownAlt />
                  ) : (
                    <BsSortAlphaDown />
                  )}
                </button>
              </th>
              <th className="hidden md:table-cell">Email</th>
              <th className=" ">
                <button
                  className="flex items-center gap-1 transition-all p-1 border border-white rounded-sm hover:border-zinc-300"
                  onClick={handleSortRole}
                >
                  <p>Role</p>
                  {sort?.role == "random" ? (
                    <LiaRandomSolid />
                  ) : sort?.role == "descending" ? (
                    <BsSortAlphaDownAlt />
                  ) : (
                    <BsSortAlphaDown />
                  )}
                </button>
              </th>
              <th className="text-center"></th>
            </tr>
          </thead>
          <tbody className="w-full">
            {filteredAndSortedUsers?.map((u, index) => (
              <UserRow
                name={u?.name}
                id={u?.id}
                email={u?.email}
                role={u?.role}
                status={u?.status}
                key={u?.id}
                index={index}
              />
            ))}
          </tbody>
        </table>
        {filteredAndSortedUsers?.length == 0 && (
          <div className="flex w-full justify-center borde text-zinc-700 font-semibold text-md mt-5">
            <h1>No user found</h1>
          </div>
        )}
      </div>
    </div>
  );
}
