import { useEffect, useState } from "react";
import useAppProvider from "../provider/hook";
import UserRow from "../components/userRow";
import { BsSortAlphaDown, BsSortAlphaDownAlt } from "react-icons/bs";
import { LiaRandomSolid } from "react-icons/lia";
import { IUser } from "../types/user";

export default function Users() {
  const uAppProvider = useAppProvider();
  const [sort, setSort] = useState({
    name: "random",
    role: "random",
  });

  const [filteredAndSortedUsers,setFilteredAndSortedUsers]= useState<IUser[]>(uAppProvider?.users)


  function handleSortUser(toSort:"name"|"role") {
    if (sort?.[toSort] == "descending" || sort?.[toSort] == "random") {
      setSort({ ...sort, [toSort == "name" ? "role":"name"]: "random", [toSort]: "ascending" });
      setFilteredAndSortedUsers(
        filteredAndSortedUsers?.sort((a, b) =>
          a?.[toSort].localeCompare(b?.[toSort], undefined, { sensitivity: "base" })
        )
      );
    } else if (sort?.[toSort] == "ascending") {
      setSort({ ...sort, [toSort == "name" ? "role":"name"]: "random", [toSort]: "descending" });
      setFilteredAndSortedUsers(
        filteredAndSortedUsers?.sort((a, b) =>
            a?.[toSort].localeCompare(b?.[toSort], undefined, { sensitivity: "base" })
          )
          .reverse()
      );
    } else {
      setSort({ ...sort, [toSort]: "random" });
    }
  }


  useEffect(() => {
    uAppProvider?.setToggleMenu("user");
      setFilteredAndSortedUsers(uAppProvider?.users)
    return ()=>{
      uAppProvider?.setPriorityfnRunning(false)
    }
  }, [uAppProvider?.users]);

  useEffect(() => {
    const filteredUsers = uAppProvider?.users?.filter((u) => {
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
      setFilteredAndSortedUsers(filteredUsers)
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
                disabled={uAppProvider?.priorityfnRunning}
                  className="flex items-center gap-1 transition-all p-1 border border-white rounded-sm hover:border-zinc-300"
                  onClick={()=>handleSortUser("name")}
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
                disabled={uAppProvider?.priorityfnRunning}
                  className="flex items-center gap-1 transition-all p-1 border border-white rounded-sm hover:border-zinc-300"
                  onClick={()=>handleSortUser("role")}
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
                _id={u?._id}
                email={u?.email}
                role={u?.role}
                status={u?.status}
                key={u?._id}
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
