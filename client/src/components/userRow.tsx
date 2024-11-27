import { CiMenuKebab } from "react-icons/ci";
import {
  MdAirplanemodeInactive,
  MdOutlineAirplanemodeActive,
  MdOutlineDelete,
} from "react-icons/md";
import { IUser } from "../types/user";
import { memo, useEffect, useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import useAppProvider from "../provider/hook";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";

interface IUserRowProps extends IUser {
  index: number;
}

function UserRow({ name, email, role, status, index, _id }: IUserRowProps) {
  const [toggleHamburger, setToggleHamburger] = useState(false);
  const [edit, setEdit] = useState(false);
  const userMenu = useRef<HTMLSpanElement>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name,
    email,
    role,
  });
  const uAppProvider = useAppProvider();

  function closeMenu(e: any) {
    if (toggleHamburger && !userMenu.current?.contains(e.target)) {
      setToggleHamburger(false);
    }
  }

  function toggleEditUser() {
    setEdit(true);
    uAppProvider?.setPriorityfnRunning(true);
    setToggleHamburger(false);
  }

  async function handleChangeUserStatus() {
    try {
      setToggleHamburger(false);
      const user = await axios.put(
        `${import.meta.env.VITE_SERVER_API_URl}/user`,
        {
          id: _id,
          update: { status: status == "Active" ? "Inactive" : "Active" },
        }
      );
      if (!user?.data?.success) {
        alert(user?.data?.error);
      } else {
        uAppProvider?.setUsers([]);
        alert("User status updated successfully");
      }
    } catch (error) {
      alert("Error on Updating user");
    }
  }

  async function handleDeleteUser(){
    try {
      setToggleHamburger(false);
      const confirmdelete = confirm(`Are you sure you want to delete user(${name})`)
      if(!confirmdelete) return 
      
      const user = await axios.delete(
        `${import.meta.env.VITE_SERVER_API_URl}/user?id=${_id}`
      );
      if (!user?.data?.success) {
        alert(user?.data?.error);
      } else {
        uAppProvider?.setUsers([]);
        alert("User Deleted successfully");
      }
    } catch (error) {
      alert("Error on Deleting user");
    }
  }

  async function handleEditSubmit() {
    try {
      if (data?.name != name || data?.email != email || data?.role != role) {
        setLoading(true);
        const user = await axios.put(
          `${import.meta.env.VITE_SERVER_API_URl}/user`,
          { id: _id, update: data }
        );
        setLoading(false);
        if (!user?.data?.success) {
          alert(user?.data?.error);
        } else {
          uAppProvider?.setUsers([]);
          alert("User updated successfully");
        }
      }
      setEdit(false);
      setData({ name, email, role });
      uAppProvider?.setPriorityfnRunning(false);
      uAppProvider?.setUsers([])
    } catch (error) {
      alert("Error on updating user");
    }
  }
  

  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
  }, [userMenu, closeMenu]);

  return (
    <tr
      className={`border  font-semibold transition-all border-zinc-800  rounded-md text-sm lg:text-lg  ${
        !edit && "hover:bg-zinc-800"
      }`}
    >
      <td className=" p-2">
        <div className="flex flex-col gap-1">
          {edit ? (
            <>
              <input
                type="text"
                defaultValue={name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="bg-transparent w-full outline-none h-full border rounded-sm p-3"
              />
              <p className="truncate md:hidden">
                <input
                  type="text"
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  defaultValue={email}
                  className="bg-transparent w-full outline-none h-full border rounded-sm p-3"
                />
              </p>
            </>
          ) : (
            <>
              <span className="flex gap-2 items-center">
                <p className="text-nowrap text-sm lg:text-lg">{name}</p>
                <span
                  className={`text-xs opacity-90 font-bold border border-zinc-700 h-fit px-2 rounded-md ${
                    status == "Active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {status}
                </span>
              </span>
              <p className="truncate text-sm text-zinc-400 md:hidden">
                {email}
              </p>
            </>
          )}
        </div>
      </td>
      <td className="hidden md:table-cell p-1">
        <div className="w-full h-full">
          {edit ? (
            <input
              type="text"
              defaultValue={email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="bg-transparent w-full outline-none h-full border rounded-sm p-3"
            />
          ) : (
            email
          )}
        </div>
      </td>
      <td className="">
        <div className="w-full h-full">
          {edit ? (
            <select
              onChange={(e) => setData({ ...data, role: e.target.value })}
              defaultValue={role}
              className="appearance-none row-start-1 col-start-1 bg-transparent w-full outline-none h-full border rounded-sm p-2"
            >
              {uAppProvider?.roles?.map((r) => (
                <option value={r?.name} key={r?.name} className="bg-black">
                  {r?.name}
                </option>
              ))}
            </select>
          ) : (
            role
          )}
        </div>
      </td>
      <td className=" whitespace-nowrap text-center p-1">
        <div className=" w-full">
          {edit ? (
            <button
              type="button"
              className="p-2 h-fit transition bg-green-600 rounded-full "
              onClick={handleEditSubmit}
            >
              {loading ? (
                <CgSpinner className="animate-spin text-xl" />
              ) : (
                <GiCheckMark />
              )}
            </button>
          ) : (
            <button
              type="button"
              disabled={uAppProvider?.priorityfnRunning}
              className="p-1 h-fit transition bg-zinc-700 rounded-sm "
              onClick={() => setToggleHamburger(!toggleHamburger)}
            >
              <CiMenuKebab />
            </button>
          )}
        </div>
        {toggleHamburger && (
          <span
            ref={userMenu}
            role="dialog"
            id=":rg:"
            tabIndex={-1}
            style={{
              position: "absolute",
              transform: `translate(0,${45 * (index + 1)}px)`,
            }}
            className={`border border-zinc-800 top-5 right-12 lg:right-20 z-40 max-w-sm rounded-md bg-black p-2 shadow-medium transition-all duration-300 text-md`}
          >
            <button
              type="button"
              onClick={toggleEditUser}
              className="w-full flex items-center gap-2 y-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              <FiEdit2 />
              <p>Edit</p>
            </button>
            <button
              type="button"
              onClick={handleChangeUserStatus}
              className="w-full flex items-center gap-2 py-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              {status == "Active" ? (
                <MdAirplanemodeInactive />
              ) : (
                <MdOutlineAirplanemodeActive />
              )}
              <p>
                Set as
                {status == "Active" ? " Inactive" : " Active"}
              </p>
            </button>
            <button
              type="button"
              onClick={handleDeleteUser}
              className="w-full flex items-center gap-2 y-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              <MdOutlineDelete />
              <p>Delete</p>
            </button>
          </span>
        )}
      </td>
    </tr>
  );
}

export default memo(UserRow);
