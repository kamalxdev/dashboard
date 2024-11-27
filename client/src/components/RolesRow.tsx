import { memo, useEffect, useRef, useState } from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
// import users from "../data/users.json";
import { IRoles } from "../types/roles";
import { MdOutlineDelete } from "react-icons/md";
import { FiEdit2 } from "react-icons/fi";
import { CiMenuKebab } from "react-icons/ci";
import useAppProvider from "../provider/hook";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { GiCheckMark } from "react-icons/gi";

interface IRolesRowProps extends IRoles {
  index: number;
}

function RolesRow({ name, permissions, index, _id }: IRolesRowProps) {
  const uAppProvider = useAppProvider();

  const [toggleHamburger, setToggleHamburger] = useState(false);
  const userMenu = useRef<HTMLSpanElement>(null);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ name: string; permissions: string[] }>({
    name,
    permissions,
  });

  function closeMenu(e: any) {
    if (toggleHamburger && !userMenu.current?.contains(e.target)) {
      setToggleHamburger(false);
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", closeMenu);
  }, [userMenu, closeMenu]);

  async function handleDeleteRole() {
    try {
      setToggleHamburger(false);
      const confirmdelete = confirm(
        `Are you sure you want to delete role(${name})`
      );
      if (!confirmdelete) return;

      const role = await axios.delete(
        `${import.meta.env.VITE_SERVER_API_URl}/role?id=${_id}`
      );
      if (!role?.data?.success) {
        alert(role?.data?.error);
      } else {
        uAppProvider?.setRoles([]);
        alert("Role Deleted successfully");
      }
    } catch (error) {
      alert("Error on Deleting role");
    }
  }
  function handlePermissionChange(permission: string) {
    var newPermissions = [...data?.permissions, permission];
    if (data?.permissions?.includes(permission)) {
      newPermissions = data?.permissions?.filter((p) => p != permission);
    }
    return setData({
      ...data,
      permissions: newPermissions,
    });
  }

  async function handleEditSubmit() {
    try {
      if (data?.name != name || data?.permissions != permissions) {
        setLoading(true);
        const role = await axios.put(
          `${import.meta.env.VITE_SERVER_API_URl}/role`,
          { id: _id, update: data }
        );
        setLoading(false);
        if (!role?.data?.success) {
          alert(role?.data?.error);
        } else {
          uAppProvider?.setUsers([]);
          alert("Role updated successfully");
        }
      }
      setEdit(false);
      setData({ name, permissions });
      uAppProvider?.setPriorityfnRunning(false);
      uAppProvider?.setRoles([])
    } catch (error) {
      alert("Error on updating role");
    }
  }

  function toggleEditRole() {
    setEdit(true);
    uAppProvider?.setPriorityfnRunning(true);
    setToggleHamburger(false);
  }

  return (
    <tr
      className={`border  font-semibold transition-all border-zinc-800  rounded-md text-sm lg:text-lg  ${
        !edit && "hover:bg-zinc-800"
      }`}
    >
      <td className=" p-2 ">
        <div className="flex gap-2 items-center">
          {edit ? (
            <input
              type="text"
              defaultValue={name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="bg-transparent w-full outline-none h-full border rounded-sm p-3"
            />
          ) : (
            <>
              <p>{name} </p>
              <p className="text-xs text-zinc-700 font-bold border border-zinc-700 h-fit w-fit px-1 rounded-full">
                {uAppProvider?.users?.filter((u) => u?.role == name)?.length ||
                  0}
              </p>
            </>
          )}
        </div>
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center text-sm lg:text-lg">
          {edit ? (
            <button
              type="button"
              className="bg-transparent outline-none h-full border rounded-sm p-3"
              onClick={() => handlePermissionChange("Read")}
            >
              {data?.permissions?.includes("Read") ? <FaCheck /> : <FaXmark />}
            </button>
          ) : permissions?.includes("Read") ? (
            <FaCheck />
          ) : (
            <FaXmark />
          )}
        </div>
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center text-sm lg:text-lg">
        {edit ? (
            <button
              type="button"
              className="bg-transparent outline-none h-full border rounded-sm p-3"
              onClick={() => handlePermissionChange("Write")}
            >
              {data?.permissions?.includes("Write") ? <FaCheck /> : <FaXmark />}
            </button>
          ) : permissions?.includes("Write") ? (
            <FaCheck />
          ) : (
            <FaXmark />
          )}
        </div>
      </td>
      <td className="text-center">
        <div className="flex items-center justify-center text-sm lg:text-lg">
        {edit ? (
            <button
              type="button"
              className="bg-transparent outline-none h-full border rounded-sm p-3"
              onClick={() => handlePermissionChange("Delete")}
            >
              {data?.permissions?.includes("Delete") ? <FaCheck /> : <FaXmark />}
            </button>
          ) : permissions?.includes("Delete") ? (
            <FaCheck />
          ) : (
            <FaXmark />
          )}
        </div>
      </td>
      <td className=" whitespace-nowrap text-center border border-zinc-800 p-1">
        <div className="">
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
            style={{
              position: "absolute",
              transform: `translate(0,${
                20 * (index + 1) + (20 * (index + 1)) / 2
              }px)`,
            }}
            className={`border border-zinc-800 top-5 right-12 lg:right-20 z-40 max-w-sm rounded-md bg-black p-2 shadow-medium transition-all duration-300 text-md`}
          >
            <button
              type="button"
              onClick={toggleEditRole}
              className="w-full flex items-center gap-2 y-1 px-2 hover:bg-zinc-800 rounded-md"
            >
              <FiEdit2 />
              <p>Edit</p>
            </button>
            <button
              type="button"
              onClick={handleDeleteRole}
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

export default memo(RolesRow);
